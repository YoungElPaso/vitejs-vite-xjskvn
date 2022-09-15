/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = window, K = T.ShadowRoot && (T.ShadyCSS === void 0 || T.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = Symbol(), G = /* @__PURE__ */ new WeakMap();
class at {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== F)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (K && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = G.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && G.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const ht = (n) => new at(typeof n == "string" ? n : n + "", void 0, F), dt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new at(e, n, F);
}, _t = (n, t) => {
  K ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = T.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  });
}, Q = K ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return ht(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var B;
const M = window, X = M.trustedTypes, mt = X ? X.emptyScript : "", Y = M.reactiveElementPolyfillSupport, Z = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? mt : null;
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
} }, ct = (n, t) => t !== n && (t == t || n == n), I = { attribute: !0, type: String, converter: Z, reflect: !1, hasChanged: ct };
class g extends HTMLElement {
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
  static createProperty(t, e = I) {
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
    return this.elementProperties.get(t) || I;
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
        e.unshift(Q(s));
    } else
      t !== void 0 && e.push(Q(t));
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
  _$EO(t, e, i = I) {
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
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || ct)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
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
g.finalized = !0, g.elementProperties = /* @__PURE__ */ new Map(), g.elementStyles = [], g.shadowRootOptions = { mode: "open" }, Y == null || Y({ ReactiveElement: g }), ((B = M.reactiveElementVersions) !== null && B !== void 0 ? B : M.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var j;
const R = window, y = R.trustedTypes, tt = y ? y.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, f = `lit$${(Math.random() + "").slice(9)}$`, ut = "?" + f, yt = `<${ut}>`, A = document, C = (n = "") => A.createComment(n), x = (n) => n === null || typeof n != "object" && typeof n != "function", pt = Array.isArray, At = (n) => pt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, it = />/g, $ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, nt = /"/g, vt = /^(?:script|style|textarea|title)$/i, wt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), N = wt(1), w = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), rt = /* @__PURE__ */ new WeakMap(), bt = (n, t, e) => {
  var i, s;
  const r = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let o = r._$litPart$;
  if (o === void 0) {
    const d = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    r._$litPart$ = o = new H(t.insertBefore(C(), d), d, void 0, e != null ? e : {});
  }
  return o._$AI(n), o;
}, _ = A.createTreeWalker(A, 129, null, !1), St = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : "", o = E;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let v, h, c = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, h = o.exec(a), h !== null); )
      p = o.lastIndex, o === E ? h[1] === "!--" ? o = et : h[1] !== void 0 ? o = it : h[2] !== void 0 ? (vt.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = $) : h[3] !== void 0 && (o = $) : o === $ ? h[0] === ">" ? (o = s != null ? s : E, c = -1) : h[1] === void 0 ? c = -2 : (c = o.lastIndex - h[2].length, v = h[1], o = h[3] === void 0 ? $ : h[3] === '"' ? nt : st) : o === nt || o === st ? o = $ : o === et || o === it ? o = E : (o = $, s = void 0);
    const U = o === $ && n[l + 1].startsWith("/>") ? " " : "";
    r += o === E ? a + yt : c >= 0 ? (i.push(v), a.slice(0, c) + "$lit$" + a.slice(c) + f + U) : a + f + (c === -2 ? (i.push(void 0), l) : U);
  }
  const d = r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [tt !== void 0 ? tt.createHTML(d) : d, i];
};
class P {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const d = t.length - 1, l = this.parts, [a, v] = St(t, e);
    if (this.el = P.createElement(a, i), _.currentNode = this.el.content, e === 2) {
      const h = this.el.content, c = h.firstChild;
      c.remove(), h.append(...c.childNodes);
    }
    for (; (s = _.nextNode()) !== null && l.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const h = [];
          for (const c of s.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith(f)) {
              const p = v[o++];
              if (h.push(c), p !== void 0) {
                const U = s.getAttribute(p.toLowerCase() + "$lit$").split(f), k = /([.?@])?(.*)/.exec(p);
                l.push({ type: 1, index: r, name: k[2], strings: U, ctor: k[1] === "." ? Ct : k[1] === "?" ? Pt : k[1] === "@" ? Ht : D });
              } else
                l.push({ type: 6, index: r });
            }
          for (const c of h)
            s.removeAttribute(c);
        }
        if (vt.test(s.tagName)) {
          const h = s.textContent.split(f), c = h.length - 1;
          if (c > 0) {
            s.textContent = y ? y.emptyScript : "";
            for (let p = 0; p < c; p++)
              s.append(h[p], C()), _.nextNode(), l.push({ type: 2, index: ++r });
            s.append(h[c], C());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === ut)
          l.push({ type: 2, index: r });
        else {
          let h = -1;
          for (; (h = s.data.indexOf(f, h + 1)) !== -1; )
            l.push({ type: 7, index: r }), h += f.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function b(n, t, e = n, i) {
  var s, r, o, d;
  if (t === w)
    return t;
  let l = i !== void 0 ? (s = e._$Cl) === null || s === void 0 ? void 0 : s[i] : e._$Cu;
  const a = x(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== a && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, !1), a === void 0 ? l = void 0 : (l = new a(n), l._$AT(n, e, i)), i !== void 0 ? ((o = (d = e)._$Cl) !== null && o !== void 0 ? o : d._$Cl = [])[i] = l : e._$Cu = l), l !== void 0 && (t = b(n, l._$AS(n, t.values), l, i)), t;
}
class Et {
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
    const { el: { content: i }, parts: s } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : A).importNode(i, !0);
    _.currentNode = r;
    let o = _.nextNode(), d = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (d === a.index) {
        let v;
        a.type === 2 ? v = new H(o, o.nextSibling, this, t) : a.type === 1 ? v = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (v = new Ot(o, this, t)), this.v.push(v), a = s[++l];
      }
      d !== (a == null ? void 0 : a.index) && (o = _.nextNode(), d++);
    }
    return r;
  }
  m(t) {
    let e = 0;
    for (const i of this.v)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class H {
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
    t = b(this, t, e), x(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== w && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : At(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== u && x(this._$AH) ? this._$AA.nextSibling.data = t : this.k(A.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.m(i);
    else {
      const o = new Et(r, this), d = o.p(this.options);
      o.m(i), this.k(d), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = rt.get(t.strings);
    return e === void 0 && rt.set(t.strings, e = new P(t)), e;
  }
  O(t) {
    pt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new H(this.S(C()), this.S(C()), this, this.options)) : i = e[s], i._$AI(r), s++;
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
class D {
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
      t = b(this, t, e, 0), o = !x(t) || t !== this._$AH && t !== w, o && (this._$AH = t);
    else {
      const d = t;
      let l, a;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        a = b(this, d[i + l], e, l), a === w && (a = this._$AH[l]), o || (o = !x(a) || a !== this._$AH[l]), a === u ? t = u : t !== u && (t += (a != null ? a : "") + r[l + 1]), this._$AH[l] = a;
    }
    o && !s && this.P(t);
  }
  P(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Ct extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const xt = y ? y.emptyScript : "";
class Pt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== u ? this.element.setAttribute(this.name, xt) : this.element.removeAttribute(this.name);
  }
}
class Ht extends D {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = b(this, t, e, 0)) !== null && i !== void 0 ? i : u) === w)
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
    b(this, t);
  }
}
const ot = R.litHtmlPolyfillSupport;
ot == null || ot(P, H), ((j = R.litHtmlVersions) !== null && j !== void 0 ? j : R.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var q, W;
class m extends g {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = bt(e, this.renderRoot, this.renderOptions);
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
const lt = globalThis.litElementPolyfillSupport;
lt == null || lt({ LitElement: m });
((W = globalThis.litElementVersions) !== null && W !== void 0 ? W : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = (n) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(n, t) : ((e, i) => {
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
const Ut = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, n);
} };
function z(n) {
  return (t, e) => e !== void 0 ? ((i, s, r) => {
    s.constructor.createProperty(r, i);
  })(n, t, e) : Ut(n, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = ({ finisher: n, descriptor: t }) => (e, i) => {
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
function kt(n, t) {
  return $t({ descriptor: (e) => {
    const i = { get() {
      var s, r;
      return (r = (s = this.renderRoot) === null || s === void 0 ? void 0 : s.querySelector(n)) !== null && r !== void 0 ? r : null;
    }, enumerable: !0, configurable: !0 };
    if (t) {
      const s = typeof e == "symbol" ? Symbol() : "__" + e;
      i.get = function() {
        var r, o;
        return this[s] === void 0 && (this[s] = (o = (r = this.renderRoot) === null || r === void 0 ? void 0 : r.querySelector(n)) !== null && o !== void 0 ? o : null), this[s];
      };
    }
    return i;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var V;
const Tt = ((V = window.HTMLSlotElement) === null || V === void 0 ? void 0 : V.prototype.assignedElements) != null ? (n, t) => n.assignedElements(t) : (n, t) => n.assignedNodes(t).filter((e) => e.nodeType === Node.ELEMENT_NODE);
function Nt(n) {
  const { slot: t, selector: e } = n != null ? n : {};
  return $t({ descriptor: (i) => ({ get() {
    var s;
    const r = "slot" + (t ? `[name=${t}]` : ":not([name])"), o = (s = this.renderRoot) === null || s === void 0 ? void 0 : s.querySelector(r), d = o != null ? Tt(o, n) : [];
    return e ? d.filter((l) => l.matches(e)) : d;
  }, enumerable: !0, configurable: !0 }) });
}
const Mt = `:root{--animation-duration: .6s;--animation-duration-fast: .3s;--animation-duration-slow: 1.2s}.sr-only:not(:focus):not(:active){clip:rect(0 0 0 0);clip-path:inset(100%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}@keyframes fade-in{0%{opacity:0}to{opacity:1}}mds-drawer:not(:defined){display:none}mds-drawer:defined{animation:fade-in var(--animation-duration)}mds-mobile-adapted-content:defined{animation:fade-in var(--animation-duration)}@media (min-width: 420px){[slot=mobile-only]{display:none}}@media (max-width: 420px){[slot=desktop]{display:none}}mds-extra-details{animation:fade-in var(--animation-duration-slow)}mds-extra-details [slot=summary]{font-size:1rem;margin:0;display:inline-block}mds-extra-details:not(:defined) *{visibility:hidden}
`;
let gt = ht(Mt);
var Rt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, J = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Lt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && Rt(t, e, s), s;
};
let L = class extends m {
  constructor() {
    super(...arguments), this.openStatus = !1, this.sectionTitle = "";
  }
  handleClick() {
    this.openStatus = !this.openStatus;
  }
  render() {
    let n = N`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`, t = N`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`, e = "open", i = n;
    return this.openStatus && (e = "close", i = t), N`
    <section>
      <button @click=${this.handleClick} >
        <span class="sr-only">
          ${e}
        </span>
          ${i} 
      </button>
      <div class="drawer-contents">      
        <h3>${this.sectionTitle}</h3>
        <slot></slot>
      </div>
    </section>`;
  }
  static get styles() {
    return [
      dt`
      /* Main containing element for drawer. */
      :host {
        display: flex;
        position: relative;
        background: white;
        /* Should be full height of screen.*/
        height: 100vh;
        /* Set some basic styling variables for parts of the drawer.*/
        --button-width: 2rem;
        /* Drawer width is relative to button width; allows for space proportionate to button width while also taking up most of the viewport width. */
        --drawer-width: calc(100vw - 4*var(--button-width));
        /* Basic padding for contents. */
        --drawer-padding: 0.5rem;
      }
      
      /* TODO: For active facet details el. allow an optional prop to set an 'active-child' selector string - so can have differing implementations per element! */

      /* Open/close button for drawer. */
      button {
        position: absolute;
        top: 0;
        /* Button positioned with reference to it's own width.*/
        right: calc(-1* var(--button-width));
        width: var(--button-width);
        height: var(--button-width);
        padding: 0;
        margin: 0;
        background: white;
        border: none;
      }
      
      /* Defines 'root' of drawer and the element that 'opens'.*/
      section {
        /* Margin-left initially set to negative drawer-width, so 'closed'. */
        margin-left: calc(-1 * var(--drawer-width));
        /* Use transition for animation on open/shut states. */
        transition: margin-left var(--animation-duration-fast);
      }
      /* When open, reset margin-left. */
      :host([openstatus]) section {
        margin-left: 0;
      }
      
      /* Holds main contents of drawer.*/
      .drawer-contents {
        padding: var(--drawer-padding);
        /* Width required to avoid reflow. */
        width: calc(var(--drawer-width) - 2*var(--drawer-padding));
      }
      `,
      gt
    ];
  }
};
J([
  z({ type: Boolean, reflect: !0 })
], L.prototype, "openStatus", 2);
J([
  z({ type: String })
], L.prototype, "sectionTitle", 2);
L = J([
  ft("mds-drawer")
], L);
var Dt = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, O = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? zt(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && Dt(t, e, s), s;
};
let S = class extends m {
  constructor() {
    super(...arguments), this.autoOpenSelector = "", this.isActive = !1;
  }
  handleWindowResize(n) {
    console.log(n);
    let t = n == null ? void 0 : n._details.querySelector("summary"), e = n == null ? void 0 : n._details.querySelector("div"), i = t == null ? void 0 : t.clientHeight, s = e == null ? void 0 : e.clientHeight;
    s = s && i ? s + i : 100, n.style.setProperty("--initHeight", String(i) + "px"), n.style.setProperty("--activeHeight", String(s) + "px");
  }
  connectedCallback() {
    super.connectedCallback();
    let n = !1;
    this.autoOpenSelector && this.querySelectorAll(this.autoOpenSelector).length > 0, this.isActive || (this.isActive = n);
    let t = this;
    window.addEventListener(
      "resize",
      function() {
        t.handleWindowResize(t);
      },
      !1
    );
  }
  firstUpdated() {
    let n = this;
    this.addEventListener("click", function(r) {
      requestAnimationFrame(function() {
        n.isActive = n._details.open, console.log(n._details.open);
      });
    });
    let t = this._details.querySelector("summary"), e = this._details.querySelector("div"), i = e == null ? void 0 : e.clientHeight;
    i = t == null ? void 0 : t.clientHeight;
    let s = e == null ? void 0 : e.clientHeight;
    s = s && i ? s + i : 100, this.style.setProperty("--initHeight", String(i) + "px"), this.style.setProperty("--activeHeight", String(s) + "px");
  }
  render() {
    let n = this.isActive ? "open" : "";
    return N`
    <details ?open=${n}>
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
      dt`
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
      gt
    ];
  }
};
O([
  z({ type: String })
], S.prototype, "autoOpenSelector", 2);
O([
  z({ type: Boolean, reflect: !0 })
], S.prototype, "isActive", 2);
O([
  kt("details")
], S.prototype, "_details", 2);
O([
  Nt({ selector: "*" })
], S.prototype, "_slottedElements", 2);
S = O([
  ft("mds-extra-details")
], S);
export {
  L as DrawerElement,
  S as ExtraDetails
};
