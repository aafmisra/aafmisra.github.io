/**
 * Asha Misra - Portfolio site
 *
 * @module /components/Generics/Tab/Tab.jsx
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------

// CSS
import './Tab.css';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component Tab
 * @description Tab component
 *
 * @property {string} children - Copy for tab button. Required.
 * @property {boolean} isActive - Indicates whether tab is in its active or inactive state. Optional; defaults to `false`.
 * @property {string} panelId - Value to be set as component <button> element's `aria-controls` attribute. Value should match the `panelId` for corresponding instance of <Generics.TabPanel>. Required.
 * @property {string} tabId - Value to be set as component <button> element's `id` attribute. Value should match the `tabId` for corresponding instance of <Generics.TabPanel>. Required.
 */

const Tab = (props) => {
  // Extract props
  let {
    children,
    isActive,
    panelId,
    tabId
  } = props;

  // Don't render without required props
  if (!children || !tabId || !panelId) {
    return '';
  }

  return (
    <button
      role="tab"
      className="tab"
      id={tabId}
      aria-controls={panelId}
      aria-selected={isActive}
      tabIndex={isActive ? '0' : '-1'}
    >
      {children}
    </button>
  );
}

export default Tab;