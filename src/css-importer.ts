// Import Lit CSS utilities.
import { CSSResult, unsafeCSS } from 'lit';

// Import the CSS common to all web components for re-use.
import styles from './index.css?inline';

/**
 * Exports a CSSResult from imported CSS file. Useful for sharing styles across components.
 */
export default unsafeCSS(styles) as CSSResult;
