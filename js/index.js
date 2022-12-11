"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileAppender = exports.BulkFileWriter = exports.LineReader = exports.FReader = exports.FWriter = exports.FileClass = void 0;
const filec_1 = require("./filec");
Object.defineProperty(exports, "FileClass", { enumerable: true, get: function () { return filec_1.FileClass; } });
const reader_1 = require("./reader");
Object.defineProperty(exports, "FReader", { enumerable: true, get: function () { return reader_1.FReader; } });
Object.defineProperty(exports, "LineReader", { enumerable: true, get: function () { return reader_1.LineReader; } });
const writer_1 = require("./writer");
Object.defineProperty(exports, "BulkFileWriter", { enumerable: true, get: function () { return writer_1.BulkFileWriter; } });
Object.defineProperty(exports, "FileAppender", { enumerable: true, get: function () { return writer_1.FileAppender; } });
Object.defineProperty(exports, "FWriter", { enumerable: true, get: function () { return writer_1.FWriter; } });
exports.default = filec_1.FileClass;
