"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
// app.listen(PORT, "0.0.0.0", function () {
//   console.log(`Started on http://localhost:${PORT}`);
// });
