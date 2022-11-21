/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function r() {
    return !1;
  }
  const n = CKEDITOR.tools;
  const B = CKEDITOR.plugins.pastetools;
  const t = B.filters.common;
  const k = t.styles;
  const C = t.createAttributeStack;
  const z = t.lists.getElementIndentation;
  const D = ["o:p", "xml", "script", "meta", "link"];
  const E =
    "v:arc v:curve v:line v:oval v:polyline v:rect v:roundrect v:group".split(
      " "
    );
  const A = {};
  let y = 0;
  const q = {};
  let g;
  let p;
  CKEDITOR.plugins.pastetools.filters.word = q;
  CKEDITOR.plugins.pastefromword = q;
  q.rules = function (c, b, d) {
    function e(a) {
      (a.attributes["o:gfxdata"] || a.parent.name === "v:group") &&
        l.push(a.attributes.id);
    }
    const f = Boolean(c.match(/mso-list:\s*l\d+\s+level\d+\s+lfo\d+/));
    var l = [];
    const w = {
      root(a) {
        a.filterChildren(d);
        CKEDITOR.plugins.pastefromword.lists.cleanup(g.createLists(a));
      },
      elementNames: [
        [/^\?xml:namespace$/, ""],
        [/^v:shapetype/, ""],
        [new RegExp(D.join("|")), ""]
      ],
      elements: {
        a(a) {
          if (a.attributes.name) {
            if (a.attributes.name == "_GoBack") {
              delete a.name;
              return;
            }
            if (a.attributes.name.match(/^OLE_LINK\d+$/)) {
              delete a.name;
              return;
            }
          }
          if (a.attributes.href && a.attributes.href.match(/#.+$/)) {
            const b = a.attributes.href.match(/#(.+)$/)[1];
            A[b] = a;
          }
          a.attributes.name &&
            A[a.attributes.name] &&
            ((a = A[a.attributes.name]),
            (a.attributes.href = a.attributes.href.replace(/.*#(.*)$/, "#$1")));
        },
        div(a) {
          if (b.plugins.pagebreak && a.attributes["data-cke-pagebreak"])
            return a;
          k.createStyleStack(a, d, b);
        },
        img(a) {
          if (a.parent && a.parent.attributes) {
            var b = a.parent.attributes;
            (b = b.style || b.STYLE) &&
              b.match(/mso\-list:\s?Ignore/) &&
              (a.attributes["cke-ignored"] = !0);
          }
          k.mapCommonStyles(a);
          a.attributes.src &&
            a.attributes.src.match(/^file:\/\//) &&
            a.attributes.alt &&
            a.attributes.alt.match(/^https?:\/\//) &&
            (a.attributes.src = a.attributes.alt);
          a = a.attributes["v:shapes"]
            ? a.attributes["v:shapes"].split(" ")
            : [];
          b = CKEDITOR.tools.array.every(a, function (a) {
            return l.indexOf(a) > -1;
          });
          if (a.length && b) return !1;
        },
        p(a) {
          a.filterChildren(d);
          if (
            a.attributes.style &&
            a.attributes.style.match(/display:\s*none/i)
          )
            return !1;
          if (g.thisIsAListItem(b, a))
            p.isEdgeListItem(b, a) && p.cleanupEdgeListItem(a),
              g.convertToFakeListItem(b, a),
              n.array.reduce(
                a.children,
                function (a, b) {
                  b.name === "p" &&
                    (a > 0 &&
                      new CKEDITOR.htmlParser.element("br").insertBefore(b),
                    b.replaceWithChildren(),
                    (a += 1));
                  return a;
                },
                0
              );
          else {
            const c = a.getAscendant(function (a) {
              return a.name == "ul" || a.name == "ol";
            });
            const f = n.parseCssText(a.attributes.style);
            c &&
              !c.attributes["cke-list-level"] &&
              f["mso-list"] &&
              f["mso-list"].match(/level/) &&
              (c.attributes["cke-list-level"] =
                f["mso-list"].match(/level(\d+)/)[1]);
            b.config.enterMode == CKEDITOR.ENTER_BR &&
              (delete a.name, a.add(new CKEDITOR.htmlParser.element("br")));
          }
          k.createStyleStack(a, d, b);
        },
        pre(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);
          k.createStyleStack(a, d, b);
        },
        h1(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);
          k.createStyleStack(a, d, b);
        },
        h2(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);
          k.createStyleStack(a, d, b);
        },
        h3(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);
          k.createStyleStack(a, d, b);
        },
        h4(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);
          k.createStyleStack(a, d, b);
        },
        h5(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);
          k.createStyleStack(a, d, b);
        },
        h6(a) {
          g.thisIsAListItem(b, a) && g.convertToFakeListItem(b, a);
          k.createStyleStack(a, d, b);
        },
        font(a) {
          if (a.getHtml().match(/^\s*$/))
            return (
              a.parent.type === CKEDITOR.NODE_ELEMENT &&
                new CKEDITOR.htmlParser.text(" ").insertAfter(a),
              !1
            );
          b &&
            !0 === b.config.pasteFromWordRemoveFontStyles &&
            a.attributes.size &&
            delete a.attributes.size;
          CKEDITOR.dtd.tr[a.parent.name] &&
          CKEDITOR.tools.arrayCompare(
            CKEDITOR.tools.object.keys(a.attributes),
            ["class", "style"]
          )
            ? k.createStyleStack(a, d, b)
            : C(a, d);
        },
        ul(a) {
          if (f)
            return (
              a.parent.name == "li" &&
                n.indexOf(a.parent.children, a) === 0 &&
                k.setStyle(a.parent, "list-style-type", "none"),
              g.dissolveList(a),
              !1
            );
        },
        li(a) {
          p.correctLevelShift(a);
          f &&
            ((a.attributes.style = k.normalizedStyles(a, b)),
            k.pushStylesLower(a));
        },
        ol(a) {
          if (f)
            return (
              a.parent.name == "li" &&
                n.indexOf(a.parent.children, a) === 0 &&
                k.setStyle(a.parent, "list-style-type", "none"),
              g.dissolveList(a),
              !1
            );
        },
        span(a) {
          a.filterChildren(d);
          a.attributes.style = k.normalizedStyles(a, b);
          if (
            !a.attributes.style ||
            a.attributes.style.match(/^mso\-bookmark:OLE_LINK\d+$/) ||
            a.getHtml().match(/^(\s|&nbsp;)+$/)
          )
            return t.elements.replaceWithChildren(a), !1;
          a.attributes.style.match(/FONT-FAMILY:\s*Symbol/i) &&
            a.forEach(
              function (a) {
                a.value = a.value.replace(/&nbsp;/g, "");
              },
              CKEDITOR.NODE_TEXT,
              !0
            );
          k.createStyleStack(a, d, b);
        },
        "v:imagedata": r,
        "v:shape": function (a) {
          let b = !1;
          if (a.getFirst("v:imagedata") === null) e(a);
          else {
            a.parent.find(function (c) {
              c.name == "img" &&
                c.attributes &&
                c.attributes["v:shapes"] == a.attributes.id &&
                (b = !0);
            }, !0);
            if (b) return !1;
            let c = "";
            a.parent.name === "v:group"
              ? e(a)
              : (a.forEach(
                  function (a) {
                    a.attributes && a.attributes.src && (c = a.attributes.src);
                  },
                  CKEDITOR.NODE_ELEMENT,
                  !0
                ),
                a.filterChildren(d),
                (a.name = "img"),
                (a.attributes.src = a.attributes.src || c),
                delete a.attributes.type);
          }
        },
        style() {
          return !1;
        },
        object(a) {
          return !(!a.attributes || !a.attributes.data);
        },
        br(a) {
          if (
            b.plugins.pagebreak &&
            ((a = n.parseCssText(a.attributes.style, !0)),
            a["page-break-before"] === "always" || a["break-before"] === "page")
          )
            return (
              (a = CKEDITOR.plugins.pagebreak.createElement(b)),
              CKEDITOR.htmlParser.fragment.fromHtml(a.getOuterHtml())
                .children[0]
            );
        }
      },
      attributes: {
        style(a, c) {
          return k.normalizedStyles(c, b) || !1;
        },
        class(a) {
          a = a.replace(
            /(el\d+)|(font\d+)|msonormal|msolistparagraph\w*/gi,
            ""
          );
          return a === "" ? !1 : a;
        },
        cellspacing: r,
        cellpadding: r,
        border: r,
        "v:shapes": r,
        "o:spid": r
      },
      comment(a) {
        a.match(/\[if.* supportFields.*\]/) && y++;
        a == "[endif]" && (y = y > 0 ? y - 1 : 0);
        return !1;
      },
      text(a, b) {
        if (y) return "";
        const c = b.parent && b.parent.parent;
        return c &&
          c.attributes &&
          c.attributes.style &&
          c.attributes.style.match(/mso-list:\s*ignore/i)
          ? a.replace(/&nbsp;/g, " ")
          : a;
      }
    };
    n.array.forEach(E, function (a) {
      w.elements[a] = e;
    });
    return w;
  };
  q.lists = {
    thisIsAListItem(c, b) {
      return p.isEdgeListItem(c, b) ||
        (b.attributes.style &&
          b.attributes.style.match(/mso\-list:\s?l\d/) &&
          b.parent.name !== "li") ||
        b.attributes["cke-dissolved"] ||
        b.getHtml().match(/<!\-\-\[if !supportLists]\-\->/)
        ? !0
        : !1;
    },
    convertToFakeListItem(c, b) {
      p.isDegenerateListItem(c, b) && p.assignListLevels(c, b);
      this.getListItemInfo(b);
      if (!b.attributes["cke-dissolved"]) {
        let d;
        b.forEach(function (b) {
          !d &&
            b.name == "img" &&
            b.attributes["cke-ignored"] &&
            b.attributes.alt == "*" &&
            ((d = "·"), b.remove());
        }, CKEDITOR.NODE_ELEMENT);
        b.forEach(function (b) {
          d || b.value.match(/^ /) || (d = b.value);
        }, CKEDITOR.NODE_TEXT);
        if (typeof d === "undefined") return;
        b.attributes["cke-symbol"] = d.replace(/(?: |&nbsp;).*$/, "");
        g.removeSymbolText(b);
      }
      const e = b.attributes && n.parseCssText(b.attributes.style);
      if (e["margin-left"]) {
        let f = e["margin-left"];
        const l = b.attributes["cke-list-level"];
        (f = Math.max(CKEDITOR.tools.convertToPx(f) - 40 * l, 0))
          ? (e["margin-left"] = `${f}px`)
          : delete e["margin-left"];
        b.attributes.style = CKEDITOR.tools.writeCssText(e);
      }
      b.name = "cke:li";
    },
    convertToRealListItems(c) {
      const b = [];
      c.forEach(
        function (c) {
          c.name == "cke:li" && ((c.name = "li"), b.push(c));
        },
        CKEDITOR.NODE_ELEMENT,
        !1
      );
      return b;
    },
    removeSymbolText(c) {
      const b = c.attributes["cke-symbol"];
      const d = c.findOne(function (c) {
        return c.value && c.value.indexOf(b) > -1;
      }, !0);
      let e;
      d &&
        ((d.value = d.value.replace(b, "")),
        (e = d.parent),
        e.getHtml().match(/^(\s|&nbsp;)*$/) && e !== c
          ? e.remove()
          : d.value || d.remove());
    },
    setListSymbol(c, b, d) {
      d = d || 1;
      const e = n.parseCssText(c.attributes.style);
      if (c.name == "ol") {
        if (c.attributes.type || e["list-style-type"]) return;
        var f = {
          "[ivx]": "lower-roman",
          "[IVX]": "upper-roman",
          "[a-z]": "lower-alpha",
          "[A-Z]": "upper-alpha",
          "\\d": "decimal"
        };
        let l;
        for (l in f)
          if (g.getSubsectionSymbol(b).match(new RegExp(l))) {
            e["list-style-type"] = f[l];
            break;
          }
        c.attributes["cke-list-style-type"] = e["list-style-type"];
      } else
        (f = { "·": "disc", o: "circle", "§": "square" }),
          !e["list-style-type"] && f[b] && (e["list-style-type"] = f[b]);
      g.setListSymbol.removeRedundancies(e, d);
      (c.attributes.style = CKEDITOR.tools.writeCssText(e)) ||
        delete c.attributes.style;
    },
    setListStart(c) {
      for (var b = [], d = 0, e = 0; e < c.children.length; e++)
        b.push(c.children[e].attributes["cke-symbol"] || "");
      b[0] || d++;
      switch (c.attributes["cke-list-style-type"]) {
        case "lower-roman":
        case "upper-roman":
          c.attributes.start = g.toArabic(g.getSubsectionSymbol(b[d])) - d;
          break;
        case "lower-alpha":
        case "upper-alpha":
          c.attributes.start =
            g
              .getSubsectionSymbol(b[d])
              .replace(/\W/g, "")
              .toLowerCase()
              .charCodeAt(0) -
            96 -
            d;
          break;
        case "decimal":
          c.attributes.start =
            parseInt(g.getSubsectionSymbol(b[d]), 10) - d || 1;
      }
      c.attributes.start == "1" && delete c.attributes.start;
      delete c.attributes["cke-list-style-type"];
    },
    numbering: {
      toNumber(c, b) {
        function d(b) {
          b = b.toUpperCase();
          for (var c = 1, d = 1; b.length > 0; d *= 26)
            (c +=
              "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(b.charAt(b.length - 1)) * d),
              (b = b.substr(0, b.length - 1));
          return c;
        }
        function e(b) {
          const c = [
            [1e3, "M"],
            [900, "CM"],
            [500, "D"],
            [400, "CD"],
            [100, "C"],
            [90, "XC"],
            [50, "L"],
            [40, "XL"],
            [10, "X"],
            [9, "IX"],
            [5, "V"],
            [4, "IV"],
            [1, "I"]
          ];
          b = b.toUpperCase();
          for (var d = c.length, a = 0, e = 0; e < d; ++e)
            for (
              let g = c[e], u = g[1].length;
              b.substr(0, u) == g[1];
              b = b.substr(u)
            )
              a += g[0];
          return a;
        }
        return b == "decimal"
          ? Number(c)
          : b == "upper-roman" || b == "lower-roman"
          ? e(c.toUpperCase())
          : b == "lower-alpha" || b == "upper-alpha"
          ? d(c)
          : 1;
      },
      getStyle(c) {
        c = c.slice(0, 1);
        let b = {
          i: "lower-roman",
          v: "lower-roman",
          x: "lower-roman",
          l: "lower-roman",
          m: "lower-roman",
          I: "upper-roman",
          V: "upper-roman",
          X: "upper-roman",
          L: "upper-roman",
          M: "upper-roman"
        }[c];
        b ||
          ((b = "decimal"),
          c.match(/[a-z]/) && (b = "lower-alpha"),
          c.match(/[A-Z]/) && (b = "upper-alpha"));
        return b;
      }
    },
    getSubsectionSymbol(c) {
      return (c.match(/([\da-zA-Z]+).?$/) || ["placeholder", "1"])[1];
    },
    setListDir(c) {
      let b = 0;
      let d = 0;
      c.forEach(function (c) {
        c.name == "li" &&
          ((c.attributes.dir || c.attributes.DIR || "").toLowerCase() == "rtl"
            ? d++
            : b++);
      }, CKEDITOR.ELEMENT_NODE);
      d > b && (c.attributes.dir = "rtl");
    },
    createList(c) {
      return (c.attributes["cke-symbol"].match(/([\da-np-zA-NP-Z]).?/) || [])[1]
        ? new CKEDITOR.htmlParser.element("ol")
        : new CKEDITOR.htmlParser.element("ul");
    },
    createLists(c) {
      function b(b) {
        return CKEDITOR.tools.array.reduce(
          b,
          function (b, a) {
            if (a.attributes && a.attributes.style)
              var c = CKEDITOR.tools.parseCssText(a.attributes.style)[
                "margin-left"
              ];
            return c ? b + parseInt(c, 10) : b;
          },
          0
        );
      }
      let d;
      let e;
      let f;
      const l = g.convertToRealListItems(c);
      if (l.length === 0) return [];
      const k = g.groupLists(l);
      for (c = 0; c < k.length; c++) {
        const a = k[c];
        var h = a[0];
        for (f = 0; f < a.length; f++)
          if (a[f].attributes["cke-list-level"] == 1) {
            h = a[f];
            break;
          }
        var h = [g.createList(h)];
        let m = h[0];
        const u = [h[0]];
        m.insertBefore(a[0]);
        for (f = 0; f < a.length; f++) {
          d = a[f];
          for (e = d.attributes["cke-list-level"]; e > h.length; ) {
            const v = g.createList(d);
            let x = m.children;
            x.length > 0
              ? x[x.length - 1].add(v)
              : ((x = new CKEDITOR.htmlParser.element("li", {
                  style: "list-style-type:none"
                })),
                x.add(v),
                m.add(x));
            h.push(v);
            u.push(v);
            m = v;
            e == h.length && g.setListSymbol(v, d.attributes["cke-symbol"], e);
          }
          for (; e < h.length; )
            h.pop(),
              (m = h[h.length - 1]),
              e == h.length &&
                g.setListSymbol(m, d.attributes["cke-symbol"], e);
          d.remove();
          m.add(d);
        }
        h[0].children.length &&
          ((f = h[0].children[0].attributes["cke-symbol"]),
          !f &&
            h[0].children.length > 1 &&
            (f = h[0].children[1].attributes["cke-symbol"]),
          f && g.setListSymbol(h[0], f));
        for (f = 0; f < u.length; f++) g.setListStart(u[f]);
        for (f = 0; f < a.length; f++) this.determineListItemValue(a[f]);
      }
      CKEDITOR.tools.array.forEach(l, function (a) {
        for (var c = [], d = a.parent; d; )
          d.name === "li" && c.push(d), (d = d.parent);
        var c = b(c);
        let e;
        c &&
          ((a.attributes = a.attributes || {}),
          (d = CKEDITOR.tools.parseCssText(a.attributes.style)),
          (e = d["margin-left"] || 0),
          (e = Math.max(parseInt(e, 10) - c, 0))
            ? (d["margin-left"] = `${e}px`)
            : delete d["margin-left"],
          (a.attributes.style = CKEDITOR.tools.writeCssText(d)));
      });
      return l;
    },
    cleanup(c) {
      const b = [
        "cke-list-level",
        "cke-symbol",
        "cke-list-id",
        "cke-indentation",
        "cke-dissolved"
      ];
      let d;
      let e;
      for (d = 0; d < c.length; d++)
        for (e = 0; e < b.length; e++) delete c[d].attributes[b[e]];
    },
    determineListItemValue(c) {
      if (c.parent.name === "ol") {
        const b = this.calculateValue(c);
        let d = c.attributes["cke-symbol"].match(/[a-z0-9]+/gi);
        let e;
        d &&
          ((d = d[d.length - 1]),
          (e =
            c.parent.attributes["cke-list-style-type"] ||
            this.numbering.getStyle(d)),
          (d = this.numbering.toNumber(d, e)),
          d !== b && (c.attributes.value = d));
      }
    },
    calculateValue(c) {
      if (!c.parent) return 1;
      const b = c.parent;
      c = c.getIndex();
      let d = null;
      let e;
      let f;
      let g;
      for (g = c; g >= 0 && d === null; g--)
        (f = b.children[g]),
          f.attributes &&
            void 0 !== f.attributes.value &&
            ((e = g), (d = parseInt(f.attributes.value, 10)));
      d === null &&
        ((d =
          void 0 !== b.attributes.start ? parseInt(b.attributes.start, 10) : 1),
        (e = 0));
      return d + (c - e);
    },
    dissolveList(c) {
      function b(a) {
        return a >= 50
          ? `l${b(a - 50)}`
          : a >= 40
          ? `xl${b(a - 40)}`
          : a >= 10
          ? `x${b(a - 10)}`
          : a == 9
          ? "ix"
          : a >= 5
          ? `v${b(a - 5)}`
          : a == 4
          ? "iv"
          : a >= 1
          ? `i${b(a - 1)}`
          : "";
      }
      function d(a, b) {
        function c(b, d) {
          return b && b.parent
            ? a(b.parent)
              ? c(b.parent, d + 1)
              : c(b.parent, d)
            : d;
        }
        return c(b, 0);
      }
      const e = function (b) {
        return function (a) {
          return a.name == b;
        };
      };
      const f = function (b) {
        return e("ul")(b) || e("ol")(b);
      };
      const g = CKEDITOR.tools.array;
      const w = [];
      let a;
      let h;
      c.forEach(
        function (b) {
          w.push(b);
        },
        CKEDITOR.NODE_ELEMENT,
        !1
      );
      a = g.filter(w, e("li"));
      const m = g.filter(w, f);
      g.forEach(m, function (a) {
        let c = a.attributes.type;
        const h = parseInt(a.attributes.start, 10) || 1;
        const m = d(f, a) + 1;
        c || (c = n.parseCssText(a.attributes.style)["list-style-type"]);
        g.forEach(g.filter(a.children, e("li")), function (d, e) {
          let f;
          switch (c) {
            case "disc":
              f = "·";
              break;
            case "circle":
              f = "o";
              break;
            case "square":
              f = "§";
              break;
            case "1":
            case "decimal":
              f = `${h + e}.`;
              break;
            case "a":
            case "lower-alpha":
              f = `${String.fromCharCode(97 + h - 1 + e)}.`;
              break;
            case "A":
            case "upper-alpha":
              f = `${String.fromCharCode(65 + h - 1 + e)}.`;
              break;
            case "i":
            case "lower-roman":
              f = `${b(h + e)}.`;
              break;
            case "I":
            case "upper-roman":
              f = `${b(h + e).toUpperCase()}.`;
              break;
            default:
              f = a.name == "ul" ? "·" : `${h + e}.`;
          }
          d.attributes["cke-symbol"] = f;
          d.attributes["cke-list-level"] = m;
        });
      });
      a = g.reduce(
        a,
        function (b, a) {
          let c = a.children[0];
          if (
            c &&
            c.name &&
            c.attributes.style &&
            c.attributes.style.match(/mso-list:/i)
          ) {
            k.pushStylesLower(a, { "list-style-type": !0, display: !0 });
            const d = n.parseCssText(c.attributes.style, !0);
            k.setStyle(a, "mso-list", d["mso-list"], !0);
            k.setStyle(c, "mso-list", "");
            delete a["cke-list-level"];
            (c = d.display ? "display" : d.DISPLAY ? "DISPLAY" : "") &&
              k.setStyle(a, "display", d[c], !0);
          }
          if (a.children.length === 1 && f(a.children[0])) return b;
          a.name = "p";
          a.attributes["cke-dissolved"] = !0;
          b.push(a);
          return b;
        },
        []
      );
      for (h = a.length - 1; h >= 0; h--) a[h].insertAfter(c);
      for (h = m.length - 1; h >= 0; h--) delete m[h].name;
    },
    groupLists(c) {
      let b;
      let d;
      const e = [[c[0]]];
      let f = e[0];
      d = c[0];
      d.attributes["cke-indentation"] = d.attributes["cke-indentation"] || z(d);
      for (b = 1; b < c.length; b++) {
        d = c[b];
        const l = c[b - 1];
        d.attributes["cke-indentation"] =
          d.attributes["cke-indentation"] || z(d);
        d.previous !== l && (g.chopDiscontinuousLists(f, e), e.push((f = [])));
        f.push(d);
      }
      g.chopDiscontinuousLists(f, e);
      return e;
    },
    chopDiscontinuousLists(c, b) {
      for (var d = {}, e = [[]], f, l = 0; l < c.length; l++) {
        const k = d[c[l].attributes["cke-list-level"]];
        let a = this.getListItemInfo(c[l]);
        var h;
        var m;
        k
          ? ((m = k.type.match(/alpha/) && k.index == 7 ? "alpha" : m),
            (m =
              c[l].attributes["cke-symbol"] == "o" && k.index == 14
                ? "alpha"
                : m),
            (h = g.getSymbolInfo(c[l].attributes["cke-symbol"], m)),
            (a = this.getListItemInfo(c[l])),
            (k.type != h.type ||
              (f && a.id != f.id && !this.isAListContinuation(c[l]))) &&
              e.push([]))
          : (h = g.getSymbolInfo(c[l].attributes["cke-symbol"]));
        for (
          f = parseInt(c[l].attributes["cke-list-level"], 10) + 1;
          f < 20;
          f++
        )
          d[f] && delete d[f];
        d[c[l].attributes["cke-list-level"]] = h;
        e[e.length - 1].push(c[l]);
        f = a;
      }
      [].splice.apply(b, [].concat([n.indexOf(b, c), 1], e));
    },
    isAListContinuation(c) {
      let b = c;
      do
        if ((b = b.previous) && b.type === CKEDITOR.NODE_ELEMENT) {
          if (void 0 === b.attributes["cke-list-level"]) break;
          if (b.attributes["cke-list-level"] === c.attributes["cke-list-level"])
            return b.attributes["cke-list-id"] === c.attributes["cke-list-id"];
        }
      while (b);
      return !1;
    },
    toArabic(c) {
      return c.match(/[ivxl]/i)
        ? c.match(/^l/i)
          ? 50 + g.toArabic(c.slice(1))
          : c.match(/^lx/i)
          ? 40 + g.toArabic(c.slice(1))
          : c.match(/^x/i)
          ? 10 + g.toArabic(c.slice(1))
          : c.match(/^ix/i)
          ? 9 + g.toArabic(c.slice(2))
          : c.match(/^v/i)
          ? 5 + g.toArabic(c.slice(1))
          : c.match(/^iv/i)
          ? 4 + g.toArabic(c.slice(2))
          : c.match(/^i/i)
          ? 1 + g.toArabic(c.slice(1))
          : g.toArabic(c.slice(1))
        : 0;
    },
    getSymbolInfo(c, b) {
      const d = c.toUpperCase() == c ? "upper-" : "lower-";
      const e = { "·": ["disc", -1], o: ["circle", -2], "§": ["square", -3] };
      if (c in e || (b && b.match(/(disc|circle|square)/)))
        return { index: e[c][1], type: e[c][0] };
      if (c.match(/\d/))
        return {
          index: c ? parseInt(g.getSubsectionSymbol(c), 10) : 0,
          type: "decimal"
        };
      c = c.replace(/\W/g, "").toLowerCase();
      return (!b && c.match(/[ivxl]+/i)) || (b && b != "alpha") || b == "roman"
        ? { index: g.toArabic(c), type: `${d}roman` }
        : c.match(/[a-z]/i)
        ? { index: c.charCodeAt(0) - 97, type: `${d}alpha` }
        : { index: -1, type: "disc" };
    },
    getListItemInfo(c) {
      if (void 0 !== c.attributes["cke-list-id"])
        return {
          id: c.attributes["cke-list-id"],
          level: c.attributes["cke-list-level"]
        };
      let b = n.parseCssText(c.attributes.style)["mso-list"];
      const d = { id: "0", level: "1" };
      b &&
        ((b += " "),
        (d.level = b.match(/level(.+?)\s+/)[1]),
        (d.id = b.match(/l(\d+?)\s+/)[1]));
      c.attributes["cke-list-level"] =
        void 0 !== c.attributes["cke-list-level"]
          ? c.attributes["cke-list-level"]
          : d.level;
      c.attributes["cke-list-id"] = d.id;
      return d;
    }
  };
  g = q.lists;
  q.heuristics = {
    isEdgeListItem(c, b) {
      if (!CKEDITOR.env.edge || !c.config.pasteFromWord_heuristicsEdgeList)
        return !1;
      let d = "";
      b.forEach &&
        b.forEach(function (b) {
          d += b.value;
        }, CKEDITOR.NODE_TEXT);
      return d.match(/^(?: |&nbsp;)*\(?[a-zA-Z0-9]+?[\.\)](?: |&nbsp;){2,}/)
        ? !0
        : p.isDegenerateListItem(c, b);
    },
    cleanupEdgeListItem(c) {
      let b = !1;
      c.forEach(function (c) {
        b ||
          ((c.value = c.value.replace(/^(?:&nbsp;|[\s])+/, "")),
          c.value.length && (b = !0));
      }, CKEDITOR.NODE_TEXT);
    },
    isDegenerateListItem(c, b) {
      return (
        !!b.attributes["cke-list-level"] ||
        (b.attributes.style &&
          !b.attributes.style.match(/mso\-list/) &&
          !!b.find(function (c) {
            if (
              c.type == CKEDITOR.NODE_ELEMENT &&
              b.name.match(/h\d/i) &&
              c.getHtml().match(/^[a-zA-Z0-9]+?[\.\)]$/)
            )
              return !0;
            const e = n.parseCssText(c.attributes && c.attributes.style, !0);
            if (!e) return !1;
            const f = e["font-family"] || "";
            return (
              ((e.font || e["font-size"] || "").match(/7pt/i) &&
                !!c.previous) ||
              f.match(/symbol/i)
            );
          }, !0).length)
      );
    },
    assignListLevels(c, b) {
      if (!b.attributes || void 0 === b.attributes["cke-list-level"]) {
        for (
          var d = [z(b)], e = [b], f = [], g = CKEDITOR.tools.array, k = g.map;
          b.next &&
          b.next.attributes &&
          !b.next.attributes["cke-list-level"] &&
          p.isDegenerateListItem(c, b.next);

        )
          (b = b.next), d.push(z(b)), e.push(b);
        const a = k(d, function (a, b) {
          return b === 0 ? 0 : a - d[b - 1];
        });
        const h = this.guessIndentationStep(
          g.filter(d, function (a) {
            return a !== 0;
          })
        );
        var f = k(d, function (a) {
          return Math.round(a / h);
        });
        g.indexOf(f, 0) !== -1 &&
          (f = k(f, function (a) {
            return a + 1;
          }));
        g.forEach(e, function (a, b) {
          a.attributes["cke-list-level"] = f[b];
        });
        return { indents: d, levels: f, diffs: a };
      }
    },
    guessIndentationStep(c) {
      return c.length ? Math.min.apply(null, c) : null;
    },
    correctLevelShift(c) {
      if (this.isShifted(c)) {
        const b = CKEDITOR.tools.array.filter(c.children, function (b) {
          return b.name == "ul" || b.name == "ol";
        });
        const d = CKEDITOR.tools.array.reduce(
          b,
          function (b, c) {
            return (
              c.children && c.children.length == 1 && p.isShifted(c.children[0])
                ? [c]
                : c.children
            ).concat(b);
          },
          []
        );
        CKEDITOR.tools.array.forEach(b, function (b) {
          b.remove();
        });
        CKEDITOR.tools.array.forEach(d, function (b) {
          c.add(b);
        });
        delete c.name;
      }
    },
    isShifted(c) {
      return c.name !== "li"
        ? !1
        : CKEDITOR.tools.array.filter(c.children, function (b) {
            return b.name &&
              (b.name == "ul" ||
                b.name == "ol" ||
                (b.name == "p" && b.children.length === 0))
              ? !1
              : !0;
          }).length === 0;
    }
  };
  p = q.heuristics;
  g.setListSymbol.removeRedundancies = function (c, b) {
    ((b === 1 && c["list-style-type"] === "disc") ||
      c["list-style-type"] === "decimal") &&
      delete c["list-style-type"];
  };
  CKEDITOR.cleanWord = CKEDITOR.pasteFilters.word = B.createFilter({
    rules: [t.rules, q.rules],
    additionalTransforms(c) {
      CKEDITOR.plugins.clipboard.isCustomDataTypesSupported &&
        (c = t.styles.inliner.inline(c).getBody().getHtml());
      return c.replace(/<!\[/g, "\x3c!--[").replace(/\]>/g, "]--\x3e");
    }
  });
  CKEDITOR.config.pasteFromWord_heuristicsEdgeList = !0;
})();
