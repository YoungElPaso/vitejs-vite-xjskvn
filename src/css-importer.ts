// Import Lit unsafeCSS method.
import { unsafeCSS } from 'lit';

// Import the CSS common to all web components for possible re-use *inside* the ShadowDOM. Uses ?inline so the CSS is bundled. TODO: revisit this comment...?
import styles from './wc-common.css?inline';

/**
 * Exports a Lit CSSResult from imported CSS file. Useful for sharing styles across components.
 */
let sharedWCStyles = unsafeCSS(styles);
export { sharedWCStyles };
