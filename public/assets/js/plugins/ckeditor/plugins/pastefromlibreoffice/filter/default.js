/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function k(b, c) {
    if (
      !(
        b.previous &&
        g(b.previous) &&
        b.getFirst().children.length &&
        b.children.length === 1 &&
        g(b.getFirst().getFirst())
      )
    )
      return !1;
    for (
      var d = l(b.previous), a = 0, f = d, r = q();
      (f = f.getAscendant(r));

    )
      a++;
    return (a = m(b, a)) ? (d.add(a), a.filterChildren(c), !0) : !1;
  }
  function l(b) {
    const c = b.children[b.children.length - 1];
    return g(c) || c.name === "li" ? l(c) : b;
  }
  function q() {
    let b = !1;
    return function (c) {
      return b ? !1 : g(c) || c.name === "li" ? g(c) : ((b = !0), !1);
    };
  }
  function m(b, c) {
    return c ? m(b.getFirst().getFirst(), --c) : b;
  }
  function g(b) {
    return b.name === "ol" || b.name === "ul";
  }
  function h() {
    return !1;
  }
  const n = CKEDITOR.plugins.pastetools;
  const p = n.filters.common;
  const e = p.styles;
  CKEDITOR.plugins.pastetools.filters.libreoffice = {
    rules(b, c, d) {
      return {
        root(a) {
          a.filterChildren(d);
        },
        comment() {
          return !1;
        },
        elementNames: [
          [/^head$/i, ""],
          [/^meta$/i, ""],
          [/^strike$/i, "s"]
        ],
        elements: {
          "!doctype": function (a) {
            a.replaceWithChildren();
          },
          span(a) {
            a.attributes.style &&
              ((a.attributes.style = e.normalizedStyles(a, c)),
              e.createStyleStack(a, d, c));
            CKEDITOR.tools.object.entries(a.attributes).length ||
              a.replaceWithChildren();
          },
          p(a) {
            const f = CKEDITOR.tools.parseCssText(a.attributes.style);
            if (
              c.plugins.pagebreak &&
              (f["page-break-before"] === "always" ||
                f["break-before"] === "page")
            ) {
              var b = CKEDITOR.plugins.pagebreak.createElement(c);
              var b = CKEDITOR.htmlParser.fragment.fromHtml(b.getOuterHtml())
                .children[0];
              b.insertBefore(a);
            }
            a.attributes.style = CKEDITOR.tools.writeCssText(f);
            a.filterChildren(d);
            e.createStyleStack(a, d, c);
          },
          div(a) {
            e.createStyleStack(a, d, c);
          },
          a(a) {
            if (a.attributes.style) {
              const c = a.attributes;
              a = CKEDITOR.tools.parseCssText(a.attributes.style);
              a.color === "#000080" && delete a.color;
              a["text-decoration"] === "underline" &&
                delete a["text-decoration"];
              a = CKEDITOR.tools.writeCssText(a);
              c.style = a;
            }
          },
          h1(a) {
            e.createStyleStack(a, d, c);
          },
          h2(a) {
            e.createStyleStack(a, d, c);
          },
          h3(a) {
            e.createStyleStack(a, d, c);
          },
          h4(a) {
            e.createStyleStack(a, d, c);
          },
          h5(a) {
            e.createStyleStack(a, d, c);
          },
          h6(a) {
            e.createStyleStack(a, d, c);
          },
          pre(a) {
            e.createStyleStack(a, d, c);
          },
          font(a) {
            let c;
            c =
              a.parent.name === "a" && a.attributes.color === "#000080"
                ? !0
                : a.parent.children.length !== 1 ||
                  (a.parent.name !== "sup" && a.parent.name !== "sub") ||
                  a.attributes.size !== "2"
                ? !1
                : !0;
            c && a.replaceWithChildren();
            c = CKEDITOR.tools.parseCssText(a.attributes.style);
            const b = a.getFirst();
            a.attributes.size &&
              b &&
              b.type === CKEDITOR.NODE_ELEMENT &&
              /font-size/.test(b.attributes.style) &&
              a.replaceWithChildren();
            c["font-size"] &&
              (delete a.attributes.size,
              (a.name = "span"),
              b &&
                b.type === CKEDITOR.NODE_ELEMENT &&
                b.attributes.size &&
                b.replaceWithChildren());
          },
          ul(a) {
            if (k(a, d)) return !1;
          },
          ol(a) {
            if (k(a, d)) return !1;
          },
          img(a) {
            if (!a.attributes.src) return !1;
          },
          table(a) {
            const c = a.attributes;
            a = a.attributes.style;
            const b = CKEDITOR.tools.parseCssText(a);
            b["border-collapse"] ||
              ((b["border-collapse"] = "collapse"),
              (a = CKEDITOR.tools.writeCssText(b)));
            c.style = a;
          }
        },
        attributes: {
          style(a, b) {
            return e.normalizedStyles(b, c) || !1;
          },
          align(a, b) {
            if (b.name !== "img") {
              const c = CKEDITOR.tools.parseCssText(b.attributes.style);
              c["text-align"] = b.attributes.align;
              b.attributes.style = CKEDITOR.tools.writeCssText(c);
              return !1;
            }
          },
          cellspacing: h,
          cellpadding: h,
          border: h
        }
      };
    }
  };
  CKEDITOR.pasteFilters.libreoffice = n.createFilter({
    rules: [p.rules, CKEDITOR.plugins.pastetools.filters.libreoffice.rules]
  });
})();
