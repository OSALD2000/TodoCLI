"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInsideGitRepositiry = void 0;
var child_process_1 = require("child_process");
var isInsideGitRepositiry = function () {
    try {
        (0, child_process_1.execSync)('git rev-parse --is-inside-work-tree');
        return [true, ""];
    }
    catch (_a) {
        return [false, null];
    }
};
exports.isInsideGitRepositiry = isInsideGitRepositiry;
