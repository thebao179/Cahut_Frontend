/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("checkbox", function (d) {
  return {
    title: d.lang.forms.checkboxAndRadio.checkboxTitle,
    minWidth: 350,
    minHeight: 140,
    getModel(a) {
      return (a = a.getSelection().getSelectedElement()) &&
        a.getAttribute("type") == "checkbox"
        ? a
        : null;
    },
    onShow() {
      const a = this.getModel(this.getParentEditor());
      a && this.setupContent(a);
    },
    onOk() {
      const a = this.getParentEditor();
      let b = this.getModel(a);
      b ||
        ((b = a.document.createElement("input")),
        b.setAttribute("type", "checkbox"),
        a.insertElement(b));
      this.commitContent({ element: b });
    },
    contents: [
      {
        id: "info",
        label: d.lang.forms.checkboxAndRadio.checkboxTitle,
        title: d.lang.forms.checkboxAndRadio.checkboxTitle,
        startupFocus: "txtName",
        elements: [
          {
            id: "txtName",
            type: "text",
            label: d.lang.common.name,
            default: "",
            accessKey: "N",
            setup(a) {
              this.setValue(
                a.data("cke-saved-name") || a.getAttribute("name") || ""
              );
            },
            commit(a) {
              a = a.element;
              this.getValue()
                ? a.data("cke-saved-name", this.getValue())
                : (a.data("cke-saved-name", !1), a.removeAttribute("name"));
            }
          },
          {
            id: "txtValue",
            type: "text",
            label: d.lang.forms.checkboxAndRadio.value,
            default: "",
            accessKey: "V",
            setup(a) {
              a = a.getAttribute("value");
              this.setValue(CKEDITOR.env.ie && a == "on" ? "" : a);
            },
            commit(a) {
              const b = a.element;
              let c = this.getValue();
              !c || (CKEDITOR.env.ie && c == "on")
                ? CKEDITOR.env.ie
                  ? ((c = new CKEDITOR.dom.element("input", b.getDocument())),
                    b.copyAttributes(c, { value: 1 }),
                    c.replace(b),
                    d.getSelection().selectElement(c),
                    (a.element = c))
                  : b.removeAttribute("value")
                : b.setAttribute("value", c);
            }
          },
          {
            id: "cmbSelected",
            type: "checkbox",
            label: d.lang.forms.checkboxAndRadio.selected,
            default: "",
            accessKey: "S",
            value: "checked",
            setup(a) {
              this.setValue(a.getAttribute("checked"));
            },
            commit(a) {
              const b = a.element;
              if (CKEDITOR.env.ie) {
                let c = !!b.getAttribute("checked");
                const e = !!this.getValue();
                c != e &&
                  ((c = CKEDITOR.dom.element.createFromHtml(
                    `\x3cinput type\x3d"checkbox"${
                      e ? ' checked\x3d"checked"' : ""
                    }/\x3e`,
                    d.document
                  )),
                  b.copyAttributes(c, { type: 1, checked: 1 }),
                  c.replace(b),
                  d.getSelection().selectElement(c),
                  (a.element = c));
              } else
                (a = this.getValue()),
                  CKEDITOR.env.webkit && (b.$.checked = a),
                  a
                    ? b.setAttribute("checked", "checked")
                    : b.removeAttribute("checked");
            }
          },
          {
            id: "required",
            type: "checkbox",
            label: d.lang.forms.checkboxAndRadio.required,
            default: "",
            accessKey: "Q",
            value: "required",
            setup: CKEDITOR.plugins.forms._setupRequiredAttribute,
            commit(a) {
              a = a.element;
              this.getValue()
                ? a.setAttribute("required", "required")
                : a.removeAttribute("required");
            }
          }
        ]
      }
    ]
  };
});
