"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const dotenv = require("dotenv");
const config_1 = require("./config");
dotenv.config();
const logger = new common_1.Logger("Main");
const rpcOptions = {
    transport: microservices_1.Transport.GRPC,
    options: {
        package: "app",
        protoPath: path_1.join(__dirname, "../src/app.proto"),
        url: process.env.RPC_HOST || "localhost:50051",
    },
};
const natsOptions = {
    transport: microservices_1.Transport.NATS,
    name: "EVENT_SERVICE",
    options: {
        url: "http://127.0.0.1:4222",
        user: "admin",
        pass: "password",
        queue: "test_queue",
        clusterId: "clusteid",
        clientId: "clietnId",
    },
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const rpcMicroservice = app.connectMicroservice(rpcOptions);
    await app.startAllMicroservicesAsync();
    await app.listen(process.env.PORT || 3001);
    console.log("service is running at port : ", process.env.PORT || 3001, " nats url : ", process.env.NATS_URL || "nats://localhost:4222");
    console.log("conigomidel : ", config_1.EthereumConfigModule());
}
bootstrap();
//# sourceMappingURL=main.js.map