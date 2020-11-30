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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const math_service_1 = require("./math.service");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@nestjs/common");
const microservices_2 = require("@nestjs/microservices");
let AppController = class AppController {
    constructor(mathService, client, ethereumService) {
        this.mathService = mathService;
        this.client = client;
        this.ethereumService = ethereumService;
        this.logger = new common_1.Logger("AppController");
    }
    accumulate(numberArray, metadata) {
        this.logger.log(`${process.env.POD_ID} is processing Accumulate function\n`);
        var sum = this.mathService.accumulate(numberArray.data);
        for (var i = 0; i < 7; i++) {
            sum = sum * sum;
        }
        this.client.emit("math_cal", 10);
        console.log("Publishing math_cal event");
        return { sum };
    }
    async testGet() {
        this.client.emit("math_cal", 10);
        return "SERVER SERVICE: emiited math_cal event..!!";
    }
    async transfer() {
        const senderAddress = "0x9C9023D70aE3C186705B08F23D0b23fFf5F72174";
        const senderPrivateKey = "0x4088841030b2d3c624a4ae11b20b5891d35265d283ce3f008ab7551793702ee9";
        const receiverAddress = "0xAD2bF054067d71b0F5aD3d3E0243F25eBA36e0Cb";
        return this.ethereumService.transferFund({ address: senderAddress, privateKey: senderPrivateKey }, { address: receiverAddress }, 0.1);
    }
    async handleMathCal(data) {
        console.log("Handling math_cal event...", data);
    }
};
__decorate([
    microservices_1.GrpcMethod("AppController", "Accumulate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "accumulate", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testGet", null);
__decorate([
    common_1.Get("/transfer"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "transfer", null);
__decorate([
    microservices_2.EventPattern("math_cal"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "handleMathCal", null);
AppController = __decorate([
    common_1.Controller(),
    common_1.Catch(),
    __param(1, common_2.Inject("EVENT_SERVICE")),
    __param(2, common_2.Inject("EthereumService")),
    __metadata("design:paramtypes", [math_service_1.MathService,
        microservices_2.ClientProxy, Object])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map