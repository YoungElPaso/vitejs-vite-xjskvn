import { LitElement, customElement, html } from 'lit-element';

import { sharedWCStyles } from './css-importer';

@customElement('mds-extra-details')
export class ExtraDetails extends LitElement {
  handleClick() {
    console.log('hi');
  }
  render() {
    return html`
    <slot @click=${this.handleClick}>
    </slot>
    </details>`;
  }
}
