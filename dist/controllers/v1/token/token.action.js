"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _streamChat = require("stream-chat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

exports.token = async (req, res) => {
  try {
    const data = req.body;
    const client = new _streamChat.StreamChat(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);
    const user = Object.assign({}, data, {
      id: (0, _v.default)(),
      role: 'admin',
      image: `https://robohash.org/${data.email}?gravatar=yes`
    });
    const token = client.createToken(user.id);
    await client.updateUsers([user]);
    res.status(200).json({
      user,
      token
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};