"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const grpc_options_1 = require("./grpc.options");
let AppController = class AppController {
    constructor() {
        this.logger = new common_1.Logger('AppController');
    }
    onModuleInit() {
        this.grpcService = this.client.getService('AppController');
    }
    async accumulate(data) {
        console.log("\ndata is : ", data);
        this.logger.log(`${process.env.POD_ID} got request in accumulate function `);
        return this.grpcService.accumulate({ data });
    }
    async testGet() {
        return "GET METHOD FOR TEST..!!!!";
    }
    async testSelf() {
        return "SELF....";
    }
};
__decorate([
    microservices_1.Client(grpc_options_1.microserviceOptions),
    __metadata("design:type", Object)
], AppController.prototype, "client", void 0);
__decorate([
    common_1.Post('add'),
    __param(0, common_1.Body('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "accumulate", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testGet", null);
__decorate([
    common_1.Get('self'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testSelf", null);
AppController = __decorate([
    common_1.Controller()
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map