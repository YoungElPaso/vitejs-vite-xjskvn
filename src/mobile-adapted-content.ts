import { TemplateResult } from 'lit';
import { LitElement, html, customElement } from 'lit-element';

// Define new element to conditionally render content on mobile or desktop declaratively using a named slot and default slot.
@customElement('mds-mobile-adapted-content')
export class MobileAdaptedContent extends LitElement {
  render() {
    // Do a media query to see width of window.
    // TODO: decide what the query-string should be later; e.g. which width etc.
    let mq: Boolean = window.matchMedia('(max-width: 420px)').matches;

    // Default template to render the main default slot content.
    let renderTemplate: TemplateResult = html`<slot></slot>`;

    // If on mobile, renderTemplate using mobile-only slot.
    if (mq) {
      renderTemplate = html`
          <slot name="mobile-only"></slot>`;
    }

    return renderTemplate;
  }
}
