import { LitElement, css, html } from 'lit';

/**
 * A side-menu element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      // Copy for the section title.
      sectionTitle: { type: String },

      // Open or closed state.
      open: { type: Boolean },

      // Side of parent element to position - right or left.
      // Used in CSS positioning and animation.
      side: { type: String },

      // Animation style - fade or slide.
      // Used with slide to animate change of state.
      animation: { type: String },
    };
  }

  constructor() {
    super();
    // Read sectionTitle prop or set default.
    this.sectionTitle = this.sectionTitle || 'A hidden section';

    // Read or set default for open prop.
    this.open = this.open || false;
  }

  render() {
    return html`
      <div class="card">
        <h3>${this.sectionTitle}</h3>
        <button @click=${this._onClick} part="button">
          Open is ${this.open}
        </button>
      </div>
      <slot></slot>
      `;
  }

  // Handle click - open or close the section.
  _onClick() {
    this.open = !this.open;
  }

  static get styles() {
    return css`
      :host {
        background: green;
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }

      .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.lit:hover {
        filter: drop-shadow(0 0 2em #325cffaa);
      }

      .card {
        padding: 2em;
      }

      .read-the-docs {
        color: #888;
      }

      a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }
      a:hover {
        color: #535bf2;
      }

      h1 {
        font-size: 3.2em;
        line-height: 1.1;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      button:hover {
        border-color: #646cff;
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    `;
  }
}

window.customElements.define('side-menu', MyElement);
