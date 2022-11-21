/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function q(a, b, c) {
    b += c;
    for (var d = a[b], e = /[\s]/; d && e.test(d); ) (b += c), (d = a[b]);
    return d;
  }
  function r(a) {
    return /%$/.test(a) ? a : `${a}px`;
  }
  function t(a) {
    const b = a.margin ? "margin" : a.MARGIN ? "MARGIN" : !1;
    let c;
    let d;
    if (b) {
      d = CKEDITOR.tools.style.parse.margin(a[b]);
      for (c in d) a[`margin-${c}`] = d[c];
      delete a[b];
    }
  }
  function u(a) {
    const b =
      "background-color:transparent;background:transparent;background-color:none;background:none;background-position:initial initial;background-repeat:initial initial;caret-color;font-family:-webkit-standard;font-variant-caps;letter-spacing:normal;orphans;widows;text-transform:none;word-spacing:0px;-webkit-text-size-adjust:auto;-webkit-text-stroke-width:0px;text-indent:0px;margin-bottom:0in".split(
        ";"
      );
    let c = CKEDITOR.tools.parseCssText(a.attributes.style);
    let d;
    let e;
    for (d in c)
      (e = `${d}:${c[d]}`),
        CKEDITOR.tools.array.some(b, function (a) {
          return e.substring(0, a.length).toLowerCase() === a;
        }) && delete c[d];
    c = CKEDITOR.tools.writeCssText(c);
    c !== "" ? (a.attributes.style = c) : delete a.attributes.style;
  }
  function v(a) {
    a = a.config.font_names;
    let b = [];
    if (!a || !a.length) return !1;
    b = CKEDITOR.tools.array.map(a.split(";"), function (a) {
      return a.indexOf("/") === -1 ? a : a.split("/")[1];
    });
    return b.length ? b : !1;
  }
  function w(a, b) {
    const c = a.split(",");
    return (
      CKEDITOR.tools.array.find(b, function (a) {
        for (let e = 0; e < c.length; e++)
          if (a.indexOf(CKEDITOR.tools.trim(c[e])) === -1) return !1;
        return !0;
      }) || a
    );
  }
  let g;
  const m = CKEDITOR.tools;
  const p = {};
  CKEDITOR.plugins.pastetools.filters.common = p;
  p.rules = function (a, b, c) {
    const d = v(b);
    return {
      elements: {
        "^": function (a) {
          u(a);
          if (a.attributes.bgcolor) {
            const b = CKEDITOR.tools.parseCssText(a.attributes.style);
            b["background-color"] ||
              ((b["background-color"] = a.attributes.bgcolor),
              (a.attributes.style = CKEDITOR.tools.writeCssText(b)));
          }
        },
        span(a) {
          if (a.hasClass("Apple-converted-space"))
            return new CKEDITOR.htmlParser.text(" ");
        },
        table(a) {
          a.filterChildren(c);
          const b = a.parent;
          const f = b && b.parent;
          let d;
          let h;
          if (
            b.name &&
            b.name === "div" &&
            b.attributes.align &&
            m.object.keys(b.attributes).length === 1 &&
            b.children.length === 1
          ) {
            a.attributes.align = b.attributes.align;
            d = b.children.splice(0);
            a.remove();
            for (h = d.length - 1; h >= 0; h--) f.add(d[h], b.getIndex());
            b.remove();
          }
          g.convertStyleToPx(a);
        },
        tr(a) {
          a.attributes = {};
        },
        td(a) {
          var d = a.getAscendant("table");
          var d = m.parseCssText(d.attributes.style, !0);
          var f = d.background;
          f && g.setStyle(a, "background", f, !0);
          (d = d["background-color"]) &&
            g.setStyle(a, "background-color", d, !0);
          var d = m.parseCssText(a.attributes.style, !0);
          var f = d.border
            ? CKEDITOR.tools.style.border.fromCssRule(d.border)
            : {};
          var f = m.style.border.splitCssValues(d, f);
          const l = CKEDITOR.tools.clone(d);
          let h;
          for (h in l) h.indexOf("border") == 0 && delete l[h];
          a.attributes.style = CKEDITOR.tools.writeCssText(l);
          d.background &&
            ((h = CKEDITOR.tools.style.parse.background(d.background)),
            h.color &&
              (g.setStyle(a, "background-color", h.color, !0),
              g.setStyle(a, "background", "")));
          for (const n in f)
            (h = d[n] ? CKEDITOR.tools.style.border.fromCssRule(d[n]) : f[n]),
              h.style === "none"
                ? g.setStyle(a, n, "none")
                : g.setStyle(a, n, h.toString());
          g.mapCommonStyles(a);
          g.convertStyleToPx(a);
          g.createStyleStack(
            a,
            c,
            b,
            /margin|text\-align|padding|list\-style\-type|width|height|border|white\-space|vertical\-align|background/i
          );
        },
        font(a) {
          a.attributes.face &&
            d &&
            (a.attributes.face = w(a.attributes.face, d));
        }
      }
    };
  };
  p.styles = {
    setStyle(a, b, c, d) {
      const e = m.parseCssText(a.attributes.style);
      (d && e[b]) ||
        (c === "" ? delete e[b] : (e[b] = c),
        (a.attributes.style = CKEDITOR.tools.writeCssText(e)));
    },
    convertStyleToPx(a) {
      const b = a.attributes.style;
      b &&
        (a.attributes.style = b.replace(/\d+(\.\d+)?pt/g, function (a) {
          return `${CKEDITOR.tools.convertToPx(a)}px`;
        }));
    },
    mapStyles(a, b) {
      for (const c in b)
        if (a.attributes[c]) {
          if (typeof b[c] === "function") b[c](a.attributes[c]);
          else g.setStyle(a, b[c], a.attributes[c]);
          delete a.attributes[c];
        }
    },
    mapCommonStyles(a) {
      return g.mapStyles(a, {
        vAlign(b) {
          g.setStyle(a, "vertical-align", b);
        },
        width(b) {
          g.setStyle(a, "width", r(b));
        },
        height(b) {
          g.setStyle(a, "height", r(b));
        }
      });
    },
    normalizedStyles(a, b) {
      const c =
        "background-color:transparent border-image:none color:windowtext direction:ltr mso- visibility:visible div:border:none".split(
          " "
        );
      const d =
        "font-family font font-size color background-color line-height text-decoration".split(
          " "
        );
      const e = function () {
        for (var a = [], b = 0; b < arguments.length; b++)
          arguments[b] && a.push(arguments[b]);
        return m.indexOf(c, a.join(":")) !== -1;
      };
      const k =
        !0 ===
        CKEDITOR.plugins.pastetools.getConfigValue(b, "removeFontStyles");
      const f = m.parseCssText(a.attributes.style);
      a.name == "cke:li" &&
        (f["TEXT-INDENT"] && f.MARGIN
          ? ((a.attributes["cke-indentation"] =
              p.lists.getElementIndentation(a)),
            (f.MARGIN = f.MARGIN.replace(
              /(([\w\.]+ ){3,3})[\d\.]+(\w+$)/,
              "$10$3"
            )))
          : delete f["TEXT-INDENT"],
        delete f["text-indent"]);
      for (let l = m.object.keys(f), h = 0; h < l.length; h++) {
        const n = l[h].toLowerCase();
        const g = f[l[h]];
        const q = CKEDITOR.tools.indexOf;
        ((k && q(d, n.toLowerCase()) !== -1) ||
          e(null, n, g) ||
          e(null, n.replace(/\-.*$/, "-")) ||
          e(null, n) ||
          e(a.name, n, g) ||
          e(a.name, n.replace(/\-.*$/, "-")) ||
          e(a.name, n) ||
          e(g)) &&
          delete f[l[h]];
      }
      const r = CKEDITOR.plugins.pastetools.getConfigValue(
        b,
        "keepZeroMargins"
      );
      t(f);
      (function () {
        CKEDITOR.tools.array.forEach(
          ["top", "right", "bottom", "left"],
          function (a) {
            a = `margin-${a}`;
            if (a in f) {
              const b = CKEDITOR.tools.convertToPx(f[a]);
              b || r ? (f[a] = b ? `${b}px` : 0) : delete f[a];
            }
          }
        );
      })();
      return CKEDITOR.tools.writeCssText(f);
    },
    createStyleStack(a, b, c, d) {
      const e = [];
      a.filterChildren(b);
      for (b = a.children.length - 1; b >= 0; b--)
        e.unshift(a.children[b]), a.children[b].remove();
      g.sortStyles(a);
      b = m.parseCssText(g.normalizedStyles(a, c));
      c = a;
      let k = a.name === "span";
      let f;
      for (f in b)
        if (
          !f.match(
            d ||
              /margin((?!-)|-left|-top|-bottom|-right)|text-indent|text-align|width|border|padding/i
          )
        )
          if (k) k = !1;
          else {
            const l = new CKEDITOR.htmlParser.element("span");
            l.attributes.style = `${f}:${b[f]}`;
            c.add(l);
            c = l;
            delete b[f];
          }
      CKEDITOR.tools.isEmpty(b)
        ? delete a.attributes.style
        : (a.attributes.style = CKEDITOR.tools.writeCssText(b));
      for (b = 0; b < e.length; b++) c.add(e[b]);
    },
    sortStyles(a) {
      for (
        var b = ["border", "border-bottom", "font-size", "background"],
          c = m.parseCssText(a.attributes.style),
          d = m.object.keys(c),
          e = [],
          k = [],
          f = 0;
        f < d.length;
        f++
      )
        m.indexOf(b, d[f].toLowerCase()) !== -1 ? e.push(d[f]) : k.push(d[f]);
      e.sort(function (a, c) {
        const d = m.indexOf(b, a.toLowerCase());
        const e = m.indexOf(b, c.toLowerCase());
        return d - e;
      });
      d = [].concat(e, k);
      e = {};
      for (f = 0; f < d.length; f++) e[d[f]] = c[d[f]];
      a.attributes.style = CKEDITOR.tools.writeCssText(e);
    },
    pushStylesLower(a, b, c) {
      if (!a.attributes.style || a.children.length === 0) return !1;
      b = b || {};
      const d = {
        "list-style-type": !0,
        width: !0,
        height: !0,
        border: !0,
        "border-": !0
      };
      const e = m.parseCssText(a.attributes.style);
      let k;
      for (k in e)
        if (
          !(
            k.toLowerCase() in d ||
            d[k.toLowerCase().replace(/\-.*$/, "-")] ||
            k.toLowerCase() in b
          )
        ) {
          for (var f = !1, l = 0; l < a.children.length; l++) {
            let h = a.children[l];
            if (h.type === CKEDITOR.NODE_TEXT && c) {
              const n = new CKEDITOR.htmlParser.element("span");
              n.setHtml(h.value);
              h.replaceWith(n);
              h = n;
            }
            h.type === CKEDITOR.NODE_ELEMENT &&
              ((f = !0), g.setStyle(h, k, e[k]));
          }
          f && delete e[k];
        }
      a.attributes.style = CKEDITOR.tools.writeCssText(e);
      return !0;
    },
    inliner: {
      filtered:
        "break-before break-after break-inside page-break page-break-before page-break-after page-break-inside".split(
          " "
        ),
      parse(a) {
        function b(a) {
          const b = new CKEDITOR.dom.element("style");
          const c = new CKEDITOR.dom.element("iframe");
          c.hide();
          CKEDITOR.document.getBody().append(c);
          c.$.contentDocument.documentElement.appendChild(b.$);
          b.$.textContent = a;
          c.remove();
          return b.$.sheet;
        }
        function c(a) {
          const b = a.indexOf("{");
          const c = a.indexOf("}");
          return d(a.substring(b + 1, c), !0);
        }
        var d = CKEDITOR.tools.parseCssText;
        const e = g.inliner.filter;
        let k = a.is ? a.$.sheet : b(a);
        a = [];
        let f;
        if (k)
          for (k = k.cssRules, f = 0; f < k.length; f++)
            k[f].type === window.CSSRule.STYLE_RULE &&
              a.push({
                selector: k[f].selectorText,
                styles: e(c(k[f].cssText))
              });
        return a;
      },
      filter(a) {
        const b = g.inliner.filtered;
        const c = m.array.indexOf;
        const d = {};
        let e;
        for (e in a) c(b, e) === -1 && (d[e] = a[e]);
        return d;
      },
      sort(a) {
        return a.sort(
          (function (a) {
            const c = CKEDITOR.tools.array.map(a, function (a) {
              return a.selector;
            });
            return function (a, b) {
              var k = `${a.selector}`.indexOf(".") !== -1 ? 1 : 0;
              var k = (`${b.selector}`.indexOf(".") !== -1 ? 1 : 0) - k;
              return k !== 0
                ? k
                : c.indexOf(b.selector) - c.indexOf(a.selector);
            };
          })(a)
        );
      },
      inline(a) {
        const b = g.inliner.parse;
        let c = g.inliner.sort;
        const d = (function (a) {
          a = new DOMParser().parseFromString(a, "text/html");
          return new CKEDITOR.dom.document(a);
        })(a);
        a = d.find("style");
        c = c(
          (function (a) {
            let c = [];
            let d;
            for (d = 0; d < a.count(); d++) c = c.concat(b(a.getItem(d)));
            return c;
          })(a)
        );
        CKEDITOR.tools.array.forEach(c, function (a) {
          const b = a.styles;
          a = d.find(a.selector);
          let c;
          let g;
          let h;
          t(b);
          for (h = 0; h < a.count(); h++)
            (c = a.getItem(h)),
              (g = CKEDITOR.tools.parseCssText(c.getAttribute("style"))),
              t(g),
              (g = CKEDITOR.tools.extend({}, g, b)),
              c.setAttribute("style", CKEDITOR.tools.writeCssText(g));
        });
        return d;
      }
    }
  };
  g = p.styles;
  p.lists = {
    getElementIndentation(a) {
      a = m.parseCssText(a.attributes.style);
      if (a.margin || a.MARGIN) {
        a.margin = a.margin || a.MARGIN;
        const b = { styles: { margin: a.margin } };
        CKEDITOR.filter.transformationsTools.splitMarginShorthand(b);
        a["margin-left"] = b.styles["margin-left"];
      }
      return parseInt(m.convertToPx(a["margin-left"] || "0px"), 10);
    }
  };
  p.elements = {
    replaceWithChildren(a) {
      for (let b = a.children.length - 1; b >= 0; b--)
        a.children[b].insertAfter(a);
    }
  };
  p.createAttributeStack = function (a, b) {
    let c;
    const d = [];
    a.filterChildren(b);
    for (c = a.children.length - 1; c >= 0; c--)
      d.unshift(a.children[c]), a.children[c].remove();
    c = a.attributes;
    let e = a;
    let g = !0;
    let f;
    for (f in c)
      if (g) g = !1;
      else {
        const l = new CKEDITOR.htmlParser.element(a.name);
        l.attributes[f] = c[f];
        e.add(l);
        e = l;
        delete c[f];
      }
    for (c = 0; c < d.length; c++) e.add(d[c]);
  };
  p.parseShorthandMargins = t;
  p.rtf = {
    getGroups(a, b) {
      for (var c = [], d, e = 0; (d = p.rtf.getGroup(a, b, { start: e })); )
        (e = d.end), c.push(d);
      return c;
    },
    removeGroups(a, b) {
      for (var c; (c = p.rtf.getGroup(a, b)); ) {
        const d = a.substring(0, c.start);
        c = a.substring(c.end);
        a = d + c;
      }
      return a;
    },
    getGroup(a, b, c) {
      let d = 0;
      b = new RegExp(`\\{\\\\${b}`, "g");
      let e;
      c = CKEDITOR.tools.object.merge({ start: 0 }, c || {});
      b.lastIndex = c.start;
      c = b.exec(a);
      if (!c) return null;
      b = c.index;
      e = a[b];
      do {
        const g = e === "{" && q(a, b, -1) !== "\\" && q(a, b, 1) === "\\";
        e = e === "}" && q(a, b, -1) !== "\\" && d > 0;
        g ? d++ : e && d--;
        e = a[++b];
      } while (e && d > 0);
      return { start: c.index, end: b, content: a.substring(c.index, b) };
    },
    extractGroupContent(a) {
      let b;
      b = (b = a.match(/^\{\\(\w+)/)) ? b[1] : null;
      a = a.replace(/\}([^{\s]+)/g, "} $1");
      a = p.rtf.removeGroups(a, `(?!${b})`);
      a = CKEDITOR.tools.trim(a.replace(/^\{(\\[\w-]+\s*)+/g, ""));
      return a.replace(/}$/, "");
    }
  };
})();
