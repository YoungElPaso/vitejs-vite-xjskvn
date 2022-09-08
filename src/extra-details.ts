import {
  LitElement,
  customElement,
  html,
  css,
  property,
  queryAssignedElements,
} from 'lit-element';

import { sharedWCStyles } from './css-importer';

@customElement('mds-extra-details')
export class ExtraDetails extends LitElement {
  // isActive reflected property to allow manual setting of isActive or not; defaults to 'inactive', can be 'active'.
  // TODO: should this just be a boolean? Probably. Allows access to set open/closed for child from outside easily and declaratively on parent, enables accordion type behaviour based on higher state (e.g. open one detail, close others etc) and composing together and by checking child elements for 'activity' and setting parent open/closed.
  @property({ type: String, reflect: true }) isActive: String =
    'inactive' || 'active';
  // TODO: tie this to details 'open' attr by passing down?

  @queryAssignedElements({ selector: 'details' })
  // Have to losely type a bit otherwise type errors on some attributes for returned HTMLElement.
  _summary!: Array<HTMLElement | any>;

  // TODO: this handler needs to be added to the <summary> tag which is a part of the child markup slotted.

  // TODO: need to grab refs to some of the child elements to attach handlers, update attributes etc. Read how to do that!
  handleClick() {
    console.log(this._summary);
  }

  // TODO: also need to add animation to open/close. For that need to compute heights and then transition between them - so dynamically set style based on children? Could calculate on firstUpdate maybe?

  // TODO: also need to check if children of details are 'active' if so bubble up an event to set the property? Sure. sounds good.

  firstUpdated() {
    // super.firstUpdated();
    // console.log(this._summary[0]);
    // this._summary[0].onclick = function () {
    //   console.log('summary!');
    // };
    // OK, cool, so can pass prop down via attribute like this!?
    this._summary[0].open = this.isActive == 'active' ? true : false;
  }

  // TODO: scrap the onclick stuff? Details already handles that? Can just hook into attribute changing there and bubble up event? Or just listen to that event at a higher level? Probably the better way to go! Then just need a way to pass down prop...probably can do w/ firstUpdated?

  render() {
    return html`
    <slot>
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
