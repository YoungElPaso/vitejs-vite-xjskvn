import {
  LitElement,
  customElement,
  html,
  css,
  property,
  query,
  queryAssignedElements,
} from 'lit-element';

import { sharedWCStyles } from './css-importer';

@customElement('mds-extra-details')
export class ExtraDetails extends LitElement {
  // isActive reflected property to allow manual setting of isActive or not; defaults to 'inactive', can be 'active'.
  // TODO: should this just be a boolean? Probably. Allows access to set open/closed for child from outside easily and declaratively on parent, enables accordion type behaviour based on higher state (e.g. open one detail, close others etc) and composing together and by checking child elements for 'activity' and setting parent open/closed.
  @property({ type: String }) summary: String | null = null;
  @property({ type: String, reflect: true }) isActive: String =
    'inactive' || 'active';
  // TODO: tie this to details 'open' attr by passing down?

  // Get the child details element.
  // @queryAssignedElements({ selector: 'details' })
  @query('details')
  _details!: Array<HTMLDetailsElement>;

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

  // TODO: also need to check if children of details are 'active' if so bubble up an event to set the property? Sure. sounds good.

  firstUpdated() {
    // TODO: replace hardcoded w/ calculated values based on layout:
    // this._initHeight = 1;
    // this._activeHeight = 6;

    // Add an event listener to handle clicks on the details element and update properties.
    let t = this;
    this.addEventListener('click', function (e) {
      // Need to wrap in requestAnimationFrame to get the proper value of details.open after it's changed!
      // TODO: unsure this makes sense...
      requestAnimationFrame(function () {
        t.isActive = t._details.open ? 'active' : 'inactive';
        console.log(t._details.open);
      });
    });

    // TODO: post-refactor, fix type errors on elements!

    // super.firstUpdated();
    // console.log(this._details[0]);
    // this._details[0].onclick = function () {
    //   console.log('summary!');
    // };

    // console.log('summary', this._summary);

    // TODO: replace with a summary click. Close the circle. Make it all event based? Hmmm, maybe not...No, prop should go down, click event should go up.
    // TODO: move these lines around and make it clear w/ comments how this component is being initialized.
    this._details.open = this.isActive == 'active' ? true : false;

    // Evaluate some stuff about the children and set some props. 1) Set isActive=active if childNodes contain a 'selected' or 'active' class only if isActive is 'inactive' already and the initial value. 2) Get the summary element and get it's height - can use that as initialHeight for animation.

    console.log('details', this._details);

    // See if there are any active children.
    let activeChild: NodeList | null =
      this._details.querySelectorAll('.selected, .active');

    // TODO: this should probably be replaced by an event listener and instead I should simulate a click on the summary - that will keep the details open attr and isActive in sync I think and take advantage of event bubbling from child on up, while we set intial state from parent down!
    // this.isActive = activeChild ? 'active' : 'inactive';
    // console.log(activeChild, this.isActive);
    let summaryElement: HTMLElement | null =
      this._details.querySelector('summary');

    let listElement: HTMLDivElement | null =
      this._details.querySelector('div');
    // TODO: also get summary height as initial height for inactive state and use w/ animation with other child elements heights to create 'from' 'to' values.
    let h = summaryElement?.clientHeight;
    let hh = listElement?.clientHeight;
    // TODO: account for margins on listElement...

    // let mm = listElement?.style.marginBlockStart;
    // console.log('mm', mm);
    hh = hh && h ? hh + h : 100;

    // Edge case, but this should probably be re-calculated on window resize etc? Maybe a todo...
    this.style.setProperty('--initHeight', String(h) + 'px');
    this.style.setProperty('--activeHeight', String(hh) + 'px');

    // TOOD: all of the calculations above and dimensions and stuff gets very hard to be sure of if we allow any children and dont include the details parts in the ShadowDOM - passing any content into a slot means trying to suss out parts and calculating the margins etc. Probably should make this a lot simpler and have the component itself define most of the details parts and wrap slotted content in a div so we can easily ascertain the height of that and add to summary which we can know easily, without querying slotted content to form the total activeHeight etc. Works for now tho! YAy!

    // If initial state is inactive and there's a summary and there's also an 'active' child element, then open the details by doing a click event.
    if (
      this.isActive == 'inactive' &&
      activeChild.length > 0 &&
      summaryElement
    ) {
      console.log('sumEl', summaryElement);
      summaryElement.click();
    }
  }

  // TODO: scrap the onclick stuff? Details already handles that? Can just hook into attribute changing there and bubble up event? Or just listen to that event at a higher level? Probably the better way to go! Then just need a way to pass down prop...probably can do w/ firstUpdated?

  render() {
    // OK, cool, so can pass prop down via attribute like this!? TODO: this has to be in another lifecycle hook cause _details is undefined here.
    // this._details[0].open = this.isActive == 'active' ? true : false;
    return html`
    <details>
      <summary>${this.summary}</summary>
        <div>
          <slot>
          </slot>
        </div>
    </details>`;
  }

  static get styles() {
    // TODO: set these as internal props and calculate on firstUpdate?
    // let initialHeight = 30;
    // let activeHeight = 50;
    return [
      // TODO: set some basic styles, maybe border? Maybe initial height?
      css`
      :host {display: block;
        overflow: hidden;
        transition: height 0.2s;
        background: white;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border-radius: 0.25rem;
      }
      :host([isActive="inactive"]) {
        height: var(--initHeight);
      }
      :host([isActive="active"]) {
        height: var(--activeHeight);
      }
      summary {
        padding: 0.5rem;
        background: #AAA;
      }

      div {
        background: lightgreen;
        padding-bottom: 0.5rem
      }
      `,
      sharedWCStyles,
    ];
  }
}
