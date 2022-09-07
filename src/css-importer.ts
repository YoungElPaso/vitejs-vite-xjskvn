// Import Lit CSS utilities.
import { CSSResult, unsafeCSS } from 'lit';

// Import the CSS common to all web components for possible re-use *inside* the ShadowDOM. Uses ?inline so the CSS is added as a string.
import styles from './wc-common.css?inline';

/**
 * Exports a CSSResult from imported CSS file. Useful for sharing styles across components.
 */
export default unsafeCSS(styles) as CSSResult;
