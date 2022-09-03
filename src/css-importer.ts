import { css } from 'lit-element';

// TODO: create issue or check for issue on Vite repo for ?inline breaking types! No issue, so just removing? Fuckit, just tell tsc to ignore for now?
import styles from './index.css?inline';
import { CSSResult, unsafeCSS } from 'lit';

/**
 * Exports a CSSResult from imported CSS file. Useful for sharing styles across components.
 */
export default unsafeCSS(styles) as CSSResult;
