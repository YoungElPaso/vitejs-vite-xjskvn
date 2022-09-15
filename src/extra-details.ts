// Import LitElement stuff.
import { LitElement, html, css } from 'lit';
import {
  property,
  query,
  queryAssignedElements,
  customElement,
} from 'lit/decorators.js';

import { sharedWCStyles } from './css-importer';

// Declare new element: mds-extra-details.
// Used for enhancing/replacing <details> with a version with animation, auto-opening if containing 'selected' content etc.
@customElement('mds-extra-details')
export class ExtraDetails extends LitElement {
  // isActive reflected property to allow manual setting of isActive or not; defaults to 'inactive', can be 'active'.
  // TODO: should this just be a boolean? Probably. Allows access to set open/closed for child from outside easily and declaratively on parent, enables accordion type behaviour based on higher state (e.g. open one detail, close others etc) and composing together and by checking child elements for 'activity' and setting parent open/closed.

  // Property for autoOpenSelector, allows component to check for children matching that selector.
  @property({ type: String }) autoOpenSelector: string = '';

  // Property for active state.
  @property({ type: Boolean, reflect: true }) isActive: boolean = false;

  // Get the child details element.
  // @queryAssignedElements({ selector: 'details' })
  @query('details')
  _details!: HTMLDetailsElement;

  // Get the slotted children elements.
  @queryAssignedElements({ selector: '*' })
  _slottedElements!: Array<HTMLElement>;

  // TODO: this handler needs to be added to the <summary> tag which is a part of the child markup slotted.

  // TODO: need to grab refs to some of the child elements to attach handlers, update attributes etc. Read how to do that!
  // handleClick() {
  //   console.log(this._details);
  // }

  // @state()
  // protected _initHeight: String | Number = '';
  // @state()
  // protected _activeHeight: String | Number = '';

  // TODO: also need to add animation to open/close. For that need to compute heights and then transition between them - so dynamically set style based on children? Could calculate on firstUpdate maybe?

  // TODO: do animation based on https://css-tricks.com/how-to-animate-the-details-element-using-waapi/ and continue to listen to click event on Summary to propagate click and state change to parent as well as handle click to handle animation (sync open/isActive props/attributes) and do animation/CSS on state change. Might need to intercept and disable default behavior as well based on click?

  // Listen for widow resize and adjust active height variables.
  handleWindowResize() {
    this.getHeights();
  }
  // Listen for widow resize and adjust active height variable.
  // handleWindowResize(component: ExtraDetails) {
  //   console.log(component);
  //   let summaryElement: HTMLElement | null =
  //     component?._details.querySelector('summary');

  //   let listElement: HTMLDivElement | null =
  //     component?._details.querySelector('div');

  //   let h = summaryElement?.clientHeight;
  //   let hh = listElement?.clientHeight;
  //   // TODO: account for margins on listElement...

  //   // let mm = listElement?.style.marginBlockStart;
  //   // console.log('mm', mm);
  //   hh = hh && h ? hh + h : 100;

  //   // Edge case, but this should probably be re-calculated on window resize etc? Maybe a todo...
  //   component.style.setProperty('--initHeight', String(h) + 'px');
  //   component.style.setProperty('--activeHeight', String(hh) + 'px');
  // }

  // Uses connectedCallback to compute some properties and set up some even listeners.
  connectedCallback() {
    super.connectedCallback();

    // If autoOpenSelector attr/prop set, use it to check for active children.
    if (this.autoOpenSelector) {
      // If fouund, activeChild is true.
      let activeChild: boolean =
        this.querySelectorAll(this.autoOpenSelector).length > 0;

      // If isActive is not already set and so is false, assign activeChild.
      if (!this.isActive) {
        this.isActive = activeChild;
      }
    }

    // Add event listener for window resizing.
    let t = this;
    window.addEventListener(
      'resize',
      function () {
        t.handleWindowResize();
      },
      false
    );

    // Add an event listener to handle clicks on the details element and update properties.
    this.addEventListener('click', function (e) {
      // Need to wrap in requestAnimationFrame to get the proper value of details.open after it's changed!
      requestAnimationFrame(function () {
        t.isActive = t._details.open;
      });
    });
  }

  // Calculates the heights required for animating the component on open/shut.
  getHeights() {
    let summaryElement: HTMLElement | null =
      this._details.querySelector('summary');

    let listElement: HTMLDivElement | null = this._details.querySelector('div');

    let h = listElement?.clientHeight;
    h = summaryElement?.clientHeight;

    let hh = listElement?.clientHeight;

    // TODO: this is a bit confusing! Explain it...
    hh = hh && h ? hh + h : 100;

    this.style.setProperty('--initHeight', String(h) + 'px');
    this.style.setProperty('--activeHeight', String(hh) + 'px');
  }

  // Use firstUpdated to gather info about height of elements after first render.
  firstUpdated() {
    this.getHeights();
  }

  render() {
    let open = this.isActive ? 'open' : '';
    return html`
    <details ?open=${open}>
      <summary>
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
        display: block;
        overflow: hidden;
        background: white;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border-radius: 0.25rem;
        border: 1px #bbb solid;
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
