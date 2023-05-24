export default (editor, opts = {}) => {
  const cm = editor.Commands;
  const md = editor.Modal;
  const pfx = editor.getConfig("stylePrefix");
  const mdlClassLg = `${pfx}mdl-dialog-ud`;

  cm.add("undraw", {
    run(editor, sender) {
      const mdlDialog = document.querySelector(`.${pfx}mdl-dialog`);
      mdlDialog.classList.add(mdlClassLg);
      sender?.set && sender.set("active");
      md.setTitle(opts.modalUndrawTitle);
      md.setContent(editor.Undraw.render());
      md.open();
      md.getModel().once("change:open", () => {
        mdlDialog.classList.remove(mdlClassLg);
      });
    },
  });
};
