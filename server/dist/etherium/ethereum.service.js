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
exports.EthereumService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const config_1 = require("../config");
const InsufficientBalance_error_1 = require("../common/error/InsufficientBalance.error");
const Web3 = require("web3");
const EthereumTx = require("ethereumjs-tx").Transaction;
let EthereumService = class EthereumService {
    constructor(ethereumConfig) {
        this.ethereumConfig = ethereumConfig;
        this.web3 = new Web3(new Web3.providers.HttpProvider(ethereumConfig.ethNetwork));
    }
    async transferFund(sendersData, recieverData, amountToSend) {
        var nonce = await this.web3.eth.getTransactionCount(sendersData.address);
        var getBalanceResult = await this.web3.eth.getBalance(sendersData.address);
        if (getBalanceResult.err) {
            throw new InsufficientBalance_error_1.InsufficientBalance("Internal error");
        }
        else {
            var usersBalance = getBalanceResult;
            let balance = this.web3.utils.fromWei(usersBalance, "ether");
            console.log(balance + " ETH");
            if (balance < amountToSend) {
                console.log("insufficient funds");
            }
        }
        let gasPrices = await this.getCurrentGasPrices();
        let details = {
            to: recieverData.address,
            value: this.web3.utils.toHex(this.web3.utils.toWei(amountToSend.toString(), "ether")),
            gas: 21000,
            gasPrice: gasPrices.low * 1000000000,
            nonce: nonce,
            chainId: this.ethereumConfig.chainId
        };
        const transaction = new EthereumTx(details, { chain: this.ethereumConfig.chain });
        let privateKey = sendersData.privateKey.split("0x");
        let privKey = Buffer.from(privateKey[1], "hex");
        transaction.sign(privKey);
        const serializedTransaction = transaction.serialize();
        var transactionResult = await this.web3.eth.sendSignedTransaction("0x" + serializedTransaction.toString("hex"));
        if (transactionResult.err) {
            console.log(transactionResult.err);
            return { error: transactionResult.err };
        }
        else {
            const transactionHash = transactionResult.transactionHash;
            const url = `${this.ethereumConfig.transactionResultURL}/${transactionHash}`;
            console.log(url);
            return { transactionHash, link: url };
        }
    }
    async getCurrentGasPrices() {
        let response = await axios_1.default.get(this.ethereumConfig.ethGasStationURL);
        let prices = {
            low: response.data.safeLow,
            medium: response.data.average,
            high: response.data.fast,
        };
        return prices;
    }
    async getBalance(address) {
        return new Promise((resolve, reject) => {
            this.web3.eth.getBalance(address, async (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(this.web3.utils.fromWei(result, "ether"));
            });
        });
    }
};
EthereumService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(config_1.EthereumConfigModule.KEY)),
    __metadata("design:paramtypes", [void 0])
], EthereumService);
exports.EthereumService = EthereumService;
//# sourceMappingURL=ethereum.service.js.map