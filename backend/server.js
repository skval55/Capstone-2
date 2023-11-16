"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`Started on http://127.0.0.1:${PORT}`);
});
