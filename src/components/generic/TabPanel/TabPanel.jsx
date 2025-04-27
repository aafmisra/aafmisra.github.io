/**
 * Asha Misra - Portfolio site
 *
 * @module /components/Generics/TabPanel/TabPanel.jsx
 */
//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
// Libraries
import { useStore } from '@nanostores/react';

// Stores
import { $activeTabId } from '../../../stores/tabStore.js';

// CSS
import './TabPanel.css';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component TabPanel
 * @description Reusable panel component that shows content associated with a corresponding <Generics.Tab>.
 *
 * @property {html} children - The tab panel's content. Required.
 * @property {string} panelId - The `id` attribute value of the corresponding instance of `<ContactBanner>`. Used as the `aria-labelledby` attribute for main <div> wrapper. Required.
 * @property {string} tabId - The value passed to the `id` attribute of the component's main <div> wrapper. Referenced in corresponding `<ContactBanner>` instance for that component's `aria-controls` value. Required.
 */
const TabPanel = (props) => {
  // Extract props
  let {
    children,
    panelId,
    tabId
  } = props;

  // All props are required
  if (!children || !panelId || !tabId) {
    return '';
  }

  // Grab the active tab id
  const activeTabId = useStore($activeTabId);

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      className={activeTabId === tabId ? 'active' : ''}
      tabIndex={activeTabId === tabId ? '0' : '-1'}
    >
      {children}
    </div>
  );
}

export default TabPanel;