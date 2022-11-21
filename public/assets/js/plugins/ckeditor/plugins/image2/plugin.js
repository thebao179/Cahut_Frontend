/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
  function F(a) {
    function b() {
      this.deflated ||
        (a.widgets.focused == this.widget && (this.focused = !0),
        a.widgets.destroy(this.widget),
        (this.deflated = !0));
    }
    function h() {
      var d = a.editable();
      var c = a.document;
      if (this.deflated)
        (this.widget = a.widgets.initOn(
          this.element,
          "image",
          this.widget.data
        )),
          this.widget.inline &&
            !new CKEDITOR.dom.elementPath(this.widget.wrapper, d).block &&
            ((d = c.createElement(
              a.activeEnterMode == CKEDITOR.ENTER_P ? "p" : "div"
            )),
            d.replace(this.widget.wrapper),
            this.widget.wrapper.move(d)),
          this.focused && (this.widget.focus(), delete this.focused),
          delete this.deflated;
      else {
        var f = this.widget;
        var d = e;
        var c = f.wrapper;
        const b = f.data.align;
        var f = f.data.hasCaption;
        if (d) {
          for (let x = 3; x--; ) c.removeClass(d[x]);
          b == "center"
            ? f && c.addClass(d[1])
            : b != "none" && c.addClass(d[p[b]]);
        } else
          b == "center"
            ? (f
                ? c.setStyle("text-align", "center")
                : c.removeStyle("text-align"),
              c.removeStyle("float"))
            : (b == "none" ? c.removeStyle("float") : c.setStyle("float", b),
              c.removeStyle("text-align"));
      }
    }
    var e = a.config.image2_alignClasses;
    const g = a.config.image2_captionedClass;
    return {
      allowedContent: G(a),
      requiredContent: "img[src,alt]",
      features: H(a),
      styleableElements: "img figure",
      contentTransformations: [["img[width]: sizeToAttribute"]],
      editables: {
        caption: {
          selector: "figcaption",
          allowedContent: "br em strong sub sup u s; a[!href,target]"
        }
      },
      parts: { image: "img", caption: "figcaption" },
      dialog: "image2",
      template: '\x3cimg alt\x3d"" src\x3d"" /\x3e',
      data() {
        let d = this.features;
        this.data.hasCaption &&
          !a.filter.checkFeature(d.caption) &&
          (this.data.hasCaption = !1);
        this.data.align == "none" ||
          a.filter.checkFeature(d.align) ||
          (this.data.align = "none");
        this.shiftState({
          widget: this,
          element: this.element,
          oldData: this.oldData,
          newData: this.data,
          deflate: b,
          inflate: h
        });
        this.data.link
          ? this.parts.link || (this.parts.link = this.parts.image.getParent())
          : this.parts.link && delete this.parts.link;
        this.parts.image.setAttributes({
          src: this.data.src,
          "data-cke-saved-src": this.data.src,
          alt: this.data.alt
        });
        if (this.oldData && !this.oldData.hasCaption && this.data.hasCaption)
          for (var c in this.data.classes) this.parts.image.removeClass(c);
        if (a.filter.checkFeature(d.dimension)) {
          d = this.data;
          d = { width: d.width, height: d.height };
          c = this.parts.image;
          for (const e in d)
            d[e] ? c.setAttribute(e, d[e]) : c.removeAttribute(e);
        }
        this.oldData = CKEDITOR.tools.extend({}, this.data);
      },
      init() {
        const d = CKEDITOR.plugins.image2;
        let c = this.parts.image;
        const b = {
          hasCaption: !!this.parts.caption,
          src: c.getAttribute("src"),
          alt: c.getAttribute("alt") || "",
          width: c.getAttribute("width") || "",
          height: c.getAttribute("height") || "",
          lock: this.ready ? d.checkHasNaturalRatio(c) : !0
        };
        const h = c.getAscendant("a");
        h && this.wrapper.contains(h) && (this.parts.link = h);
        b.align ||
          ((c = b.hasCaption ? this.element : c),
          e
            ? (c.hasClass(e[0])
                ? (b.align = "left")
                : c.hasClass(e[2]) && (b.align = "right"),
              b.align ? c.removeClass(e[p[b.align]]) : (b.align = "none"))
            : ((b.align = c.getStyle("float") || "none"),
              c.removeStyle("float")));
        a.plugins.link &&
          this.parts.link &&
          ((b.link = d.getLinkAttributesParser()(a, this.parts.link)),
          (c = b.link.advanced) &&
            c.advCSSClasses &&
            (c.advCSSClasses = CKEDITOR.tools.trim(
              c.advCSSClasses.replace(/cke_\S+/, "")
            )));
        this.wrapper[`${b.hasCaption ? "remove" : "add"}Class`](
          "cke_image_nocaption"
        );
        this.setData(b);
        a.filter.checkFeature(this.features.dimension) &&
          !0 !== a.config.image2_disableResizer &&
          I(this);
        this.shiftState = d.stateShifter(this.editor);
        this.on("contextMenu", function (a) {
          a.data.image = CKEDITOR.TRISTATE_OFF;
          if (this.parts.link || this.wrapper.getAscendant("a"))
            a.data.link = a.data.unlink = CKEDITOR.TRISTATE_OFF;
        });
      },
      addClass(a) {
        q(this).addClass(a);
      },
      hasClass(a) {
        return q(this).hasClass(a);
      },
      removeClass(a) {
        q(this).removeClass(a);
      },
      getClasses: (function () {
        const a = new RegExp(`^(${[].concat(g, e).join("|")})$`);
        return function () {
          const c = this.repository.parseElementClasses(
            q(this).getAttribute("class")
          );
          let b;
          for (b in c) a.test(b) && delete c[b];
          return c;
        };
      })(),
      upcast: J(a),
      downcast: K(a),
      getLabel() {
        return this.editor.lang.widget.label.replace(
          /%1/,
          `${this.data.alt || ""} ${this.pathName}`
        );
      }
    };
  }
  function J(a) {
    const b = r(a);
    const h = a.config.image2_captionedClass;
    return function (a, g) {
      let d = { width: 1, height: 1 };
      const c = a.name;
      let f;
      if (
        !a.attributes["data-cke-realelement"] &&
        (b(a)
          ? (c == "div" &&
              (f = a.getFirst("figure")) &&
              (a.replaceWith(f), (a = f)),
            (g.align = "center"),
            (f = a.getFirst("img") || a.getFirst("a").getFirst("img")))
          : c == "figure" && a.hasClass(h)
          ? (f = a.find(function (a) {
              return (
                a.name === "img" &&
                CKEDITOR.tools.array.indexOf(["figure", "a"], a.parent.name) !==
                  -1
              );
            }, !0)[0])
          : m(a) && (f = a.name == "a" ? a.children[0] : a),
        f)
      ) {
        for (const D in d)
          (d = f.attributes[D]) && d.match(L) && delete f.attributes[D];
        return a;
      }
    };
  }
  function K(a) {
    const b = a.config.image2_alignClasses;
    return function (a) {
      const e = a.name == "a" ? a.getFirst() : a;
      const g = e.attributes;
      const d = this.data.align;
      if (!this.inline) {
        var c = a.getFirst("span");
        c && c.replaceWith(c.getFirst({ img: 1, a: 1 }));
      }
      d &&
        d != "none" &&
        ((c = CKEDITOR.tools.parseCssText(g.style || "")),
        d == "center" && a.name == "figure"
          ? (a = a.wrapWith(
              new CKEDITOR.htmlParser.element(
                "div",
                b ? { class: b[1] } : { style: "text-align:center" }
              )
            ))
          : d in { left: 1, right: 1 } &&
            (b ? e.addClass(b[p[d]]) : (c.float = d)),
        b ||
          CKEDITOR.tools.isEmpty(c) ||
          (g.style = CKEDITOR.tools.writeCssText(c)));
      return a;
    };
  }
  function r(a) {
    const b = a.config.image2_captionedClass;
    const h = a.config.image2_alignClasses;
    const e = { figure: 1, a: 1, img: 1 };
    return function (g) {
      if (!(g.name in { div: 1, p: 1 })) return !1;
      let d = g.children;
      if (d.length !== 1) return !1;
      d = d[0];
      if (!(d.name in e)) return !1;
      if (g.name == "p") {
        if (!m(d)) return !1;
      } else if (d.name == "figure") {
        if (!d.hasClass(b)) return !1;
      } else if (a.enterMode == CKEDITOR.ENTER_P || !m(d)) return !1;
      return (
        h
          ? g.hasClass(h[1])
          : CKEDITOR.tools.parseCssText(g.attributes.style || "", !0)[
              "text-align"
            ] == "center"
      )
        ? !0
        : !1;
    };
  }
  function m(a) {
    return a.name == "img"
      ? !0
      : a.name == "a"
      ? a.children.length == 1 && a.getFirst("img")
      : !1;
  }
  function I(a) {
    const b = a.editor;
    const h = b.editable();
    const e = b.document;
    const g = (a.resizer = e.createElement("span"));
    g.addClass("cke_image_resizer");
    g.setAttribute("title", b.lang.image2.resizer);
    g.append(new CKEDITOR.dom.text("​", e));
    if (a.inline) a.wrapper.append(g);
    else {
      const d = a.parts.link || a.parts.image;
      const c = d.getParent();
      const f = e.createElement("span");
      f.addClass("cke_image_resizer_wrapper");
      f.append(d);
      f.append(g);
      a.element.append(f, !0);
      c.is("span") && c.remove();
    }
    g.on("mousedown", function (c) {
      function d(a, b, c) {
        const x = CKEDITOR.document;
        const l = [];
        e.equals(x) || l.push(x.on(a, b));
        l.push(e.on(a, b));
        if (c) for (a = l.length; a--; ) c.push(l.pop());
      }
      function t() {
        u = p + k * y;
        v = Math.round(u / w);
      }
      function l() {
        v = r - n;
        u = Math.round(v * w);
      }
      const f = a.parts.image;
      const B = (function () {
        let a = b.config.image2_maxSize;
        let c;
        if (!a) return null;
        a = CKEDITOR.tools.copy(a);
        c = CKEDITOR.plugins.image2.getNatural(f);
        a.width = Math.max(a.width === "natural" ? c.width : a.width, 15);
        a.height = Math.max(a.height === "natural" ? c.height : a.height, 15);
        return a;
      })();
      var k = a.data.align == "right" ? -1 : 1;
      const M = c.data.$.screenX;
      const q = c.data.$.screenY;
      var p = f.$.clientWidth;
      var r = f.$.clientHeight;
      var w = p / r;
      const m = [];
      const E = `cke_image_s${~k ? "e" : "w"}`;
      let C;
      let u;
      let v;
      let z;
      let y;
      let n;
      let A;
      b.fire("saveSnapshot");
      d(
        "mousemove",
        function (a) {
          C = a.data.$;
          y = C.screenX - M;
          n = q - C.screenY;
          A = Math.abs(y / n);
          k == 1
            ? y <= 0
              ? n <= 0
                ? t()
                : A >= w
                ? t()
                : l()
              : n <= 0
              ? A >= w
                ? l()
                : t()
              : l()
            : y <= 0
            ? n <= 0
              ? A >= w
                ? l()
                : t()
              : l()
            : n <= 0
            ? t()
            : A >= w
            ? t()
            : l();
          a = B && (u > B.width || v > B.height);
          u < 15 ||
            v < 15 ||
            a ||
            ((z = { width: u, height: v }), f.setAttributes(z));
        },
        m
      );
      d(
        "mouseup",
        function () {
          for (var c; (c = m.pop()); ) c.removeListener();
          h.removeClass(E);
          g.removeClass("cke_image_resizing");
          z && (a.setData(z), b.fire("saveSnapshot"));
          z = !1;
        },
        m
      );
      h.addClass(E);
      g.addClass("cke_image_resizing");
    });
    a.on("data", function () {
      g[a.data.align == "right" ? "addClass" : "removeClass"](
        "cke_image_resizer_left"
      );
    });
  }
  function N(a) {
    const b = [];
    let h;
    return function (e) {
      const g = a.getCommand(`justify${e}`);
      if (g) {
        b.push(function () {
          g.refresh(a, a.elementPath());
        });
        if (e in { right: 1, left: 1, center: 1 })
          g.on("exec", function (d) {
            let c = k(a);
            if (c) {
              c.setData("align", e);
              for (c = b.length; c--; ) b[c]();
              d.cancel();
            }
          });
        g.on("refresh", function (b) {
          const c = k(a);
          const g = { right: 1, left: 1, center: 1 };
          c &&
            (void 0 === h &&
              (h = a.filter.checkFeature(
                a.widgets.registered.image.features.align
              )),
            h
              ? this.setState(
                  c.data.align == e
                    ? CKEDITOR.TRISTATE_ON
                    : e in g
                    ? CKEDITOR.TRISTATE_OFF
                    : CKEDITOR.TRISTATE_DISABLED
                )
              : this.setState(CKEDITOR.TRISTATE_DISABLED),
            b.cancel());
        });
      }
    };
  }
  function O(a) {
    if (a.plugins.link) {
      const b = CKEDITOR.on("dialogDefinition", function (b) {
        b = b.data;
        if (b.name == "link") {
          b = b.definition;
          const e = b.onShow;
          const g = b.onOk;
          b.onShow = function () {
            const b = k(a);
            const c = this.getContentElement("info", "linkDisplayText")
              .getElement()
              .getParent()
              .getParent();
            b && (b.inline ? !b.wrapper.getAscendant("a") : 1)
              ? (this.setupContent(b.data.link || {}), c.hide())
              : (c.show(), e.apply(this, arguments));
          };
          b.onOk = function () {
            const b = k(a);
            if (b && (b.inline ? !b.wrapper.getAscendant("a") : 1)) {
              const c = {};
              this.commitContent(c);
              b.setData("link", c);
            } else g.apply(this, arguments);
          };
        }
      });
      a.on("destroy", function () {
        b.removeListener();
      });
      a.getCommand("unlink").on("exec", function (b) {
        const e = k(a);
        e &&
          e.parts.link &&
          (e.setData("link", null),
          this.refresh(a, a.elementPath()),
          b.cancel());
      });
      a.getCommand("unlink").on("refresh", function (b) {
        const e = k(a);
        e &&
          (this.setState(
            e.data.link || e.wrapper.getAscendant("a")
              ? CKEDITOR.TRISTATE_OFF
              : CKEDITOR.TRISTATE_DISABLED
          ),
          b.cancel());
      });
    }
  }
  function k(a) {
    return (a = a.widgets.focused) && a.name == "image" ? a : null;
  }
  function G(a) {
    const b = a.config.image2_alignClasses;
    a = {
      div: { match: r(a) },
      p: { match: r(a) },
      img: { attributes: "!src,alt,width,height" },
      figure: { classes: `!${a.config.image2_captionedClass}` },
      figcaption: !0
    };
    b
      ? ((a.div.classes = b[1]),
        (a.p.classes = a.div.classes),
        (a.img.classes = `${b[0]},${b[2]}`),
        (a.figure.classes += `,${a.img.classes}`))
      : ((a.div.styles = "text-align"),
        (a.p.styles = "text-align"),
        (a.img.styles = "float"),
        (a.figure.styles = "float,display"));
    return a;
  }
  function H(a) {
    a = a.config.image2_alignClasses;
    return {
      dimension: { requiredContent: "img[width,height]" },
      align: { requiredContent: `img${a ? `(${a[0]})` : "{float}"}` },
      caption: { requiredContent: "figcaption" }
    };
  }
  function q(a) {
    return a.data.hasCaption ? a.element : a.parts.image;
  }
  const P = new CKEDITOR.template(
    '\x3cfigure class\x3d"{captionedClass}"\x3e\x3cimg alt\x3d"" src\x3d"" /\x3e\x3cfigcaption\x3e{captionPlaceholder}\x3c/figcaption\x3e\x3c/figure\x3e'
  );
  var p = { left: 0, center: 1, right: 2 };
  var L = /^\s*(\d+\%)\s*$/i;
  CKEDITOR.plugins.add("image2", {
    lang: "af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn",
    requires: "widget,dialog",
    icons: "image",
    hidpi: !0,
    onLoad() {
      CKEDITOR.addCss(
        '.cke_image_nocaption{line-height:0}.cke_editable.cke_image_sw, .cke_editable.cke_image_sw *{cursor:sw-resize !important}.cke_editable.cke_image_se, .cke_editable.cke_image_se *{cursor:se-resize !important}.cke_image_resizer{display:none;position:absolute;width:10px;height:10px;bottom:-5px;right:-5px;background:#000;outline:1px solid #fff;line-height:0;cursor:se-resize;}.cke_image_resizer_wrapper{position:relative;display:inline-block;line-height:0;}.cke_image_resizer.cke_image_resizer_left{right:auto;left:-5px;cursor:sw-resize;}.cke_widget_wrapper:hover .cke_image_resizer,.cke_image_resizer.cke_image_resizing{display:block}.cke_editable[contenteditable\x3d"false"] .cke_image_resizer{display:none;}.cke_widget_wrapper\x3ea{display:inline-block}'
      );
    },
    init(a) {
      if (!a.plugins.detectConflict("image2", ["easyimage"])) {
        const b = a.config;
        const h = a.lang.image2;
        const e = F(a);
        b.filebrowserImage2BrowseUrl = b.filebrowserImageBrowseUrl;
        b.filebrowserImage2UploadUrl = b.filebrowserImageUploadUrl;
        e.pathName = h.pathName;
        e.editables.caption.pathName = h.pathNameCaption;
        a.widgets.add("image", e);
        a.ui.addButton &&
          a.ui.addButton("Image", {
            label: a.lang.common.image,
            command: "image",
            toolbar: "insert,10"
          });
        a.contextMenu &&
          (a.addMenuGroup("image", 10),
          a.addMenuItem("image", {
            label: h.menu,
            command: "image",
            group: "image"
          }));
        CKEDITOR.dialog.add("image2", `${this.path}dialogs/image2.js`);
      }
    },
    afterInit(a) {
      const b = { left: 1, right: 1, center: 1, block: 1 };
      const h = N(a);
      let e;
      for (e in b) h(e);
      O(a);
    }
  });
  CKEDITOR.plugins.image2 = {
    stateShifter(a) {
      function b(a, b) {
        let c = {};
        g
          ? (c.attributes = { class: g[1] })
          : (c.styles = { "text-align": "center" });
        c = e.createElement(
          a.activeEnterMode == CKEDITOR.ENTER_P ? "p" : "div",
          c
        );
        h(c, b);
        b.move(c);
        return c;
      }
      function h(b, d) {
        if (d.getParent()) {
          const e = a.createRange();
          e.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START);
          d.remove();
          c.insertElementIntoRange(b, e);
        } else b.replace(d);
      }
      var e = a.document;
      var g = a.config.image2_alignClasses;
      const d = a.config.image2_captionedClass;
      var c = a.editable();
      const f = ["hasCaption", "align", "link"];
      const k = {
        align(c, d, e) {
          const f = c.element;
          c.changed.align
            ? c.newData.hasCaption ||
              (e == "center" && (c.deflate(), (c.element = b(a, f))),
              c.changed.hasCaption ||
                d != "center" ||
                e == "center" ||
                (c.deflate(),
                (d = f.findOne("a,img")),
                d.replace(f),
                (c.element = d)))
            : e == "center" &&
              c.changed.hasCaption &&
              !c.newData.hasCaption &&
              (c.deflate(), (c.element = b(a, f)));
          !g &&
            f.is("figure") &&
            (e == "center"
              ? f.setStyle("display", "inline-block")
              : f.removeStyle("display"));
        },
        hasCaption(b, c, f) {
          b.changed.hasCaption &&
            ((c = b.element.is({ img: 1, a: 1 })
              ? b.element
              : b.element.findOne("a,img")),
            b.deflate(),
            f
              ? ((f = CKEDITOR.dom.element.createFromHtml(
                  P.output({
                    captionedClass: d,
                    captionPlaceholder: a.lang.image2.captionPlaceholder
                  }),
                  e
                )),
                h(f, b.element),
                c.replace(f.findOne("img")),
                (b.element = f))
              : (c.replace(b.element), (b.element = c)));
        },
        link(b, c, d) {
          if (b.changed.link) {
            const f = b.element.is("img")
              ? b.element
              : b.element.findOne("img");
            const g = b.element.is("a") ? b.element : b.element.findOne("a");
            const h = (b.element.is("a") && !d) || (b.element.is("img") && d);
            let k;
            h && b.deflate();
            d
              ? (c ||
                  ((k = e.createElement("a", {
                    attributes: { href: b.newData.link.url }
                  })),
                  k.replace(f),
                  f.move(k)),
                (d = CKEDITOR.plugins.image2.getLinkAttributesGetter()(a, d)),
                CKEDITOR.tools.isEmpty(d.set) || (k || g).setAttributes(d.set),
                d.removed.length && (k || g).removeAttributes(d.removed))
              : ((d = g.findOne("img")), d.replace(g), (k = d));
            h && (b.element = k);
          }
        }
      };
      return function (a) {
        let b;
        let c;
        a.changed = {};
        for (c = 0; c < f.length; c++)
          (b = f[c]),
            (a.changed[b] = a.oldData ? a.oldData[b] !== a.newData[b] : !1);
        for (c = 0; c < f.length; c++)
          (b = f[c]), k[b](a, a.oldData ? a.oldData[b] : null, a.newData[b]);
        a.inflate();
      };
    },
    checkHasNaturalRatio(a) {
      const b = a.$;
      a = this.getNatural(a);
      return (
        Math.round((b.clientWidth / a.width) * a.height) == b.clientHeight ||
        Math.round((b.clientHeight / a.height) * a.width) == b.clientWidth
      );
    },
    getNatural(a) {
      if (a.$.naturalWidth)
        a = { width: a.$.naturalWidth, height: a.$.naturalHeight };
      else {
        const b = new Image();
        b.src = a.getAttribute("src");
        a = { width: b.width, height: b.height };
      }
      return a;
    },
    getLinkAttributesGetter() {
      return CKEDITOR.plugins.link.getLinkAttributes;
    },
    getLinkAttributesParser() {
      return CKEDITOR.plugins.link.parseLinkAttributes;
    }
  };
})();
CKEDITOR.config.image2_captionedClass = "image";
