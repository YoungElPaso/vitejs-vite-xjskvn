import { LitElement, html, property, customElement, css } from 'lit-element';

import { z } from 'zod';

type AnimationType = 'fade' | 'slide';
type OpenType = Boolean;
type SideType = 'left' | 'right';
// TODO: continue to port the JS element to this one later...
// https://youtu.be/RmGHnYUqQ4k check out this and using Zod to add type inference and safety.

// const FishEnum = z.enum(['Salmon', 'Tuna', 'Trout']);
// type FishEnum = z.infer<typeof FishEnum>;
// 'Salmon' | 'Tuna' | 'Trout'

// TODO: define zod schema/api for the whole component? So can be in one place and validate w/ one function? - maybe try using a Zod validator function?

const DrawerTypes = {
  open: z.boolean(),
  side: z.enum(['right', 'left']),
};

const DrawerPropValidator = z.object(DrawerTypes);

// Needs a lifecycle hook to run this right? And some error handling? Probably wanna toss a warning to console rather than blow up the whole thing?
// TODO: put into the class and in a lifecycle funtion - maybe just render. See: https://stackoverflow.com/questions/68008726/how-to-declare-a-required-property-in-lit-element/68014897#68014897
// const valid = DrawerPropValidator.parse({
//   open: true,
//   side: 'right',
// });

@customElement('new-element')
export class NewElement extends LitElement {
  @property({ type: String }) side: String = '';
  @property({ type: String }) test: AnimationType = 'slide';
  @property({ type: Boolean }) open: OpenType = false;

  // TODO: validate props using zod.
  validateProps() {
    let validationResult = DrawerPropValidator.safeParse({
      open: this.open,
      side: this.side,
    });
    if (!validationResult.success) {
      console.warn('props not set correctly.');
    } else {
      console.log(validationResult.data);
    }
  }

  // Render element.
  render() {
    this.validateProps();
    return html`<p>${this.test}</p>`;
  }

  static get styles() {
    return css`
      :host {
        background: red;
        border:10px black solid;
      }
    `;
  }
}
