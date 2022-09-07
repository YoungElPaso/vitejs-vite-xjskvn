import { adoptStyles, unsafeCSS } from 'lit';
import { LitElement, html, property, customElement, css } from 'lit-element';

// Get styles from css-importer.
import mainstyles from './css-importer';

// See: https://youtu.be/RmGHnYUqQ4k for using Zod to add type inference and safety.
import { z } from 'zod';

// Bummer! Not the modules I wanted....TODO: continue to look into this later! Want the un-hashed version! TODO: check the Google article about importing css as module style - not the npm CSS MOdules.
// console.log(styles);

// TODO: try this??? https://lit.dev/docs/api/styles/#adoptStyles

// Define zod schema/api for the whole component So can be in one place and validate using a Zod parse. All props are required by default.
const DrawerProps = z.object({
  // Open or closed status - defaults to false.
  openStatus: z.boolean().default(false),

  // TODO: don't actually need side either - really only makes sense on left I think(?)
  // Which side to position the drawer (i.e. which direction it closes to).
  side: z.enum(['right', 'left']),

  // A title for the entire section, optional.
  sectionTitle: z.string().optional(),

  // TODO: Should we have width as a percentage? Probably not. Let's just settle on 75%.

  // TODO: need an internal property called 'initalized' or something that should disappear on first render or connectedCallback or first interaction or if visible. Required to handle loading state. Could also remove via any click as well since that's an indication of interaction.
  initialized: z.boolean().default(false),
});

// Convert schema to a type.
type DrawerTypes = z.infer<typeof DrawerProps>;

// Validate props at run-time as well, see: https://stackoverflow.com/questions/68008726/how-to-declare-a-required-property-in-lit-element/68014897#68014897

// Declare new custom element: mds-drawer.
@customElement('mds-drawer')
export class DrawerElement extends LitElement {
  // Declare Lit element properties w/ types - reusing Zod/DrawerTypes work.
  @property({ type: String }) side: DrawerTypes['side'] = 'left';

  // This property/attribute reflects so we can use it in CSS.
  @property({ type: Boolean, reflect: true })
  openStatus: DrawerTypes['openStatus'] = false;

  @property({ type: String }) sectionTitle: DrawerTypes['sectionTitle'];

  @property({ type: Boolean, reflect: true })
  initialized: DrawerTypes['initialized'] = false;

  // Validate props using zod safeParse - won't automatically throw an error if a prop is wrong - so we can output a warning to console.
  validateProps() {
    // TODO: gotta be a way to avoid this properties repetition everywhere...probably just use static properties.
    let validationResult = DrawerProps.safeParse({
      open: this.openStatus,
      sectionTitle: this.sectionTitle,
      initialized: this.initialized,
    });
    if (!validationResult.success) {
      console.warn('props not set correctly!', validationResult.error);
    } else {
      console.log('current props:', validationResult.data);
    }
  }

  // Handle button click.
  handleClick() {
    // Technically this could happen here, or only once at another time - just need to turn the initialized attribute off, since the component is now in use and CSS should reflect that.
    this.initialized = false;

    // Set openStatus to inverse of previous value.
    this.openStatus = !this.openStatus;
  }

  // Render element.
  render() {
    // Call validation function so props can be evaluated at runtime as well.
    this.validateProps();

    // Conditional button label.
    let buttonLabel = this.openStatus ? 'close' : 'open';

    // TODO: remove later in favour of IonIcon(?).
    let hamburgerIcon = html`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;

    // TODO: remove later in favour of IonIcon(?).
    let xIcon = html`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;

    // Conditional button icon markup based on openStatus.
    let buttonIcon = this.openStatus ? xIcon : hamburgerIcon;

    return html`
    
    
    <section>
      <button @click=${this.handleClick} >
        <span class="sr-only">
          ${buttonLabel}
        </span>
          ${buttonIcon} 
      </button>
      
      <h3>${this.sectionTitle}</h3>
      ${this.openStatus}
      <slot></slot>
    </section>`;
  }

  // TODO: finish internal logic, including button. Desktop layout CSS. Mobile template/conditional logic.

  // TODO: document this; maybe do adoption from mds-utilities-css component?
  // TODO: clean it all up; add to main repo - make sure active etc is in place. Maybe even include Portal WC?
  // connectedCallback() {
  //   super.connectedCallback();
  //   let s = this.shadowRoot;
  //   // // Add common styles from a loaded CSS file; adopt as constructed stylesheet.
  //   // TODO: retry later; this almost works!
  //   if (s) {
  //     adoptStyles(s, [css`${DrawerElement.styles}`]);
  //   }
  // }

  // Set initialized to true for use in CSS when element is connected to DOM.
  connectedCallback() {
    super.connectedCallback();
    this.initialized = true;
  }

  // TODO: props and props validation working! Now to test that a bit more and return to the outright styling and so forth!
  static get styles() {
    // TODO: this left/right needs to be dynamic based on side prop and animation style - tho fade doesn't make any sense really in this case so can remove that as well.
    // console.log(unsafeCSS(classes));
    return [
      css`
      :host {
        display: flex;
        position: relative;
        background: white;
        width: calc(33vw);
        height: calc(100vh - 1rem);
        padding: 0.5rem;
      }

      :host([openStatus]) {
        overflow: visible;
        animation-play-state: running !important;
      }


      :host([openStatus]) button {
        // background: black;
        // color: white;
      }

      button {
        position: absolute;
        top: 0;
        right: -3em;
        width: 3em;
        height: 3em;
        padding: 0;
        margin: 0;
        background: white;
        border: none;
      }
      button:hover,
      button:active,
      button:focus {
        background: white;
      }
    `,
      mainstyles,
      // TODO: is this the equivalent of using adoptStyles? Cause if so, what's the point??? Perf? Maybe it's more standard? I guess that's likely the case. Seems the main use for it for now tho, until https://web.dev/css-module-scripts/ lands is to create a 'provider' component that allows others to adoptStyles from(?)
      // unsafeCSS(mainstyles),
    ];
  }
}
