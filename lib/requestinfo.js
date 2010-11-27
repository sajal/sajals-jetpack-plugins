const {Cc,Ci,Cu,components} = require("chrome");

function getQuerystring(path){
  // -------------------------------------------------------------------------
  // returns everything after the ? ... if ? is not present, returns blank str
  // -------------------------------------------------------------------------
  var s = path.split('?')
  if (s.length == 1) {
    return "";
  } else {
    return s[1];
  }
}


function getPath(path){
  // -------------------------------------------
  // gets uri minus the hostname and querystring
  // -------------------------------------------
  var s = path.split('?');
  return s[0];
}


function getPostData(subject){
  // -------------------------
  // Gets the body of the POST
  // -------------------------
  subject.QueryInterface(components.interfaces.nsIUploadChannel);
  var postData = subject.uploadStream;
  var stream = Cc["@mozilla.org/binaryinputstream;1"].createInstance(Ci.nsIBinaryInputStream);  
  stream.setInputStream(postData);  
  var postBytes = stream.readByteArray(stream.available());  
  var poststr = String.fromCharCode.apply(null, postBytes);  
  postData.QueryInterface(Ci.nsISeekableStream).seek(Ci.nsISeekableStream.NS_SEEK_SET, 0);
  //removing first 3 lines which is headers...
  var tmpPost = poststr.split("\n");
  tmpPost.shift();
  tmpPost.shift();
  tmpPost.shift();
  poststr = tmpPost.join('\n');
  return poststr;
}

exports.info = function(subject){
  
  var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);

  this.path = getPath(httpChannel.URI.path);
  this.querystring = getQuerystring(httpChannel.URI.path);
  this.postdata = '';
  this.requestMethod = httpChannel.requestMethod;
  if (this.requestMethod == 'POST'){
    this.postdata = getPostData(subject);
  }
  this.url = httpChannel.URI.path;
  this.hostname = httpChannel.URI.host;
  
};
