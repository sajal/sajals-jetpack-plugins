usage :-

    let requestinfo = require("requestinfo");
    let observer = require("observer-service");

    function callback(subject, data) {
      var req = new requestinfo.info(subject);
      console.log(req.path);
      console.log(req.querystring);
      console.log(req.postdata);
      console.log(req.requestMethod);
      console.log(req.url);
      console.log(req.hostname);
    }

    observer.add('http-on-modify-request', callback);