const http = require('http'),
      httpStatus = require('http-status-codes'),
      fs = require('fs'),
      port = 3007;

      const routeMap = {
        "/index": "views/index.html",
        "/index.html": "views/index.html",
        "/views/index.html": "views/index.html",
        "/views/contact.html": "views/contact.html",
        "/error": "views/error.html",
        "/public/css/style.css": "public/css/style.css"
      };
const fsReadFile = (route, res, errorR) => {
  const validator = fs.existsSync(route);
  //console.log(validator ? "Requested url exists" : "Requested url DON'T exist");
  if(validator){
  fs.readFile(route, (error, data) => {
    res.write(data);
    res.end();
  })
} else {
  //console.log("The 404 was called");
  fs.readFile(errorR, (error, data) => {
    res.write(data);
    res.end();
    return;
  })
}

};
      http
      .createServer((req, res) => {
        res.writeHeader(httpStatus.OK, {
          "S": "html"
        });
        const reqRoute = routeMap[req.url];
        const errorRoute = routeMap["/error"];
        //.log(`The requested url was ${req.url}`);
        
        if (reqRoute) {
          fsReadFile(reqRoute, res, errorRoute);          
          } else {
            fsReadFile(errorRoute, res);
            }          
      })
      .listen(port);
      console.log(`Port: ${port}`);

/**
 * const http = require('http'),
      httpStatus = require('http-status-codes'),
      fs = require('fs'),
      port = 3007;

      const routeMap = {
        "/": "views/index.html",
        "/error": "views/error.html"
      };
const fsReadFile = (route, res) => {
  fs.readFile(route, (error, data) => {
    res.write(data);
    res.end();
})
};
      http
      .createServer((req, res) => {
        res.writeHeader(httpStatus.OK, {
          "S": "html"
        });
        const reqRoute = routeMap[req.url];
        const errorRoute = routeMap["/error"];
        //console.log(`The requested url was ${req.url}`);
        if (reqRoute) {
          fsReadFile(reqRoute, res)
          } else {
            fsReadFile(errorRoute, res)
            }          
      })
      .listen(port);
      console.log(`Port: ${port}`);

 */