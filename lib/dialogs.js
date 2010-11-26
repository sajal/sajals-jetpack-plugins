let {Cc, Ci} = require("chrome");
let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
let win = wm.getMostRecentWindow("navigator:browser");
//let btoa = win.QueryInterface(Ci.nsIDOMWindowInternal).btoa;
let base64 = require("base64").Base64;

var dialog = '<?xml version="1.0"?> \
<?xml-stylesheet href="chrome://global/skin/" type="text/css"?> \
 \
<dialog \
  xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" \
  id="myDialogId" \
  title="{{TITLE}}" \
  buttons="accept,cancel" \
  buttonlabelcancel="{{CANCEL}}" \
  buttonlabelaccept="{{ACCEPT}}" \
  ondialogaccept="return onOK();" \
  onload="onLoad();" \
  ondialogcancel="return onCancel();" \
  persist="screenX screenY width height" \
  windowtype="myDialogWindowType"> \
 \
  <grid> \
    <columns><column/><column/><column/></columns> \
    <rows> \
      {{ROWS}} \
    </rows> \
  </grid> \
   \
</dialog> \
';

exports.dialog = function(input){

  if (input.title) {
    this.title = input.title;
  } else {
    this.title = "Dialog box";
  }
  this.vars = input.vars;
  console.log(this.vars);
  for (v in this.vars){
    console.log(this.vars[v].name);    
  }
  this.in = {};
  this.out = {};

  this.option = function(){
    this.name = '';
    this.width = '';
    this.value = '';
    this.type = '';
  };
  
  this.show = function(){
    dialog = dialog.replace("{{TITLE}}", this.title)
    var rows = '';
    for (v in this.vars){
      //<row align="center"><label value="var1:"/><textbox id="var1" width="500"/><label value="this is var1"/></row>
      rows += '<row align="center"><label value="' + this.vars[v].label + '"/><textbox id="' + this.vars[v].name + '" width="500"/><label value="' + this.vars[v].helptext + '"/></row>'; 
    }
    dialog = dialog.replace("{{ROWS}}", rows)

    console.log(rows);    
    
//    console.log(base64.encode(dialog));
    params = {};
    url = 'data:application/vnd.mozilla.xul+xml;base64,' + base64.encode(dialog);
    win.openDialog(url, "", "chrome, dialog, modal, resizable=yes", params).focus();
  }
  
  
};