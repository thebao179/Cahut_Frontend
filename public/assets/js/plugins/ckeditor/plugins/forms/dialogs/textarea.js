/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("textarea", function (b) {
  return {
    title: b.lang.forms.textarea.title,
    minWidth: 350,
    minHeight: 220,
    getModel(a) {
      return (a = a.getSelection().getSelectedElement()) &&
        a.getName() == "textarea"
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
      const c = this.getMode(a) == CKEDITOR.dialog.CREATION_MODE;
      c && (b = a.document.createElement("textarea"));
      this.commitContent(b);
      c && a.insertElement(b);
    },
    contents: [
      {
        id: "info",
        label: b.lang.forms.textarea.title,
        title: b.lang.forms.textarea.title,
        elements: [
          {
            id: "_cke_saved_name",
            type: "text",
            label: b.lang.common.name,
            default: "",
            accessKey: "N",
            setup(a) {
              this.setValue(
                a.data("cke-saved-name") || a.getAttribute("name") || ""
              );
            },
            commit(a) {
              this.getValue()
                ? a.data("cke-saved-name", this.getValue())
                : (a.data("cke-saved-name", !1), a.removeAttribute("name"));
            }
          },
          {
            type: "hbox",
            widths: ["50%", "50%"],
            children: [
              {
                id: "cols",
                type: "text",
                label: b.lang.forms.textarea.cols,
                default: "",
                accessKey: "C",
                style: "width:50px",
                validate: CKEDITOR.dialog.validate.integer(
                  b.lang.common.validateNumberFailed
                ),
                setup(a) {
                  a = a.hasAttribute("cols") && a.getAttribute("cols");
                  this.setValue(a || "");
                },
                commit(a) {
                  this.getValue()
                    ? a.setAttribute("cols", this.getValue())
                    : a.removeAttribute("cols");
                }
              },
              {
                id: "rows",
                type: "text",
                label: b.lang.forms.textarea.rows,
                default: "",
                accessKey: "R",
                style: "width:50px",
                validate: CKEDITOR.dialog.validate.integer(
                  b.lang.common.validateNumberFailed
                ),
                setup(a) {
                  a = a.hasAttribute("rows") && a.getAttribute("rows");
                  this.setValue(a || "");
                },
                commit(a) {
                  this.getValue()
                    ? a.setAttribute("rows", this.getValue())
                    : a.removeAttribute("rows");
                }
              }
            ]
          },
          {
            id: "value",
            type: "textarea",
            label: b.lang.forms.textfield.value,
            default: "",
            setup(a) {
              this.setValue(a.$.defaultValue);
            },
            commit(a) {
              a.$.value = a.$.defaultValue = this.getValue();
            }
          },
          {
            id: "required",
            type: "checkbox",
            label: b.lang.forms.textfield.required,
            default: "",
            accessKey: "Q",
            value: "required",
            setup: CKEDITOR.plugins.forms._setupRequiredAttribute,
            commit(a) {
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
