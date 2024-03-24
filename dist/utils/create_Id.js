"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createID = void 0;
var createID = function () { return (Math.random() * (new Date()).getMilliseconds()).toString(); };
exports.createID = createID;
