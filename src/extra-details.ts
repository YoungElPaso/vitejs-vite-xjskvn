// Import LitElement stuff.
import { LitElement, html, css } from 'lit';
import { property, query, customElement } from 'lit/decorators.js';

import { sharedWCStyles } from './css-importer';

// Declare new element: mds-extra-details.
// Used for enhancing/replacing <details> with a version with animation, auto-opening if containing 'selected' content etc.
@customElement('mds-extra-details')
export class ExtraDetails extends LitElement {
  // Reflected property for active state to allow manual setting of isActive or not; defaults false.
  //Allows access to set open/closed for child from outside easily and declaratively on parent, enables accordion type behaviour based on higher state (e.g. open one detail, close others etc) and composing together.
  @property({ type: Boolean, reflect: true }) isActive: boolean = false;

  // Property for autoOpenSelector, allows component to check for children matching that selector.
  // Allows for checking child elements for 'activity' and setting parent open/closed.
  @property({ type: String }) autoOpenSelector: string = '';

  // Get the child details element to query for heights, children etc.
  @query('details')
  _details!: HTMLDetailsElement;

  // Uses connectedCallback to compute some properties and set up some event listeners.
  connectedCallback() {
    super.connectedCallback();

    // If autoOpenSelector attr/prop set, use it to check for active children.
    if (this.autoOpenSelector) {
      // If fouund, activeChild is true.
      let activeChild: boolean =
        this.querySelectorAll(this.autoOpenSelector).length > 0;

      // If isActive is false, and there's an activeChild set isActive true.
      if (!this.isActive && activeChild) {
        this.isActive = true;
      }
    }

    // Add event listener for window resizing.
    let t = this;
    window.addEventListener(
      'resize',
      function () {
        t._handleWindowResize();
      },
      false
    );
  }

  // Calculates the heights required for animating the component on open/shut.
  _getHeights() {
    // Get the summary element to get it's height.
    let summaryElement: HTMLElement | null =
      this._details.querySelector('summary');

    // Get the content element to get it's height.
    let contentElement: HTMLDivElement | null =
      this._details.querySelector('div');

    // Get the height of the summary element.
    let summaryHeight = summaryElement?.clientHeight;

    // Get the height of the content element.
    let contentHeight = contentElement?.clientHeight;

    // Set activeHeight to the sum of both numbers if they exist.
    let fullHeight = contentHeight! + summaryHeight!;

    // Set the initHeight CSS var to summaryHeight - the height of the summary UI.
    this.style.setProperty('--initHeight', String(summaryHeight) + 'px');

    // Set the activeHeight CSS var to fullHeight as that is the total height the component should have when active.
    this.style.setProperty('--activeHeight', String(fullHeight) + 'px');
  }

  // Use firstUpdated to gather info about height of elements after first render.
  firstUpdated() {
    this._getHeights();
  }

  // Listen for widow resize and adjust height variables.
  _handleWindowResize() {
    this._getHeights();
  }

  // Handle click on details element - updates the isActive prop.
  _handleDetailsClick(event: Event) {
    // Prevent default details summary click event so details.open is set explicitly by isActive prop.
    event.preventDefault();

    // Toggle this.isActive.
    this.isActive = !this.isActive;
  }

  render() {
    return html`
    <details ?open=${this.isActive}>
      <summary @click=${this._handleDetailsClick}>
        <slot name="summary"></slot>
      </summary>
      <div>
        <slot>
        </slot>
      </div>
    </details>`;
  }

  static get styles() {
    return [
      css`
      :host {
        /* TODO:  use MDS variables for border etc. */
        display: block;
        overflow: hidden;
        background: white;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border: 2px #000 solid;
        box-shadow: 2px 2px 2px hsla(0,0%,54.1%,.3);
        transition: height var(--animation-duration-fast);
        /* Set initial height to initHeight variable. */
        height: var(--initHeight);
      }
      /* Set height when active attribute set (thus 'open') to activeHeight variable. */
      :host([isActive]) {
        height: var(--activeHeight);
      }
      summary {
        padding: 0.5rem;
        font-weight: bold;
      }
      div {
        padding-bottom: 0.5rem
      }
      `,
      sharedWCStyles,
    ];
  }
}
