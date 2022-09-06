import { property as de, customElement as Ee, LitElement as Ie, html as he, css as je } from "lit-element";
import { unsafeCSS as Me } from "lit";
const Ae = `:root{font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}body{margin:0;min-height:100vh;background:purple}@media (prefers-color-scheme: light){:root{color:#213547}}#container{display:flex;flex-direction:row}.sr-only:not(:focus):not(:active),::part(icon-button-label){clip:rect(0 0 0 0);clip-path:inset(100%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}button{position:absolute;top:0;right:-3em;width:3em;height:3em;padding:0;margin:0;background:white;border:none}button:hover,button:active,button:focus{background:white}mds-drawer:defined{animation-name:slide-from-left,fade-in;animation-duration:.3s,.3s;animation-play-state:paused,running}mds-drawer[initialized]{border:10px lime solid}@keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes slide-from-left{0%{margin-left:calc(-33vw - 1rem)}to{margin-left:0}}mds-drawer:not(:defined){margin-left:-1000px}
`, Re = Me(Ae);
var _;
(function(r) {
  r.assertEqual = (n) => n;
  function e(n) {
  }
  r.assertIs = e;
  function t(n) {
    throw new Error();
  }
  r.assertNever = t, r.arrayToEnum = (n) => {
    const a = {};
    for (const i of n)
      a[i] = i;
    return a;
  }, r.getValidEnumValues = (n) => {
    const a = r.objectKeys(n).filter((o) => typeof n[n[o]] != "number"), i = {};
    for (const o of a)
      i[o] = n[o];
    return r.objectValues(i);
  }, r.objectValues = (n) => r.objectKeys(n).map(function(a) {
    return n[a];
  }), r.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const a = [];
    for (const i in n)
      Object.prototype.hasOwnProperty.call(n, i) && a.push(i);
    return a;
  }, r.find = (n, a) => {
    for (const i of n)
      if (a(i))
        return i;
  }, r.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function s(n, a = " | ") {
    return n.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  r.joinValues = s;
})(_ || (_ = {}));
const d = _.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), C = (r) => {
  switch (typeof r) {
    case "undefined":
      return d.undefined;
    case "string":
      return d.string;
    case "number":
      return isNaN(r) ? d.nan : d.number;
    case "boolean":
      return d.boolean;
    case "function":
      return d.function;
    case "bigint":
      return d.bigint;
    case "object":
      return Array.isArray(r) ? d.array : r === null ? d.null : r.then && typeof r.then == "function" && r.catch && typeof r.catch == "function" ? d.promise : typeof Map < "u" && r instanceof Map ? d.map : typeof Set < "u" && r instanceof Set ? d.set : typeof Date < "u" && r instanceof Date ? d.date : d.object;
    default:
      return d.unknown;
  }
}, c = _.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of"
]), Pe = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:");
class N extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const t = e || function(a) {
      return a.message;
    }, s = { _errors: [] }, n = (a) => {
      for (const i of a.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(n);
        else if (i.code === "invalid_return_type")
          n(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          n(i.argumentsError);
        else if (i.path.length === 0)
          s._errors.push(t(i));
        else {
          let o = s, l = 0;
          for (; l < i.path.length; ) {
            const u = i.path[l];
            l === i.path.length - 1 ? (o[u] = o[u] || { _errors: [] }, o[u]._errors.push(t(i))) : o[u] = o[u] || { _errors: [] }, o = o[u], l++;
          }
        }
    };
    return n(this), s;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, ge, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, s = [];
    for (const n of this.issues)
      n.path.length > 0 ? (t[n.path[0]] = t[n.path[0]] || [], t[n.path[0]].push(e(n))) : s.push(e(n));
    return { formErrors: s, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
N.create = (r) => new N(r);
const W = (r, e) => {
  let t;
  switch (r.code) {
    case c.invalid_type:
      r.received === d.undefined ? t = "Required" : t = `Expected ${r.expected}, received ${r.received}`;
      break;
    case c.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(r.expected, ge)}`;
      break;
    case c.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${_.joinValues(r.keys, ", ")}`;
      break;
    case c.invalid_union:
      t = "Invalid input";
      break;
    case c.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${_.joinValues(r.options)}`;
      break;
    case c.invalid_enum_value:
      t = `Invalid enum value. Expected ${_.joinValues(r.options)}, received '${r.received}'`;
      break;
    case c.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case c.invalid_return_type:
      t = "Invalid function return type";
      break;
    case c.invalid_date:
      t = "Invalid date";
      break;
    case c.invalid_string:
      typeof r.validation == "object" ? "startsWith" in r.validation ? t = `Invalid input: must start with "${r.validation.startsWith}"` : "endsWith" in r.validation ? t = `Invalid input: must end with "${r.validation.endsWith}"` : _.assertNever(r.validation) : r.validation !== "regex" ? t = `Invalid ${r.validation}` : t = "Invalid";
      break;
    case c.too_small:
      r.type === "array" ? t = `Array must contain ${r.inclusive ? "at least" : "more than"} ${r.minimum} element(s)` : r.type === "string" ? t = `String must contain ${r.inclusive ? "at least" : "over"} ${r.minimum} character(s)` : r.type === "number" ? t = `Number must be greater than ${r.inclusive ? "or equal to " : ""}${r.minimum}` : r.type === "date" ? t = `Date must be greater than ${r.inclusive ? "or equal to " : ""}${new Date(r.minimum)}` : t = "Invalid input";
      break;
    case c.too_big:
      r.type === "array" ? t = `Array must contain ${r.inclusive ? "at most" : "less than"} ${r.maximum} element(s)` : r.type === "string" ? t = `String must contain ${r.inclusive ? "at most" : "under"} ${r.maximum} character(s)` : r.type === "number" ? t = `Number must be less than ${r.inclusive ? "or equal to " : ""}${r.maximum}` : r.type === "date" ? t = `Date must be smaller than ${r.inclusive ? "or equal to " : ""}${new Date(r.maximum)}` : t = "Invalid input";
      break;
    case c.custom:
      t = "Invalid input";
      break;
    case c.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case c.not_multiple_of:
      t = `Number must be a multiple of ${r.multipleOf}`;
      break;
    default:
      t = e.defaultError, _.assertNever(r);
  }
  return { message: t };
};
let ke = W;
function Ve(r) {
  ke = r;
}
function K() {
  return ke;
}
const G = (r) => {
  const { data: e, path: t, errorMaps: s, issueData: n } = r, a = [...t, ...n.path || []], i = {
    ...n,
    path: a
  };
  let o = "";
  const l = s.filter((u) => !!u).slice().reverse();
  for (const u of l)
    o = u(i, { data: e, defaultError: o }).message;
  return {
    ...n,
    path: a,
    message: n.message || o
  };
}, ze = [];
function p(r, e) {
  const t = G({
    issueData: e,
    data: r.data,
    path: r.path,
    errorMaps: [
      r.common.contextualErrorMap,
      r.schemaErrorMap,
      K(),
      W
    ].filter((s) => !!s)
  });
  r.common.issues.push(t);
}
class x {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const s = [];
    for (const n of t) {
      if (n.status === "aborted")
        return f;
      n.status === "dirty" && e.dirty(), s.push(n.value);
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, t) {
    const s = [];
    for (const n of t)
      s.push({
        key: await n.key,
        value: await n.value
      });
    return x.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, t) {
    const s = {};
    for (const n of t) {
      const { key: a, value: i } = n;
      if (a.status === "aborted" || i.status === "aborted")
        return f;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), (typeof i.value < "u" || n.alwaysSet) && (s[a.value] = i.value);
    }
    return { status: e.value, value: s };
  }
}
const f = Object.freeze({
  status: "aborted"
}), De = (r) => ({ status: "dirty", value: r }), w = (r) => ({ status: "valid", value: r }), fe = (r) => r.status === "aborted", me = (r) => r.status === "dirty", Q = (r) => r.status === "valid", ye = (r) => typeof Promise !== void 0 && r instanceof Promise, ge = (r, e) => typeof e == "bigint" ? e.toString() : e;
var g;
(function(r) {
  r.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, r.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(g || (g = {}));
class T {
  constructor(e, t, s, n) {
    this.parent = e, this.data = t, this._path = s, this._key = n;
  }
  get path() {
    return this._path.concat(this._key);
  }
}
const be = (r, e) => {
  if (Q(e))
    return { success: !0, data: e.value };
  {
    if (!r.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    const t = new N(r.common.issues);
    return { success: !1, error: t };
  }
};
function v(r) {
  if (!r)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: s, description: n } = r;
  if (e && (t || s))
    throw new Error(`Can't use "invalid" or "required" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (i, o) => i.code !== "invalid_type" ? { message: o.defaultError } : typeof o.data > "u" ? { message: s != null ? s : o.defaultError } : { message: t != null ? t : o.defaultError }, description: n };
}
class y {
  constructor(e) {
    this.spa = this.safeParseAsync, this.superRefine = this._refinement, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.default = this.default.bind(this), this.describe = this.describe.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return C(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: C(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new x(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: C(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (ye(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const s = this.safeParse(e, t);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(e, t) {
    var s;
    const n = {
      common: {
        issues: [],
        async: (s = t == null ? void 0 : t.async) !== null && s !== void 0 ? s : !1,
        contextualErrorMap: t == null ? void 0 : t.errorMap
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: C(e)
    }, a = this._parseSync({ data: e, path: n.path, parent: n });
    return be(n, a);
  }
  async parseAsync(e, t) {
    const s = await this.safeParseAsync(e, t);
    if (s.success)
      return s.data;
    throw s.error;
  }
  async safeParseAsync(e, t) {
    const s = {
      common: {
        issues: [],
        contextualErrorMap: t == null ? void 0 : t.errorMap,
        async: !0
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: C(e)
    }, n = this._parse({ data: e, path: [], parent: s }), a = await (ye(n) ? n : Promise.resolve(n));
    return be(s, a);
  }
  refine(e, t) {
    const s = (n) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(n) : t;
    return this._refinement((n, a) => {
      const i = e(n), o = () => a.addIssue({
        code: c.custom,
        ...s(n)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((l) => l ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((s, n) => e(s) ? !0 : (n.addIssue(typeof t == "function" ? t(s, n) : t), !1));
  }
  _refinement(e) {
    return new O({
      schema: this,
      typeName: h.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  optional() {
    return k.create(this);
  }
  nullable() {
    return P.create(this);
  }
  nullish() {
    return this.optional().nullable();
  }
  array() {
    return Z.create(this);
  }
  promise() {
    return $.create(this);
  }
  or(e) {
    return q.create([this, e]);
  }
  and(e) {
    return H.create(this, e);
  }
  transform(e) {
    return new O({
      schema: this,
      typeName: h.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new _e({
      innerType: this,
      defaultValue: t,
      typeName: h.ZodDefault
    });
  }
  brand() {
    return new Ze({
      typeName: h.ZodBranded,
      type: this,
      ...v(void 0)
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Le = /^c[^\s-]{8,}$/i, $e = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, Ue = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
class I extends y {
  constructor() {
    super(...arguments), this._regex = (e, t, s) => this.refinement((n) => e.test(n), {
      validation: t,
      code: c.invalid_string,
      ...g.errToObj(s)
    }), this.nonempty = (e) => this.min(1, g.errToObj(e)), this.trim = () => new I({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  _parse(e) {
    if (this._getType(e) !== d.string) {
      const a = this._getOrReturnCtx(e);
      return p(
        a,
        {
          code: c.invalid_type,
          expected: d.string,
          received: a.parsedType
        }
      ), f;
    }
    const s = new x();
    let n;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (n = this._getOrReturnCtx(e, n), p(n, {
          code: c.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          message: a.message
        }), s.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (n = this._getOrReturnCtx(e, n), p(n, {
          code: c.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          message: a.message
        }), s.dirty());
      else if (a.kind === "email")
        Ue.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "email",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "uuid")
        $e.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "uuid",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid")
        Le.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "cuid",
          code: c.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n), p(n, {
            validation: "url",
            code: c.invalid_string,
            message: a.message
          }), s.dirty();
        }
      else
        a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), p(n, {
          validation: "regex",
          code: c.invalid_string,
          message: a.message
        }), s.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (n = this._getOrReturnCtx(e, n), p(n, {
          code: c.invalid_string,
          validation: { startsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (n = this._getOrReturnCtx(e, n), p(n, {
          code: c.invalid_string,
          validation: { endsWith: a.value },
          message: a.message
        }), s.dirty()) : _.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _addCheck(e) {
    return new I({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...g.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...g.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...g.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...g.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...g.errToObj(t)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...g.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...g.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...g.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...g.errToObj(t)
    });
  }
  length(e, t) {
    return this.min(e, t).max(e, t);
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
I.create = (r) => new I({
  checks: [],
  typeName: h.ZodString,
  ...v(r)
});
function Be(r, e) {
  const t = (r.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, n = t > s ? t : s, a = parseInt(r.toFixed(n).replace(".", "")), i = parseInt(e.toFixed(n).replace(".", ""));
  return a % i / Math.pow(10, n);
}
class M extends y {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._getType(e) !== d.number) {
      const a = this._getOrReturnCtx(e);
      return p(a, {
        code: c.invalid_type,
        expected: d.number,
        received: a.parsedType
      }), f;
    }
    let s;
    const n = new x();
    for (const a of this._def.checks)
      a.kind === "int" ? _.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), p(s, {
        code: c.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), n.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), p(s, {
        code: c.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        message: a.message
      }), n.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), p(s, {
        code: c.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        message: a.message
      }), n.dirty()) : a.kind === "multipleOf" ? Be(e.data, a.value) !== 0 && (s = this._getOrReturnCtx(e, s), p(s, {
        code: c.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), n.dirty()) : _.assertNever(a);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, g.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, g.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, g.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, g.toString(t));
  }
  setLimit(e, t, s, n) {
    return new M({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: s,
          message: g.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new M({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: g.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: g.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: g.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: g.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: g.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: g.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int");
  }
}
M.create = (r) => new M({
  checks: [],
  typeName: h.ZodNumber,
  ...v(r)
});
class X extends y {
  _parse(e) {
    if (this._getType(e) !== d.bigint) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: d.bigint,
        received: s.parsedType
      }), f;
    }
    return w(e.data);
  }
}
X.create = (r) => new X({
  typeName: h.ZodBigInt,
  ...v(r)
});
class F extends y {
  _parse(e) {
    if (this._getType(e) !== d.boolean) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: d.boolean,
        received: s.parsedType
      }), f;
    }
    return w(e.data);
  }
}
F.create = (r) => new F({
  typeName: h.ZodBoolean,
  ...v(r)
});
class D extends y {
  _parse(e) {
    if (this._getType(e) !== d.date) {
      const a = this._getOrReturnCtx(e);
      return p(a, {
        code: c.invalid_type,
        expected: d.date,
        received: a.parsedType
      }), f;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return p(a, {
        code: c.invalid_date
      }), f;
    }
    const s = new x();
    let n;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.too_small,
        message: a.message,
        inclusive: !0,
        minimum: a.value,
        type: "date"
      }), s.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (n = this._getOrReturnCtx(e, n), p(n, {
        code: c.too_big,
        message: a.message,
        inclusive: !0,
        maximum: a.value,
        type: "date"
      }), s.dirty()) : _.assertNever(a);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new D({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: g.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: g.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
D.create = (r) => new D({
  checks: [],
  typeName: h.ZodDate,
  ...v(r)
});
class ee extends y {
  _parse(e) {
    if (this._getType(e) !== d.undefined) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: d.undefined,
        received: s.parsedType
      }), f;
    }
    return w(e.data);
  }
}
ee.create = (r) => new ee({
  typeName: h.ZodUndefined,
  ...v(r)
});
class te extends y {
  _parse(e) {
    if (this._getType(e) !== d.null) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: d.null,
        received: s.parsedType
      }), f;
    }
    return w(e.data);
  }
}
te.create = (r) => new te({
  typeName: h.ZodNull,
  ...v(r)
});
class L extends y {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return w(e.data);
  }
}
L.create = (r) => new L({
  typeName: h.ZodAny,
  ...v(r)
});
class E extends y {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return w(e.data);
  }
}
E.create = (r) => new E({
  typeName: h.ZodUnknown,
  ...v(r)
});
class j extends y {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return p(t, {
      code: c.invalid_type,
      expected: d.never,
      received: t.parsedType
    }), f;
  }
}
j.create = (r) => new j({
  typeName: h.ZodNever,
  ...v(r)
});
class re extends y {
  _parse(e) {
    if (this._getType(e) !== d.undefined) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: d.void,
        received: s.parsedType
      }), f;
    }
    return w(e.data);
  }
}
re.create = (r) => new re({
  typeName: h.ZodVoid,
  ...v(r)
});
class Z extends y {
  _parse(e) {
    const { ctx: t, status: s } = this._processInputParams(e), n = this._def;
    if (t.parsedType !== d.array)
      return p(t, {
        code: c.invalid_type,
        expected: d.array,
        received: t.parsedType
      }), f;
    if (n.minLength !== null && t.data.length < n.minLength.value && (p(t, {
      code: c.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      message: n.minLength.message
    }), s.dirty()), n.maxLength !== null && t.data.length > n.maxLength.value && (p(t, {
      code: c.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      message: n.maxLength.message
    }), s.dirty()), t.common.async)
      return Promise.all(t.data.map((i, o) => n.type._parseAsync(new T(t, i, t.path, o)))).then((i) => x.mergeArray(s, i));
    const a = t.data.map((i, o) => n.type._parseSync(new T(t, i, t.path, o)));
    return x.mergeArray(s, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new Z({
      ...this._def,
      minLength: { value: e, message: g.toString(t) }
    });
  }
  max(e, t) {
    return new Z({
      ...this._def,
      maxLength: { value: e, message: g.toString(t) }
    });
  }
  length(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Z.create = (r, e) => new Z({
  type: r,
  minLength: null,
  maxLength: null,
  typeName: h.ZodArray,
  ...v(e)
});
var se;
(function(r) {
  r.mergeShapes = (e, t) => ({
    ...e,
    ...t
  });
})(se || (se = {}));
const xe = (r) => (e) => new b({
  ...r,
  shape: () => ({
    ...r.shape(),
    ...e
  })
});
function z(r) {
  if (r instanceof b) {
    const e = {};
    for (const t in r.shape) {
      const s = r.shape[t];
      e[t] = k.create(z(s));
    }
    return new b({
      ...r._def,
      shape: () => e
    });
  } else
    return r instanceof Z ? Z.create(z(r.element)) : r instanceof k ? k.create(z(r.unwrap())) : r instanceof P ? P.create(z(r.unwrap())) : r instanceof S ? S.create(r.items.map((e) => z(e))) : r;
}
class b extends y {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = xe(this._def), this.extend = xe(this._def);
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = _.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== d.object) {
      const u = this._getOrReturnCtx(e);
      return p(u, {
        code: c.invalid_type,
        expected: d.object,
        received: u.parsedType
      }), f;
    }
    const { status: s, ctx: n } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    for (const u in n.data)
      i.includes(u) || o.push(u);
    const l = [];
    for (const u of i) {
      const m = a[u], V = n.data[u];
      l.push({
        key: { status: "valid", value: u },
        value: m._parse(new T(n, V, n.path, u)),
        alwaysSet: u in n.data
      });
    }
    if (this._def.catchall instanceof j) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const m of o)
          l.push({
            key: { status: "valid", value: m },
            value: { status: "valid", value: n.data[m] }
          });
      else if (u === "strict")
        o.length > 0 && (p(n, {
          code: c.unrecognized_keys,
          keys: o
        }), s.dirty());
      else if (u !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const m of o) {
        const V = n.data[m];
        l.push({
          key: { status: "valid", value: m },
          value: u._parse(
            new T(n, V, n.path, m)
          ),
          alwaysSet: m in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const m of l) {
        const V = await m.key;
        u.push({
          key: V,
          value: await m.value,
          alwaysSet: m.alwaysSet
        });
      }
      return u;
    }).then((u) => x.mergeObjectSync(s, u)) : x.mergeObjectSync(s, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return g.errToObj, new b({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, s) => {
          var n, a, i, o;
          const l = (i = (a = (n = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(n, t, s).message) !== null && i !== void 0 ? i : s.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (o = g.errToObj(e).message) !== null && o !== void 0 ? o : l
          } : {
            message: l
          };
        }
      } : {}
    });
  }
  strip() {
    return new b({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new b({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  merge(e) {
    return new b({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => se.mergeShapes(this._def.shape(), e._def.shape()),
      typeName: h.ZodObject
    });
  }
  catchall(e) {
    return new b({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return _.objectKeys(e).map((s) => {
      this.shape[s] && (t[s] = this.shape[s]);
    }), new b({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return _.objectKeys(this.shape).map((s) => {
      _.objectKeys(e).indexOf(s) === -1 && (t[s] = this.shape[s]);
    }), new b({
      ...this._def,
      shape: () => t
    });
  }
  deepPartial() {
    return z(this);
  }
  partial(e) {
    const t = {};
    if (e)
      return _.objectKeys(this.shape).map((s) => {
        _.objectKeys(e).indexOf(s) === -1 ? t[s] = this.shape[s] : t[s] = this.shape[s].optional();
      }), new b({
        ...this._def,
        shape: () => t
      });
    for (const s in this.shape) {
      const n = this.shape[s];
      t[s] = n.optional();
    }
    return new b({
      ...this._def,
      shape: () => t
    });
  }
  required() {
    const e = {};
    for (const t in this.shape) {
      let n = this.shape[t];
      for (; n instanceof k; )
        n = n._def.innerType;
      e[t] = n;
    }
    return new b({
      ...this._def,
      shape: () => e
    });
  }
  keyof() {
    return Te(_.objectKeys(this.shape));
  }
}
b.create = (r, e) => new b({
  shape: () => r,
  unknownKeys: "strip",
  catchall: j.create(),
  typeName: h.ZodObject,
  ...v(e)
});
b.strictCreate = (r, e) => new b({
  shape: () => r,
  unknownKeys: "strict",
  catchall: j.create(),
  typeName: h.ZodObject,
  ...v(e)
});
b.lazycreate = (r, e) => new b({
  shape: r,
  unknownKeys: "strip",
  catchall: j.create(),
  typeName: h.ZodObject,
  ...v(e)
});
class q extends y {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = this._def.options;
    function n(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new N(o.ctx.common.issues));
      return p(t, {
        code: c.invalid_union,
        unionErrors: i
      }), f;
    }
    if (t.common.async)
      return Promise.all(s.map(async (a) => {
        const i = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: t.data,
            path: t.path,
            parent: i
          }),
          ctx: i
        };
      })).then(n);
    {
      let a;
      const i = [];
      for (const l of s) {
        const u = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, m = l._parseSync({
          data: t.data,
          path: t.path,
          parent: u
        });
        if (m.status === "valid")
          return m;
        m.status === "dirty" && !a && (a = { result: m, ctx: u }), u.common.issues.length && i.push(u.common.issues);
      }
      if (a)
        return t.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((l) => new N(l));
      return p(t, {
        code: c.invalid_union,
        unionErrors: o
      }), f;
    }
  }
  get options() {
    return this._def.options;
  }
}
q.create = (r, e) => new q({
  options: r,
  typeName: h.ZodUnion,
  ...v(e)
});
class ue extends y {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== d.object)
      return p(t, {
        code: c.invalid_type,
        expected: d.object,
        received: t.parsedType
      }), f;
    const s = this.discriminator, n = t.data[s], a = this.options.get(n);
    return a ? t.common.async ? a._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : a._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (p(t, {
      code: c.invalid_union_discriminator,
      options: this.validDiscriminatorValues,
      path: [s]
    }), f);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get validDiscriminatorValues() {
    return Array.from(this.options.keys());
  }
  get options() {
    return this._def.options;
  }
  static create(e, t, s) {
    const n = /* @__PURE__ */ new Map();
    try {
      t.forEach((a) => {
        const i = a.shape[e].value;
        n.set(i, a);
      });
    } catch {
      throw new Error("The discriminator value could not be extracted from all the provided schemas");
    }
    if (n.size !== t.length)
      throw new Error("Some of the discriminator values are not unique");
    return new ue({
      typeName: h.ZodDiscriminatedUnion,
      discriminator: e,
      options: n,
      ...v(s)
    });
  }
}
function ve(r, e) {
  const t = C(r), s = C(e);
  if (r === e)
    return { valid: !0, data: r };
  if (t === d.object && s === d.object) {
    const n = _.objectKeys(e), a = _.objectKeys(r).filter((o) => n.indexOf(o) !== -1), i = { ...r, ...e };
    for (const o of a) {
      const l = ve(r[o], e[o]);
      if (!l.valid)
        return { valid: !1 };
      i[o] = l.data;
    }
    return { valid: !0, data: i };
  } else if (t === d.array && s === d.array) {
    if (r.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let a = 0; a < r.length; a++) {
      const i = r[a], o = e[a], l = ve(i, o);
      if (!l.valid)
        return { valid: !1 };
      n.push(l.data);
    }
    return { valid: !0, data: n };
  } else
    return t === d.date && s === d.date && +r == +e ? { valid: !0, data: r } : { valid: !1 };
}
class H extends y {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), n = (a, i) => {
      if (fe(a) || fe(i))
        return f;
      const o = ve(a.value, i.value);
      return o.valid ? ((me(a) || me(i)) && t.dirty(), { status: t.value, value: o.data }) : (p(s, {
        code: c.invalid_intersection_types
      }), f);
    };
    return s.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      }),
      this._def.right._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      })
    ]).then(([a, i]) => n(a, i)) : n(this._def.left._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }), this._def.right._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }));
  }
}
H.create = (r, e, t) => new H({
  left: r,
  right: e,
  typeName: h.ZodIntersection,
  ...v(t)
});
class S extends y {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== d.array)
      return p(s, {
        code: c.invalid_type,
        expected: d.array,
        received: s.parsedType
      }), f;
    if (s.data.length < this._def.items.length)
      return p(s, {
        code: c.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        type: "array"
      }), f;
    !this._def.rest && s.data.length > this._def.items.length && (p(s, {
      code: c.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      type: "array"
    }), t.dirty());
    const a = s.data.map((i, o) => {
      const l = this._def.items[o] || this._def.rest;
      return l ? l._parse(new T(s, i, s.path, o)) : null;
    }).filter((i) => !!i);
    return s.common.async ? Promise.all(a).then((i) => x.mergeArray(t, i)) : x.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new S({
      ...this._def,
      rest: e
    });
  }
}
S.create = (r, e) => new S({
  items: r,
  typeName: h.ZodTuple,
  rest: null,
  ...v(e)
});
class J extends y {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== d.object)
      return p(s, {
        code: c.invalid_type,
        expected: d.object,
        received: s.parsedType
      }), f;
    const n = [], a = this._def.keyType, i = this._def.valueType;
    for (const o in s.data)
      n.push({
        key: a._parse(new T(s, o, s.path, o)),
        value: i._parse(new T(s, s.data[o], s.path, o))
      });
    return s.common.async ? x.mergeObjectAsync(t, n) : x.mergeObjectSync(t, n);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, s) {
    return t instanceof y ? new J({
      keyType: e,
      valueType: t,
      typeName: h.ZodRecord,
      ...v(s)
    }) : new J({
      keyType: I.create(),
      valueType: e,
      typeName: h.ZodRecord,
      ...v(t)
    });
  }
}
class ne extends y {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== d.map)
      return p(s, {
        code: c.invalid_type,
        expected: d.map,
        received: s.parsedType
      }), f;
    const n = this._def.keyType, a = this._def.valueType, i = [...s.data.entries()].map(([o, l], u) => ({
      key: n._parse(new T(s, o, s.path, [u, "key"])),
      value: a._parse(new T(s, l, s.path, [u, "value"]))
    }));
    if (s.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of i) {
          const u = await l.key, m = await l.value;
          if (u.status === "aborted" || m.status === "aborted")
            return f;
          (u.status === "dirty" || m.status === "dirty") && t.dirty(), o.set(u.value, m.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const l of i) {
        const u = l.key, m = l.value;
        if (u.status === "aborted" || m.status === "aborted")
          return f;
        (u.status === "dirty" || m.status === "dirty") && t.dirty(), o.set(u.value, m.value);
      }
      return { status: t.value, value: o };
    }
  }
}
ne.create = (r, e, t) => new ne({
  valueType: e,
  keyType: r,
  typeName: h.ZodMap,
  ...v(t)
});
class A extends y {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== d.set)
      return p(s, {
        code: c.invalid_type,
        expected: d.set,
        received: s.parsedType
      }), f;
    const n = this._def;
    n.minSize !== null && s.data.size < n.minSize.value && (p(s, {
      code: c.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      message: n.minSize.message
    }), t.dirty()), n.maxSize !== null && s.data.size > n.maxSize.value && (p(s, {
      code: c.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      message: n.maxSize.message
    }), t.dirty());
    const a = this._def.valueType;
    function i(l) {
      const u = /* @__PURE__ */ new Set();
      for (const m of l) {
        if (m.status === "aborted")
          return f;
        m.status === "dirty" && t.dirty(), u.add(m.value);
      }
      return { status: t.value, value: u };
    }
    const o = [...s.data.values()].map((l, u) => a._parse(new T(s, l, s.path, u)));
    return s.common.async ? Promise.all(o).then((l) => i(l)) : i(o);
  }
  min(e, t) {
    return new A({
      ...this._def,
      minSize: { value: e, message: g.toString(t) }
    });
  }
  max(e, t) {
    return new A({
      ...this._def,
      maxSize: { value: e, message: g.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
A.create = (r, e) => new A({
  valueType: r,
  minSize: null,
  maxSize: null,
  typeName: h.ZodSet,
  ...v(e)
});
class R extends y {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== d.function)
      return p(t, {
        code: c.invalid_type,
        expected: d.function,
        received: t.parsedType
      }), f;
    function s(o, l) {
      return G({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          K(),
          W
        ].filter((u) => !!u),
        issueData: {
          code: c.invalid_arguments,
          argumentsError: l
        }
      });
    }
    function n(o, l) {
      return G({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          K(),
          W
        ].filter((u) => !!u),
        issueData: {
          code: c.invalid_return_type,
          returnTypeError: l
        }
      });
    }
    const a = { errorMap: t.common.contextualErrorMap }, i = t.data;
    return this._def.returns instanceof $ ? w(async (...o) => {
      const l = new N([]), u = await this._def.args.parseAsync(o, a).catch((pe) => {
        throw l.addIssue(s(o, pe)), l;
      }), m = await i(...u);
      return await this._def.returns._def.type.parseAsync(m, a).catch((pe) => {
        throw l.addIssue(n(m, pe)), l;
      });
    }) : w((...o) => {
      const l = this._def.args.safeParse(o, a);
      if (!l.success)
        throw new N([s(o, l.error)]);
      const u = i(...l.data), m = this._def.returns.safeParse(u, a);
      if (!m.success)
        throw new N([n(u, m.error)]);
      return m.data;
    });
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new R({
      ...this._def,
      args: S.create(e).rest(E.create())
    });
  }
  returns(e) {
    return new R({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
}
R.create = (r, e, t) => new R({
  args: r ? r.rest(E.create()) : S.create([]).rest(E.create()),
  returns: e || E.create(),
  typeName: h.ZodFunction,
  ...v(t)
});
class ae extends y {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
ae.create = (r, e) => new ae({
  getter: r,
  typeName: h.ZodLazy,
  ...v(e)
});
class ie extends y {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return p(t, {
        code: c.invalid_literal,
        expected: this._def.value
      }), f;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
ie.create = (r, e) => new ie({
  value: r,
  typeName: h.ZodLiteral,
  ...v(e)
});
function Te(r, e) {
  return new le({
    values: r,
    typeName: h.ZodEnum,
    ...v(e)
  });
}
class le extends y {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return p(t, {
        expected: _.joinValues(s),
        received: t.parsedType,
        code: c.invalid_type
      }), f;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return p(t, {
        received: t.data,
        code: c.invalid_enum_value,
        options: s
      }), f;
    }
    return w(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
}
le.create = Te;
class oe extends y {
  _parse(e) {
    const t = _.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== d.string && s.parsedType !== d.number) {
      const n = _.objectValues(t);
      return p(s, {
        expected: _.joinValues(n),
        received: s.parsedType,
        code: c.invalid_type
      }), f;
    }
    if (t.indexOf(e.data) === -1) {
      const n = _.objectValues(t);
      return p(s, {
        received: s.data,
        code: c.invalid_enum_value,
        options: n
      }), f;
    }
    return w(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
oe.create = (r, e) => new oe({
  values: r,
  typeName: h.ZodNativeEnum,
  ...v(e)
});
class $ extends y {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== d.promise && t.common.async === !1)
      return p(t, {
        code: c.invalid_type,
        expected: d.promise,
        received: t.parsedType
      }), f;
    const s = t.parsedType === d.promise ? t.data : Promise.resolve(t.data);
    return w(s.then((n) => this._def.type.parseAsync(n, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
$.create = (r, e) => new $({
  type: r,
  typeName: h.ZodPromise,
  ...v(e)
});
class O extends y {
  innerType() {
    return this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), n = this._def.effect || null;
    if (n.type === "preprocess") {
      const i = n.transform(s.data);
      return s.common.async ? Promise.resolve(i).then((o) => this._def.schema._parseAsync({
        data: o,
        path: s.path,
        parent: s
      })) : this._def.schema._parseSync({
        data: i,
        path: s.path,
        parent: s
      });
    }
    const a = {
      addIssue: (i) => {
        p(s, i), i.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), n.type === "refinement") {
      const i = (o) => {
        const l = n.refinement(o, a);
        if (s.common.async)
          return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? f : (o.status === "dirty" && t.dirty(), i(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => o.status === "aborted" ? f : (o.status === "dirty" && t.dirty(), i(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (n.type === "transform")
      if (s.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!Q(i))
          return i;
        const o = n.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((i) => Q(i) ? Promise.resolve(n.transform(i.value, a)).then((o) => ({ status: t.value, value: o })) : i);
    _.assertNever(n);
  }
}
O.create = (r, e, t) => new O({
  schema: r,
  typeName: h.ZodEffects,
  effect: e,
  ...v(t)
});
O.createWithPreprocess = (r, e, t) => new O({
  schema: e,
  effect: { type: "preprocess", transform: r },
  typeName: h.ZodEffects,
  ...v(t)
});
class k extends y {
  _parse(e) {
    return this._getType(e) === d.undefined ? w(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
k.create = (r, e) => new k({
  innerType: r,
  typeName: h.ZodOptional,
  ...v(e)
});
class P extends y {
  _parse(e) {
    return this._getType(e) === d.null ? w(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
P.create = (r, e) => new P({
  innerType: r,
  typeName: h.ZodNullable,
  ...v(e)
});
class _e extends y {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let s = t.data;
    return t.parsedType === d.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
_e.create = (r, e) => new k({
  innerType: r,
  typeName: h.ZodOptional,
  ...v(e)
});
class ce extends y {
  _parse(e) {
    if (this._getType(e) !== d.nan) {
      const s = this._getOrReturnCtx(e);
      return p(s, {
        code: c.invalid_type,
        expected: d.nan,
        received: s.parsedType
      }), f;
    }
    return { status: "valid", value: e.data };
  }
}
ce.create = (r) => new ce({
  typeName: h.ZodNaN,
  ...v(r)
});
const We = Symbol("zod_brand");
class Ze extends y {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = t.data;
    return this._def.type._parse({
      data: s,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
const Se = (r, e = {}, t) => r ? L.create().superRefine((s, n) => {
  if (!r(s)) {
    const a = typeof e == "function" ? e(s) : e, i = typeof a == "string" ? { message: a } : a;
    n.addIssue({ code: "custom", ...i, fatal: t });
  }
}) : L.create(), qe = {
  object: b.lazycreate
};
var h;
(function(r) {
  r.ZodString = "ZodString", r.ZodNumber = "ZodNumber", r.ZodNaN = "ZodNaN", r.ZodBigInt = "ZodBigInt", r.ZodBoolean = "ZodBoolean", r.ZodDate = "ZodDate", r.ZodUndefined = "ZodUndefined", r.ZodNull = "ZodNull", r.ZodAny = "ZodAny", r.ZodUnknown = "ZodUnknown", r.ZodNever = "ZodNever", r.ZodVoid = "ZodVoid", r.ZodArray = "ZodArray", r.ZodObject = "ZodObject", r.ZodUnion = "ZodUnion", r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", r.ZodIntersection = "ZodIntersection", r.ZodTuple = "ZodTuple", r.ZodRecord = "ZodRecord", r.ZodMap = "ZodMap", r.ZodSet = "ZodSet", r.ZodFunction = "ZodFunction", r.ZodLazy = "ZodLazy", r.ZodLiteral = "ZodLiteral", r.ZodEnum = "ZodEnum", r.ZodEffects = "ZodEffects", r.ZodNativeEnum = "ZodNativeEnum", r.ZodOptional = "ZodOptional", r.ZodNullable = "ZodNullable", r.ZodDefault = "ZodDefault", r.ZodPromise = "ZodPromise", r.ZodBranded = "ZodBranded";
})(h || (h = {}));
const He = (r, e = {
  message: `Input not instance of ${r.name}`
}) => Se((t) => t instanceof r, e, !0), Oe = I.create, Ne = M.create, Je = ce.create, Ye = X.create, Ce = F.create, Ke = D.create, Ge = ee.create, Qe = te.create, Xe = L.create, Fe = E.create, et = j.create, tt = re.create, rt = Z.create, st = b.create, nt = b.strictCreate, at = q.create, it = ue.create, ot = H.create, ct = S.create, dt = J.create, ut = ne.create, lt = A.create, pt = R.create, ht = ae.create, ft = ie.create, mt = le.create, yt = oe.create, vt = $.create, we = O.create, gt = k.create, _t = P.create, bt = O.createWithPreprocess, xt = () => Oe().optional(), wt = () => Ne().optional(), kt = () => Ce().optional();
var B = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getParsedType: C,
  ZodParsedType: d,
  makeIssue: G,
  EMPTY_PATH: ze,
  addIssueToContext: p,
  ParseStatus: x,
  INVALID: f,
  DIRTY: De,
  OK: w,
  isAborted: fe,
  isDirty: me,
  isValid: Q,
  isAsync: ye,
  jsonStringifyReplacer: ge,
  ZodType: y,
  ZodString: I,
  ZodNumber: M,
  ZodBigInt: X,
  ZodBoolean: F,
  ZodDate: D,
  ZodUndefined: ee,
  ZodNull: te,
  ZodAny: L,
  ZodUnknown: E,
  ZodNever: j,
  ZodVoid: re,
  ZodArray: Z,
  get objectUtil() {
    return se;
  },
  ZodObject: b,
  ZodUnion: q,
  ZodDiscriminatedUnion: ue,
  ZodIntersection: H,
  ZodTuple: S,
  ZodRecord: J,
  ZodMap: ne,
  ZodSet: A,
  ZodFunction: R,
  ZodLazy: ae,
  ZodLiteral: ie,
  ZodEnum: le,
  ZodNativeEnum: oe,
  ZodPromise: $,
  ZodEffects: O,
  ZodTransformer: O,
  ZodOptional: k,
  ZodNullable: P,
  ZodDefault: _e,
  ZodNaN: ce,
  BRAND: We,
  ZodBranded: Ze,
  custom: Se,
  Schema: y,
  ZodSchema: y,
  late: qe,
  get ZodFirstPartyTypeKind() {
    return h;
  },
  any: Xe,
  array: rt,
  bigint: Ye,
  boolean: Ce,
  date: Ke,
  discriminatedUnion: it,
  effect: we,
  enum: mt,
  function: pt,
  instanceof: He,
  intersection: ot,
  lazy: ht,
  literal: ft,
  map: ut,
  nan: Je,
  nativeEnum: yt,
  never: et,
  null: Qe,
  nullable: _t,
  number: Ne,
  object: st,
  oboolean: kt,
  onumber: wt,
  optional: gt,
  ostring: xt,
  preprocess: bt,
  promise: vt,
  record: dt,
  set: lt,
  strictObject: nt,
  string: Oe,
  transformer: we,
  tuple: ct,
  undefined: Ge,
  union: at,
  unknown: Fe,
  void: tt,
  ZodIssueCode: c,
  quotelessJson: Pe,
  ZodError: N,
  defaultErrorMap: W,
  setErrorMap: Ve,
  getErrorMap: K
}), Tt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, Y = (r, e, t, s) => {
  for (var n = s > 1 ? void 0 : s ? Zt(e, t) : e, a = r.length - 1, i; a >= 0; a--)
    (i = r[a]) && (n = (s ? i(e, t, n) : i(n)) || n);
  return s && n && Tt(e, t, n), n;
};
const St = B.object({
  openStatus: B.boolean().default(!1),
  side: B.enum(["right", "left"]),
  sectionTitle: B.string().optional(),
  initialized: B.boolean().default(!1)
});
let U = class extends Ie {
  constructor() {
    super(...arguments), this.side = "left", this.openStatus = !1, this.initialized = !1;
  }
  validateProps() {
    let r = St.safeParse({
      open: this.openStatus,
      side: this.side,
      sectionTitle: this.sectionTitle,
      initialized: this.initialized
    });
    r.success ? console.log("current props:", r.data) : console.warn("props not set correctly!", r.error);
  }
  handleClick() {
    this.initialized = !1, this.openStatus = !this.openStatus;
  }
  render() {
    this.validateProps();
    let r = this.openStatus ? "close" : "open", e = he`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`, t = he`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`, s = this.openStatus ? t : e;
    return he`<section>
      <button @click=${this.handleClick} >
        <!-- TODO: make sure a sr-only utility works here from parent stylesheet! Resume here, this is critical and difficult! Maybe no ShadowDOM??? Maybe ::part() ?  Maybe CSS Modules via Vite import or maybe vanilla extract? TODO: resume here! Mobile thing done and good to go! -->
        <span part="icon-button-label" class="sr-only">
          ${r}
        </span>
          ${s} 
      </button>
      
      <h3>${this.sectionTitle}</h3>
      ${this.openStatus}
      ${this.side}

      <slot></slot>
    </section>`;
  }
  connectedCallback() {
    super.connectedCallback(), this.initialized = !0;
  }
  static get styles() {
    return [
      je`
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
    `,
      Re
    ];
  }
};
Y([
  de({ type: String })
], U.prototype, "side", 2);
Y([
  de({ type: Boolean, reflect: !0 })
], U.prototype, "openStatus", 2);
Y([
  de({ type: String })
], U.prototype, "sectionTitle", 2);
Y([
  de({ type: Boolean, reflect: !0 })
], U.prototype, "initialized", 2);
U = Y([
  Ee("mds-drawer")
], U);
export {
  U as DrawerElement
};
