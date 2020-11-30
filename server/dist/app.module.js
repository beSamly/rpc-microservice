"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const math_service_1 = require("./math.service");
const microservices_1 = require("@nestjs/microservices");
const ethereum_module_1 = require("./etherium/ethereum.module");
const core_1 = require("@nestjs/core");
const loggin_interceptor_1 = require("./common/loggin.interceptor");
const logger_service_1 = require("./common/logger.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: "EVENT_SERVICE",
                    transport: microservices_1.Transport.NATS,
                    options: {
                        url: process.env.NATS_URL || "nats://localhost:4222",
                    },
                },
            ]),
            ethereum_module_1.EthereumModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            math_service_1.MathService,
            logger_service_1.LoggerService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: loggin_interceptor_1.LoggingInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map