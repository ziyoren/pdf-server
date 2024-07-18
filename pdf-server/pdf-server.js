const fs = require("fs");
const url = require("url");
const crypto = require("crypto");
const querystring = require("querystring");
const pdf = require("html-pdf");
const app = require("http").createServer(_handler);
const P = require("./path.json");
const PORT = P.port;
const format = require("date-format");
const PATH = require("path");

app.listen(PORT);

let config = require("./config.json");

if (P.pdf) {
  Object.assign(config, P.pdf);
}

function _handler(req, res) {
  let _url = url.parse(req.url);
  let originalUrl = _url.pathname;

  if ("/" == originalUrl) {
    let buf = fs.readFileSync("./index.html");
    res.write(buf);
    res.end();
  } else if (originalUrl == "/compact-pdf") {
    let body = "";
    req.on("data", function (chunk) {
      body += chunk;
    });

    req.on("end", function () {
      body = querystring.parse(body);

      let html = body.html;
      let no = body.filename || body.no;
      let filename = no || md5(html);

      let save_path = "/tmp/pdf/";
      let fp = PATH.resolve(save_path, `${filename}.pdf`);

      pdf.create(html, config).toFile(fp, function (err, result) {
        if (err) {
          console.log(err);
          result = { error: 4000, message: "出错啦！", original: err };
          res.statusCode = 500;
          res.end(JSON.stringify(result));
        } else {
          fs.chmodSync(result.filename, "777");
          result.error = 0;
          result.filename = result.filename.replace(save_path, "");
          result.message = "PDF生成成功";
          response(res, result);
        }
      });
    });
  } else if (originalUrl == "/html") {
    let buf = fs.readFileSync("./test.html");
    res.write(buf);
    res.end();
  } else if ("/test" == originalUrl) {
    let buf = fs.readFileSync("./test2.html");
    res.write(buf);
    res.end();
  } else if ("/pdf" == originalUrl) {
    createPdf(req, res);
  } else if ("/pdf/down" == originalUrl) {
    createPdf(req, res, true);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end("404 not found.");
  }
}

function createPdf(req, res, down = false) {
  let body = "";
  req.on("data", function (chunk) {
    body += chunk;
  });

  req.on("end", function () {
    body = querystring.parse(body);

    let html = body.html;
    let no = body.filename;
    let filename = no || md5(html);

    pdf.create(html, config).toStream(function (err, stream) {
      if (err) {
        console.log(err);
        result = { error: 4000, message: "出错啦！", original: err };
        res.statusCode = 500;
        res.end(JSON.stringify(result));
      } else {
        let opt = {
          "Content-Type": "application/pdf",
        };
        if (down) {
          opt["Content-Disposition"] = `attachment; filename="${filename}.pdf"`;
        }

        res.writeHead(200, opt);
        stream.pipe(res);
      }
    });
  });
}

function md5(data) {
  data = data || " ";
  let Buffer = require("buffer").Buffer;
  let buf = new Buffer(data);
  let str = buf.toString("binary");
  return crypto.createHash("md5WithRSAEncryption").update(str).digest("hex");
}

function response(res, data, options) {
  let opt = options || {
    "Content-Type": "application/json; charset=utf8",
  };
  res.writeHead(200, opt);
  if ("object" == typeof data) {
    res.write(JSON.stringify(data));
  } else {
    res.write(data);
  }
  res.end();
}

function _log(...data) {
  let t = format.asString("yyyy-MM-dd hh:mm:ss");
  console.log("");
  console.log("[RUNTIME]", t, data);
}
