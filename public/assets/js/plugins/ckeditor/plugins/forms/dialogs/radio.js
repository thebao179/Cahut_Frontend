/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("radio", function (c) {
  return {
    title: c.lang.forms.checkboxAndRadio.radioTitle,
    minWidth: 350,
    minHeight: 140,
    getModel(a) {
      return (a = a.getSelection().getSelectedElement()) &&
        a.getName() == "input" &&
        a.getAttribute("type") == "radio"
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
        b.setAttribute("type", "radio"),
        a.insertElement(b));
      this.commitContent({ element: b });
    },
    contents: [
      {
        id: "info",
        label: c.lang.forms.checkboxAndRadio.radioTitle,
        title: c.lang.forms.checkboxAndRadio.radioTitle,
        elements: [
          {
            id: "name",
            type: "text",
            label: c.lang.common.name,
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
            id: "value",
            type: "text",
            label: c.lang.forms.checkboxAndRadio.value,
            default: "",
            accessKey: "V",
            setup(a) {
              this.setValue(a.getAttribute("value") || "");
            },
            commit(a) {
              a = a.element;
              this.getValue()
                ? a.setAttribute("value", this.getValue())
                : a.removeAttribute("value");
            }
          },
          {
            id: "checked",
            type: "checkbox",
            label: c.lang.forms.checkboxAndRadio.selected,
            default: "",
            accessKey: "S",
            value: "checked",
            setup(a) {
              this.setValue(a.getAttribute("checked"));
            },
            commit(a) {
              const b = a.element;
              if (CKEDITOR.env.ie) {
                let d = b.getAttribute("checked");
                const e = !!this.getValue();
                d != e &&
                  ((d = CKEDITOR.dom.element.createFromHtml(
                    `\x3cinput type\x3d"radio"${
                      e ? ' checked\x3d"checked"' : ""
                    }\x3e\x3c/input\x3e`,
                    c.document
                  )),
                  b.copyAttributes(d, { type: 1, checked: 1 }),
                  d.replace(b),
                  e && d.setAttribute("checked", "checked"),
                  c.getSelection().selectElement(d),
                  (a.element = d));
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
            label: c.lang.forms.checkboxAndRadio.required,
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
