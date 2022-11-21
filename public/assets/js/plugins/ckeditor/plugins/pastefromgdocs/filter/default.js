/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function g(b) {
    return b === "" ? !1 : b;
  }
  function h(b) {
    if (!/(o|u)l/i.test(b.parent.name)) return b;
    d.elements.replaceWithChildren(b);
    return !1;
  }
  function k(b) {
    function d(a, f) {
      let b;
      let c;
      if (a && a.name === "tr") {
        b = a.children;
        for (c = 0; c < f.length && b[c]; c++) b[c].attributes.width = f[c];
        d(a.next, f);
      }
    }
    const c = b.parent;
    b = (function (a) {
      return CKEDITOR.tools.array.map(a, function (a) {
        return Number(a.attributes.width);
      });
    })(b.children);
    const a = (function (a) {
      return CKEDITOR.tools.array.reduce(
        a,
        function (a, b) {
          return a + b;
        },
        0
      );
    })(b);
    c.attributes.width = a;
    d(
      (function (a) {
        return (a = CKEDITOR.tools.array.find(a.children, function (a) {
          return a.name && (a.name === "tr" || a.name === "tbody");
        })) &&
          a.name &&
          a.name === "tbody"
          ? a.children[0]
          : a;
      })(c),
      b
    );
  }
  const e = CKEDITOR.plugins.pastetools;
  var d = e.filters.common;
  const c = d.styles;
  CKEDITOR.plugins.pastetools.filters.gdocs = {
    rules(b, e, l) {
      return {
        elementNames: [[/^meta/, ""]],
        comment() {
          return !1;
        },
        attributes: {
          id(a) {
            return !/^docs\-internal\-guid\-/.test(a);
          },
          dir(a) {
            return a === "ltr" ? !1 : a;
          },
          style(a, b) {
            return g(c.normalizedStyles(b, e));
          },
          class(a) {
            return g(a.replace(/kix-line-break/gi, ""));
          }
        },
        elements: {
          div(a) {
            const b = a.children.length === 1;
            const c = a.children[0].name === "table";
            a.name === "div" && b && c && delete a.attributes.align;
          },
          colgroup: k,
          span(a) {
            c.createStyleStack(
              a,
              l,
              e,
              /vertical-align|white-space|font-variant/
            );
            const b = /vertical-align:\s*sub/;
            const d = a.attributes.style;
            /vertical-align:\s*super/.test(d)
              ? (a.name = "sup")
              : b.test(d) && (a.name = "sub");
            a.attributes.style = d.replace(/vertical-align\s*.+?;?/, "");
          },
          b(a) {
            d.elements.replaceWithChildren(a);
            return !1;
          },
          p(a) {
            if (a.parent && a.parent.name === "li")
              return d.elements.replaceWithChildren(a), !1;
          },
          ul(a) {
            c.pushStylesLower(a);
            return h(a);
          },
          ol(a) {
            c.pushStylesLower(a);
            return h(a);
          },
          li(a) {
            c.pushStylesLower(a);
            const b = a.children;
            const e = /(o|u)l/i;
            b.length === 1 &&
              e.test(b[0].name) &&
              (d.elements.replaceWithChildren(a), (a = !1));
            return a;
          }
        }
      };
    }
  };
  CKEDITOR.pasteFilters.gdocs = e.createFilter({
    rules: [d.rules, CKEDITOR.plugins.pastetools.filters.gdocs.rules]
  });
})();
