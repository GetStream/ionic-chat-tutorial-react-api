"use strict";

var _token = require("../controllers/v1/token");

var _controllers = require("../utils/controllers");

module.exports = api => {
  api.route("/v1/token").post((0, _controllers.wrapAsync)(_token.token));
};