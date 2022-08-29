import { LitElement, html, property, customElement, css } from 'lit-element';

@customElement('mds-mobile-adapted-content')
export class MobileAdaptedContent extends LitElement {
  render() {
    // Render the main default slot content.
    let renderString = html`<slot></slot>`;

    let mq = window.matchMedia('(max-width: 420px)');

    // But, check if on mobile; render mobile-only slot if so.
    if (mq.matches) {
      renderString = html`<slot name="mobile-only"></slot>`;
    }

    return html`${renderString} `;
  }
}
