const http = require("http");
const fs = require("fs");
const path = require("path");
/* ---------------------------------- PORT ---------------------------------- */
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  /* -------------------------------- FILE PATH ------------------------------- */

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  /* ----------------------------- file extension ----------------------------- */

  let extName = path.extname(filePath);

  /* ------------------------------ content type ------------------------------ */
  /*  default: text/html */
  let contentType = "text/html";
  /* others */

  switch (extName) {
    case ".js": {
      contentType = "text/javascript";
      break;
    }
    case ".css": {
      contentType = "text/css";
      break;
    }
    case ".json": {
      contentType = "application/json";
      break;
    }
    case ".jpg": {
      contentType = "image/jpeg";
      break;
    }
    case ".png": {
      contentType = "image/png";
      break;
    }
  }
  /// file reading

  fs.readFile(filePath, (err, content) => {
    /* ----------------------------- ERROR HANDLING ----------------------------- */
    if (err) {
      /* ----------------------------- PAGE NOT FOUND ----------------------------- */
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        );
        /* ------------------------------ OTHER ERRORS ------------------------------ */
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      /* --------------------------------- SUCCESS -------------------------------- */
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
