/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = window, K = k.ShadowRoot && (k.ShadyCSS === void 0 || k.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), Q = /* @__PURE__ */ new WeakMap();
class dt {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== J)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (K && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Q.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const ct = (n) => new dt(typeof n == "string" ? n : n + "", void 0, J), ut = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new dt(e, n, J);
}, _t = (n, t) => {
  K ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = k.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  });
}, X = K ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return ct(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var j;
const N = window, Y = N.trustedTypes, gt = Y ? Y.emptyScript : "", tt = N.reactiveElementPolyfillSupport, Z = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? gt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, pt = (n, t) => t !== n && (t == t || n == n), B = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: pt };
class _ extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    (e = this.h) !== null && e !== void 0 || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const s = this._$Ep(i, e);
      s !== void 0 && (this._$Ev.set(s, i), t.push(s));
    }), t;
  }
  static createProperty(t, e = B) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const r = this[t];
      this[e] = s, this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || B;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(X(s));
    } else
      t !== void 0 && e.push(X(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return _t(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = B) {
    var s;
    const r = this.constructor._$Ep(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : Z).toAttribute(e, i.type);
      this._$El = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, r = s._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const o = s.getPropertyOptions(r), d = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((i = o.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? o.converter : Z;
      this._$El = r, this[r] = d.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || pt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, r) => this[r] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var r;
        return (r = s.hostUpdate) === null || r === void 0 ? void 0 : r.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
_.finalized = !0, _.elementProperties = /* @__PURE__ */ new Map(), _.elementStyles = [], _.shadowRootOptions = { mode: "open" }, tt == null || tt({ ReactiveElement: _ }), ((j = N.reactiveElementVersions) !== null && j !== void 0 ? j : N.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var I;
const M = window, A = M.trustedTypes, et = A ? A.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, $ = `lit$${(Math.random() + "").slice(9)}$`, vt = "?" + $, yt = `<${vt}>`, b = document, C = (n = "") => b.createComment(n), x = (n) => n === null || typeof n != "object" && typeof n != "function", $t = Array.isArray, At = (n) => $t(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, st = />/g, f = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt = /'/g, ot = /"/g, ft = /^(?:script|style|textarea|title)$/i, bt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), g = bt(1), w = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), rt = /* @__PURE__ */ new WeakMap(), wt = (n, t, e) => {
  var i, s;
  const r = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let o = r._$litPart$;
  if (o === void 0) {
    const d = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    r._$litPart$ = o = new O(t.insertBefore(C(), d), d, void 0, e != null ? e : {});
  }
  return o._$AI(n), o;
}, y = b.createTreeWalker(b, 129, null, !1), Et = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : "", o = S;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let v, h, c = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, h = o.exec(a), h !== null); )
      p = o.lastIndex, o === S ? h[1] === "!--" ? o = it : h[1] !== void 0 ? o = st : h[2] !== void 0 ? (ft.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = f) : h[3] !== void 0 && (o = f) : o === f ? h[0] === ">" ? (o = s != null ? s : S, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, v = h[1], o = h[3] === void 0 ? f : h[3] === '"' ? ot : nt) : o === ot || o === nt ? o = f : o === it || o === st ? o = S : (o = f, s = void 0);
    const U = o === f && n[l + 1].startsWith("/>") ? " " : "";
    r += o === S ? a + yt : c >= 0 ? (i.push(v), a.slice(0, c) + "$lit$" + a.slice(c) + $ + U) : a + $ + (c === -2 ? (i.push(void 0), l) : U);
  }
  const d = r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [et !== void 0 ? et.createHTML(d) : d, i];
};
class P {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const d = t.length - 1, l = this.parts, [a, v] = Et(t, e);
    if (this.el = P.createElement(a, i), y.currentNode = this.el.content, e === 2) {
      const h = this.el.content, c = h.firstChild;
      c.remove(), h.append(...c.childNodes);
    }
    for (; (s = y.nextNode()) !== null && l.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const h = [];
          for (const c of s.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith($)) {
              const p = v[o++];
              if (h.push(c), p !== void 0) {
                const U = s.getAttribute(p.toLowerCase() + "$lit$").split($), T = /([.?@])?(.*)/.exec(p);
                l.push({ type: 1, index: r, name: T[2], strings: U, ctor: T[1] === "." ? Ct : T[1] === "?" ? Pt : T[1] === "@" ? Ht : L });
              } else
                l.push({ type: 6, index: r });
            }
          for (const c of h)
            s.removeAttribute(c);
        }
        if (ft.test(s.tagName)) {
          const h = s.textContent.split($), c = h.length - 1;
          if (c > 0) {
            s.textContent = A ? A.emptyScript : "";
            for (let p = 0; p < c; p++)
              s.append(h[p], C()), y.nextNode(), l.push({ type: 2, index: ++r });
            s.append(h[c], C());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === vt)
          l.push({ type: 2, index: r });
        else {
          let h = -1;
          for (; (h = s.data.indexOf($, h + 1)) !== -1; )
            l.push({ type: 7, index: r }), h += $.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = b.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(n, t, e = n, i) {
  var s, r, o, d;
  if (t === w)
    return t;
  let l = i !== void 0 ? (s = e._$Cl) === null || s === void 0 ? void 0 : s[i] : e._$Cu;
  const a = x(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== a && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, !1), a === void 0 ? l = void 0 : (l = new a(n), l._$AT(n, e, i)), i !== void 0 ? ((o = (d = e)._$Cl) !== null && o !== void 0 ? o : d._$Cl = [])[i] = l : e._$Cu = l), l !== void 0 && (t = E(n, l._$AS(n, t.values), l, i)), t;
}
class St {
  constructor(t, e) {
    this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var e;
    const { el: { content: i }, parts: s } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : b).importNode(i, !0);
    y.currentNode = r;
    let o = y.nextNode(), d = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (d === a.index) {
        let v;
        a.type === 2 ? v = new O(o, o.nextSibling, this, t) : a.type === 1 ? v = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (v = new Ot(o, this, t)), this.v.push(v), a = s[++l];
      }
      d !== (a == null ? void 0 : a.index) && (o = y.nextNode(), d++);
    }
    return r;
  }
  m(t) {
    let e = 0;
    for (const i of this.v)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class O {
  constructor(t, e, i, s) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$C_ = (r = s == null ? void 0 : s.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$C_;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), x(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== w && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : At(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== u && x(this._$AH) ? this._$AA.nextSibling.data = t : this.k(b.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.m(i);
    else {
      const o = new St(r, this), d = o.p(this.options);
      o.m(i), this.k(d), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = rt.get(t.strings);
    return e === void 0 && rt.set(t.strings, e = new P(t)), e;
  }
  O(t) {
    $t(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new O(this.S(C()), this.S(C()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$C_ = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class L {
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = E(this, t, e, 0), o = !x(t) || t !== this._$AH && t !== w, o && (this._$AH = t);
    else {
      const d = t;
      let l, a;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        a = E(this, d[i + l], e, l), a === w && (a = this._$AH[l]), o || (o = !x(a) || a !== this._$AH[l]), a === u ? t = u : t !== u && (t += (a != null ? a : "") + r[l + 1]), this._$AH[l] = a;
    }
    o && !s && this.P(t);
  }
  P(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Ct extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const xt = A ? A.emptyScript : "";
class Pt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== u ? this.element.setAttribute(this.name, xt) : this.element.removeAttribute(this.name);
  }
}
class Ht extends L {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = E(this, t, e, 0)) !== null && i !== void 0 ? i : u) === w)
      return;
    const s = this._$AH, r = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== u && (s === u || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ot {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const lt = M.litHtmlPolyfillSupport;
lt == null || lt(P, O), ((I = M.litHtmlVersions) !== null && I !== void 0 ? I : M.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var q, V;
class m extends _ {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = wt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return w;
  }
}
m.finalized = !0, m._$litElement$ = !0, (q = globalThis.litElementHydrateSupport) === null || q === void 0 || q.call(globalThis, { LitElement: m });
const at = globalThis.litElementPolyfillSupport;
at == null || at({ LitElement: m });
((V = globalThis.litElementVersions) !== null && V !== void 0 ? V : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = ({ finisher: n, descriptor: t }) => (e, i) => {
  var s;
  if (i === void 0) {
    const r = (s = e.originalKey) !== null && s !== void 0 ? s : e.key, o = t != null ? { kind: "method", placement: "prototype", key: r, descriptor: t(e.key) } : { ...e, key: r };
    return n != null && (o.finisher = function(d) {
      n(d, r);
    }), o;
  }
  {
    const r = e.constructor;
    t !== void 0 && Object.defineProperty(e, i, t(i)), n == null || n(r, i);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = (n) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(n, t) : ((e, i) => {
  const { kind: s, elements: r } = i;
  return { kind: s, elements: r, finisher(o) {
    customElements.define(e, o);
  } };
})(n, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, n);
} };
function D(n) {
  return (t, e) => e !== void 0 ? ((i, s, r) => {
    s.constructor.createProperty(r, i);
  })(n, t, e) : Tt(n, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var W;
const kt = ((W = window.HTMLSlotElement) === null || W === void 0 ? void 0 : W.prototype.assignedElements) != null ? (n, t) => n.assignedElements(t) : (n, t) => n.assignedNodes(t).filter((e) => e.nodeType === Node.ELEMENT_NODE);
function Nt(n) {
  const { slot: t, selector: e } = n != null ? n : {};
  return Ut({ descriptor: (i) => ({ get() {
    var s;
    const r = "slot" + (t ? `[name=${t}]` : ":not([name])"), o = (s = this.renderRoot) === null || s === void 0 ? void 0 : s.querySelector(r), d = o != null ? kt(o, n) : [];
    return e ? d.filter((l) => l.matches(e)) : d;
  }, enumerable: !0, configurable: !0 }) });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");
const Mt = `.sr-only:not(:focus):not(:active){clip:rect(0 0 0 0);clip-path:inset(100%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}mds-drawer:defined{animation-name:slide-from-left,fade-in;animation-duration:.3s,.3s;animation-play-state:paused,running}@keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes slide-from-left{0%{margin-left:calc(-33vw - 1rem)}to{margin-left:0}}mds-drawer:not(:defined){margin-left:-1000px}@media (min-width: 420px){mds-mobile-adapted-content [slot=mobile-only]{display:none}}@media (max-width: 420px){mds-mobile-adapted-content :not([slot="mobile-only"]){display:none}}
`;
let mt = ct(Mt);
var Rt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, z = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Lt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && Rt(t, e, s), s;
};
let H = class extends m {
  constructor() {
    super(...arguments), this.openStatus = !1, this.sectionTitle = "", this.initialized = !1;
  }
  handleClick() {
    this.initialized = !1, this.openStatus = !this.openStatus;
  }
  render() {
    let n = g`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`, t = g`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`, e = "open", i = n;
    return this.openStatus && (e = "close", i = t), g`
    <section>
      <button @click=${this.handleClick} >
        <span class="sr-only">
          ${e}
        </span>
          ${i} 
      </button>
      
      <h3>${this.sectionTitle}</h3>
      ${this.openStatus}
      <slot></slot>
    </section>`;
  }
  connectedCallback() {
    super.connectedCallback(), this.initialized = !0;
  }
  static get styles() {
    return [
      ut`
      /* Main containing element for drawer. */
      :host {
        display: flex;
        position: relative;
        background: white;
        padding: 0.5rem;
        width: calc(33vw);
        height: calc(100vh - 1rem);
      }

      :host([openStatus]) {
        overflow: visible;
        animation-play-state: running !important;
      }

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
    `,
      mt
    ];
  }
};
z([
  D({ type: Boolean, reflect: !0 })
], H.prototype, "openStatus", 2);
z([
  D({ type: String })
], H.prototype, "sectionTitle", 2);
z([
  D({ type: Boolean, reflect: !0 })
], H.prototype, "initialized", 2);
H = z([
  F("mds-drawer")
], H);
var Dt = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, jt = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? zt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && Dt(t, e, s), s;
};
let ht = class extends m {
  render() {
    let n = window.matchMedia("(max-width: 420px)").matches, t = g`<slot></slot>`;
    return n && (t = g`
          <slot name="mobile-only"></slot>`), t;
  }
};
ht = jt([
  F("mds-mobile-adapted-content")
], ht);
var Bt = Object.defineProperty, It = Object.getOwnPropertyDescriptor, G = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? It(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && Bt(t, e, s), s;
};
let R = class extends m {
  constructor() {
    super(...arguments), this.isActive = "inactive";
  }
  handleClick() {
    console.log(this._details);
  }
  firstUpdated() {
    let n = this;
    this.addEventListener("click", function(i) {
      requestAnimationFrame(function() {
        n.isActive = n._details[0].open ? "active" : "inactive", console.log(n._details[0].open);
      });
    }), this._details[0].open = this.isActive == "active", console.log("details", this._details);
    let t = this._details[0].querySelectorAll(".selected, .active"), e = this._details[0].querySelector("summary");
    this.isActive == "inactive" && t.length > 0 && e && (console.log("sumEl", e), e.click());
  }
  render() {
    return g`
    <slot>
    </slot>
    </details>`;
  }
  static get styles() {
    return [
      ut`
      :host {display: block;
        overflow: hidden;
        transition: height 0.2s;
      }
      :host([isActive="inactive"]) {
        /* replace with initialHeight*/
        height: ${30}px;
        background: red;
      }
      :host([isActive="active"]) {
        /* replace with activeHeight */
        height: ${50}px;
        background: green;
      }
      `,
      mt
    ];
  }
};
G([
  D({ type: String, reflect: !0 })
], R.prototype, "isActive", 2);
G([
  Nt({ selector: "details" })
], R.prototype, "_details", 2);
R = G([
  F("mds-extra-details")
], R);
export {
  H as DrawerElement,
  R as ExtraDetails,
  ht as MobileAdaptedContent
};
