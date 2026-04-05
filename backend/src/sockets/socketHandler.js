const logModel = require("../models/logModel");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("log", (msg) => {
      logModel.createLog(msg);
      io.emit("log", msg);
    });
  });
};
