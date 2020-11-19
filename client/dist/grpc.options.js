"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
exports.microserviceOptions = {
    transport: microservices_1.Transport.GRPC,
    options: {
        package: 'app',
        protoPath: path_1.join(__dirname, '../src/app.proto'),
    },
};
//# sourceMappingURL=grpc.options.js.map