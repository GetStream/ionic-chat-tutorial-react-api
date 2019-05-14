"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const api = (0, _express.default)();
api.use((0, _cors.default)());
api.use((0, _compression.default)());
api.use((0, _helmet.default)());
api.use(_bodyParser.default.urlencoded({
  extended: true
}));
api.use(_bodyParser.default.json());
api.listen(process.env.PORT, error => {
  if (error) {
    console.warn(error);
    process.exit(1);
  } // eslint-disable-next-line array-callback-return


  _fs.default.readdirSync(_path.default.join(__dirname, 'routes')).map(file => {
    require('./routes/' + file)(api);
  });

  console.info(`Running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode. 🚀`);
});
module.exports = api;