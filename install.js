"use strict";

const https = require("follow-redirects").https;
const tar = require("tar");
const shell = require("shelljs");
const version = require("./package.json")["psc-package-version"];
const platform = { win32: "win64", darwin: "macos" }[process.platform] || "linux64";

https.get(
  `https://github.com/purescript/psc-package/releases/download/${version}/${platform}.tar.gz`,
  res => res.pipe(
      tar.x({"C": 'psc-package', strip: 1}).on("finish", () => {
        if (shell.test("-f", "./psc-package/psc-package")) {
          shell.mv("./psc-package/psc-package", "./psc-package/psc-package.exe")
        }
      })
    )
);

