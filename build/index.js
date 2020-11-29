"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
server_1.createServer().then(server_1.startServer)
    .catch(function (error) {
    console.error(error);
});
