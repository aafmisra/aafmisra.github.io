/**
 * Asha Misra - Portfolio site.
 *
 * @module /components/Commons/ScrollToTopLink/ScrollToTopLink.jsx
 */

//------------------------------------------------------------------------------
// Imports
//------------------------------------------------------------------------------
// Libraries
import { useEffect, useRef, useState } from "react";

// CSS
import './ScrollToTopLink.css';

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
/**
 * @component ScrollToTopLink
 * @description A link that sticks to the bottom of the page and scrolls back to the top of the page.
 */
const ScrollToTopLink = () => {

  // State
  const [linkHidden, setLinkHidden] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(null);
  const [shiftFocusFlag, setShiftFocusFlag] = useState(false);

  // Reference to this component
  const ref = useRef();

  // Initialize value to hold height of GlobalHeader
  let headerHeight;

  /**
   * Side effect:
   * - Runs once on load.
   * - Listens for scrolling on the page.
   * - Listens for focus on the link.
   * - Sets value variable to hold the height of the header component.
   * - Sets reducedMotion setting with a helper function.
   */
  useEffect(() => {
    // Get the height of the header
    const header = document.querySelector('header');
    headerHeight = header.offsetHeight;

    // Link should show if page is partially scrolled on initial load
    if (window.scrollY > headerHeight) {
      setLinkHidden(false);
    }

    // Check for prefers-reduced-motion setting
    setReducedMotion(getReducedMotion());

    // Add scroll listener
    let scrollTimeout = null;
    document.addEventListener('scroll', function() { // On Scroll

      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }

      scrollTimeout = requestAnimationFrame(handleScroll);
    });

    // Listen for keydowns for focus shift
    ref.current.addEventListener('keydown', scrollToTop);

    // Clean up - remove event listeners
    return () => {
      document.removeEventListener('scroll', handleScroll);
      ref.current.removeEventListener('keydown', scrollToTop);
    }
  }, []);

  /**
   * Detects user's prefers-reduced-motion setting to allow smooth scroll.
   * @returns {boolean} true if user's prefers-reduced-motion is set to 'reduce'.
   */
  const getReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Shows or hides scroll link based on scroll position.
   * @returns {null} Sets a state value.
   */
  const handleScroll = () => {
    // Show link if page is scrolled past the header & not already showing
    if (window.scrollY > headerHeight && linkHidden === true) {
      setLinkHidden(false);
    }
    // Hide link when at the top of the page
    else if (window.scrollY === 0) {
      setLinkHidden(true);

      // Shift focus if the flag has been triggered
      if (ref.current.classList.contains('shift-focus')) {
        document.querySelector('a#skip-to-main-content-link').focus();
        // Reset flag
        setShiftFocusFlag(false);
      }
    }
  }

  /**
   * Scrolls to the top of the page
   */
  const scrollToTop = (evt) => {
    // Disable default link behavior to allow smooth scroll
    evt.preventDefault();

    // Smooth scroll only if reducedMotion is false
    const scrollBehavior = !reducedMotion ? 'smooth' : 'auto';

    // Trigger focus shift if link was activated via keyboard
    if (evt.type == 'keydown') {
      setShiftFocusFlag(true);
    }

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: scrollBehavior
    });
  }

  // Set class value
  let styleClass = linkHidden ? 'hidden' : '';
  if (shiftFocusFlag) {
    styleClass += ' shift-focus';
  }


  return (
    <a className={styleClass}
        href="#main-content"
        id="scroll-to-top-link"
        onClick={scrollToTop}
        ref={ref}
        tabIndex="0"
    >
      <img
        src="/up.svg"
        alt="" aria-hidden="true"
      />
      <span className="visually-hidden">Go to the top of the page.</span>
    </a>
  );
}

export default ScrollToTopLink;