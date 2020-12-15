"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    console.log(`${process.env.POD_ID} : Client service on port 3000!!! | listening rpc port ${process.env.RPC_SRV_URL}`);
}
bootstrap();
//# sourceMappingURL=main.js.map