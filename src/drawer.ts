// Import LitElement stuff.
import { TemplateResult } from 'lit';
import { LitElement, html, property, customElement, css } from 'lit-element';

// Get common WC styles from css-importer.
import { sharedWCStyles } from './css-importer';

// Declare new custom element: mds-drawer.
@customElement('mds-drawer')
export class DrawerElement extends LitElement {
  // Declare properties w/ types.

  // This property/attribute reflects so we can style it in CSS via attribute selector.
  @property({ type: Boolean, reflect: true })
  openStatus: Boolean = false;

  // A property for a section title for the drawer.
  @property({ type: String }) sectionTitle: String = '';

  // A property to specify when the component is 'ready' and reflected for CSS via attribute on element. Need to know if component is fully bootstrapped so it can be styled as such.
  @property({ type: Boolean, reflect: true })
  initialized: Boolean = false;

  // Handle button click.
  handleClick() {
    // Technically this could happen here, or only once at another time - just need to turn the initialized attribute off, since the component is now in use and CSS should reflect that.
    this.initialized = false;

    // Set openStatus to inverse of previous value.
    this.openStatus = !this.openStatus;
  }

  // Render the element.
  render() {
    // TODO: remove later in favour of IonIcon(?).
    // TODO: check this out to replace: https://github.com/antfu/unplugin-icons
    let hamburgerIcon = html`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;

    // TODO: remove later in favour of IonIcon(?).
    let xIcon = html`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;

    // Button label string.
    let buttonLabel: String = 'open';

    // Button icon markup.
    let buttonIcon: TemplateResult = hamburgerIcon;

    // Set up buttonLabel and buttonIcon conditionally.
    if (this.openStatus) {
      buttonLabel = 'close';
      buttonIcon = xIcon;
    }

    return html`
    <section>
      <button @click=${this.handleClick} >
        <span class="sr-only">
          ${buttonLabel}
        </span>
          ${buttonIcon} 
      </button>      
      <h3>${this.sectionTitle}</h3>
      <slot></slot>
    </section>`;
  }

  // Do some initialization stuff when component 'connects' to DOM.
  connectedCallback() {
    super.connectedCallback();
    // Set initialized to true for use in CSS when element is connected to DOM.
    this.initialized = true;
  }

  // Set styles.
  static get styles() {
    return [
      css`
      /* Main containing element for drawer. */
      :host {
        display: flex;
        position: relative;
        background: white;
        /* width: calc(33vw);*/
        height: calc(100vh - 1rem);
      }
      
      /*:host([openStatus]) {
        overflow: visible;
        animation-play-state: running !important;
      }*/
      
      /* Open/close button for drawer. */
      button {
        position: absolute;
        top: 0;
        right: -2rem;
        width: 2rem;
        height: 2rem;
        padding: 0;
        margin: 0;
        background: white;
        border: none;
      }
      
      section {
        overflow: hidden;
        width: 0;
        transition: width 0.3s;
      }
      :host([openstatus]) section {
        width: 80vw;
        padding: 0.25rem;
      }
      `,
      // Include shared styles provided by css-importer.
      sharedWCStyles,
    ];
  }
}
