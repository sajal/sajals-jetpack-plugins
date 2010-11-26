let dialogs = require("dialogs");


console.log(dialogs);
console.log(dialogs.dialog);

d = new dialogs.dialog({
  title: "This is the title",
  acceptbuttontext: "Accept Button",
  cancelbuttontext: "Cancel Button",
  vars: [
    {
      name: "username",
      label: "Username",
      type: "textbox",
      helptext: "enter username here"
    },
    {
      name: "key",
      label: "Key",
      type: "textbox",
      helptext: "Enter key here"
    },
    {
      name: "secret",
      label: "Secret",
      type: "textbox",
      helptext: "shhh! this is secret"
    },
    {
      name: "hosts",
      label: "Hostnames",
      type: "textbox",
      helptext: "enter comma seperated hosts"
    },
    {
      name: "paths",
      label: "Paths",
      type: "textbox",
      helptext: "enter comma seperated paths"
    }
  ]
}
);
console.log(d.title);
d.show();