"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, "localhost", function () {
  console.log(`Started on http://localhost:${PORT}`);
});
