/**
 * Asha Misra - Portfolio site
 *
 * @module /components/Generics/TabsCollection/TabsCollection.jsx
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
// Libraries
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';

// Components
import Tab from "../Tab/Tab.jsx";

// Stores
import { $activeTabId } from '../../../stores/tabStore.js';

// CSS
import './TabsCollection.css';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component TabsCollection
 * @description Tab group component.
 *
 * @property {html} children -  HTML structure for tab panels. Required.
 * @property {array} tabs -  An array of objects containing data necessary to render child instances of <Generics.Tab>. Each object has required values for `tabId`, `panelId`, and`copy`. Required.
 */
const TabsCollection = (props) => {

  const { children, tabs } = props;

  // See w3 for implementation guide - https://www.w3.org/WAI/ARIA/apg/example-index/tabs/tabs-automatic.html
  // notes for roving tabindex - https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex

  // Do not render without required props and sub-props
  if (!tabs || !children) {
    return;
  }
  for (const tab of tabs) {
    if (!tab.tabId || !tab.panelId || !tab.copy) {
      return '';
    }
  }

  // Set first and last tabIds
  const firstTabId = tabs[0].tabId;
  const secondTabId = tabs[1].tabId;

  // Set the first tab as active by default when arriving on the page
  if (useStore($activeTabId) == '') {
    $activeTabId.set(firstTabId);
  }

  /**
   * Side effect:
   * - Fired on initial render
   * - Checks URL for query string to set active tab
   * - Adds and removes event listeners
   */
  useEffect(() => {
    // Check URL for tab param
    const params = new URL(window.location).searchParams;
    const tabParam = params.get("tab");

    // If tabParam exists, look for matching tabId
    let matchingTab;
    if (tabParam) {
      matchingTab = tabs.find((tab) => tab.tabId === `${tabParam}-tab`);
    }

    // If there is a matching tab, set value for $activeTabId in store to tab's id
    if (matchingTab) {
      $activeTabId.set(matchingTab.tabId);
    }
    // Otherwise, activate the first tab
    else {
      $activeTabId.set(firstTabId);
    }

    // Grab tabs
    const tabButtons = document.querySelectorAll('button[role="tab"]');

    // Listen for clicks and keydowns
    for (const button of tabButtons) {
      button.addEventListener('click', handleEvent);
      button.addEventListener('keydown', handleEvent);
    }

    // Clean up - remove event listeners
    return () => {
      document.removeEventListener('click', handleEvent);
      document.removeEventListener('keydown', handleEvent);
    }
  }, []);

  /**
   * Helper function for updating the active tab after a click or keydown event.
   * @param {string} tabId id of the tab that should be made active.
   * @returns {null} Updates focus.
   */
  const updateActiveTab = (tabId) => {
    // Update store
    $activeTabId.set(tabId);

    // Update focus
    document.querySelector(`button#${tabId}`).focus();
  }

  /**
   * Handler function for press of right arrow key on instance of <Generics.Tab>.
   * @param {string} tabId - id of the tab that was the event target.
   * @returns {null} Updates active tab.
   */
  const handleArrowRight = (tabId) => {
    let tabToSet;

    // If target tab was last in the list, set active tab to first tab
    if (tabId === secondTabId) {
      tabToSet = firstTabId;
    }
    else {
      // Otherwise, set active tab to next tab in the list
      const currentTab = tabs.filter(tab => tab.tabId === tabId)[0];
      tabToSet = tabs[tabs.indexOf(currentTab) + 1].tabId;
    }

    // Update active tab
    updateActiveTab(tabToSet);
  }

  /**
   * Handler function for press of left arrow key on instance of <Generics.Tab>.
   * @param {string} tabId id of the tab that was the event target.
   * @returns {null} Updates active tab.
   */
  const handleArrowLeft = (tabId) => {
    let tabToSet;

    // If target tab was first in the list, set active tab to last tab
    if (tabId === firstTabId) {
      tabToSet = secondTabId;
    }
    else {
      // Otherwise, set active tab to previous tab in the list
      const currentTab = tabs.filter(tab => tab.tabId === tabId)[0];
      tabToSet = tabs[tabs.indexOf(currentTab) - 1].tabId;
    }

    // Update active tab
    updateActiveTab(tabToSet);
  }

  /**
   * Handler function for clicks and keydowns on instance of <Generics.Tab>.
   * @param {object} evt - The event fired.
   * @returns {null} Handles various user events.
   */
  const handleEvent = (evt) => {
    let flag = false;

    // If click event, make clicked tab the active tab
    if (evt.type === 'click') {
      updateActiveTab(evt.target.getAttribute('id'));
      flag = true;
    }

    // If keydown event, call appropriate helper func
    else if (evt.type === 'keydown') {
      switch (evt.key) {
        case 'ArrowLeft':
          handleArrowLeft(evt.target.getAttribute('id'));
          flag = true;
          break;

        case 'ArrowRight':
          handleArrowRight(evt.target.getAttribute('id'));
          flag = true;
          break;

        case 'Home':
          updateActiveTab(firstTabId);
          flag = true;
          break;

        case 'End':
          updateActiveTab(secondTabId);
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        evt.stopPropagation();
        evt.preventDefault();
      }
    }
  }

  /**
   * Generates instances of <Generics.Tab> to populate the tablist.
   * @returns {jsx} List of <Generics.Tab> elements.
   */
  const generateTabs = () => {
    let jsx = [];

    tabs.map((tab, index) => {
      jsx.push(
        <Tab
          isActive={useStore($activeTabId) === tab.tabId}
          tabId={tab.tabId}
          panelId={tab.panelId}
          key={tab.tabId}
        >
          {tab.copy}
        </Tab>
      );
    });
    return jsx;
  }

  return (
    <div className="tab-group">
      <div role="tablist" aria-label="List of tabs">
        {generateTabs()}
      </div>
      {children}
    </div>
  );
}

export default TabsCollection;