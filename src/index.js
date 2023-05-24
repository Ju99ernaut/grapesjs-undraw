import loadCommands from "./commands";
import Undraw from "./undraw";
import en from "./locale/en";

export default (editor, opts = {}) => {
  const options = {
    ...{
      i18n: {},
      // default options
      // Endpoint for undraw svgs
      undrawEndpoint:
        "https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/",
      // Handle errors
      undrawError(message) {
        console.warn(message);
      },
      // Modal undraw title
      modalUndrawTitle: "Undraw",
    },
    ...opts,
  };

  // Load i18n files
  editor.I18n &&
    editor.I18n.addMessages({
      en,
      ...options.i18n,
    });

  // Load new APIs
  editor.Undraw = new Undraw(editor, options);

  // Load commands
  loadCommands(editor, options);
};
