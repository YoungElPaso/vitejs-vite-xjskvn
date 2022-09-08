import { LitElement, customElement, html, css, property } from 'lit-element';

import { sharedWCStyles } from './css-importer';

@customElement('mds-extra-details')
export class ExtraDetails extends LitElement {
  // isActive reflected property to allow manual setting of isActive or not; defaults to undefined.
  @property({ type: String, reflect: true }) isActive: String = 'inactive';

  // TODO: this handler needs to be added to the <summary> tag which is a part of the child markup slotted.

  // TODO: need to grab refs to some of the child elements to attach handlers, update attributes etc. Read how to do that!
  handleClick() {
    console.log('hi');
  }
  render() {
    return html`
    <slot @click=${this.handleClick}>
    </slot>
    </details>`;
  }

  static get styles() {
    return [
      // TODO: set some basic styles, maybe border? Maybe initial height?
      css`
      :host {
      }
      `,
      sharedWCStyles,
    ];
  }
}
