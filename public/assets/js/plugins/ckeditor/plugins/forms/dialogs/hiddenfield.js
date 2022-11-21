/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("hiddenfield", function (c) {
  return {
    title: c.lang.forms.hidden.title,
    hiddenField: null,
    minWidth: 350,
    minHeight: 110,
    getModel(a) {
      return (a = a.getSelection().getSelectedElement()) &&
        a.data("cke-real-element-type") &&
        a.data("cke-real-element-type") == "hiddenfield"
        ? a
        : null;
    },
    onShow() {
      const a = this.getParentEditor();
      const b = this.getModel(a);
      b &&
        (this.setupContent(a.restoreRealElement(b)),
        a.getSelection().selectElement(b));
    },
    onOk() {
      var a = this.getValueOf("info", "_cke_saved_name");
      const b = this.getParentEditor();
      var a =
        CKEDITOR.env.ie && CKEDITOR.document.$.documentMode < 8
          ? b.document.createElement(
              `\x3cinput name\x3d"${CKEDITOR.tools.htmlEncode(a)}"\x3e`
            )
          : b.document.createElement("input");
      a.setAttribute("type", "hidden");
      this.commitContent(a);
      var a = b.createFakeElement(a, "cke_hidden", "hiddenfield");
      const c = this.getModel(b);
      c
        ? (a.replace(c), b.getSelection().selectElement(a))
        : b.insertElement(a);
      return !0;
    },
    contents: [
      {
        id: "info",
        label: c.lang.forms.hidden.title,
        title: c.lang.forms.hidden.title,
        elements: [
          {
            id: "_cke_saved_name",
            type: "text",
            label: c.lang.forms.hidden.name,
            default: "",
            accessKey: "N",
            setup(a) {
              this.setValue(
                a.data("cke-saved-name") || a.getAttribute("name") || ""
              );
            },
            commit(a) {
              this.getValue()
                ? a.setAttribute("name", this.getValue())
                : a.removeAttribute("name");
            }
          },
          {
            id: "value",
            type: "text",
            label: c.lang.forms.hidden.value,
            default: "",
            accessKey: "V",
            setup(a) {
              this.setValue(a.getAttribute("value") || "");
            },
            commit(a) {
              this.getValue()
                ? a.setAttribute("value", this.getValue())
                : a.removeAttribute("value");
            }
          }
        ]
      }
    ]
  };
});
