import { css } from 'lit-element';
import styles from './index.css?inline';
import { CSSResult, unsafeCSS } from 'lit';

/**
 * Exports a CSSResult from imported CSS file. Useful for sharing styles across components.
 */
export default unsafeCSS(styles) as CSSResult;
