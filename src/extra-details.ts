import { LitElement, customElement, html } from 'lit-element';

@customElement('mds-extra-details')
export class ExtraDetails extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}
