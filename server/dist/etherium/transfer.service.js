"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const Web3 = require("web3");
const EthereumTx = require('ethereumjs-tx').Transaction;
const projecjId = `62e420e5c5b6482eb94341bdf32b56d2`;
const ethNetwork = `https://rinkeby.infura.io/v3/${projecjId}`;
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
let TransferService = class TransferService {
    async transferFund(sendersData, recieverData, amountToSend) {
        return new Promise(async (resolve, reject) => {
            var nonce = await web3.eth.getTransactionCount(sendersData.address);
            web3.eth.getBalance(sendersData.address, async (err, result) => {
                if (err) {
                    return reject();
                }
                let balance = web3.utils.fromWei(result, "ether");
                console.log(balance + " ETH");
                if (balance < amountToSend) {
                    console.log("insufficient funds");
                    return reject();
                }
                let gasPrices = await this.getCurrentGasPrices();
                let details = {
                    to: recieverData.address,
                    value: web3.utils.toHex(web3.utils.toWei(amountToSend.toString(), "ether")),
                    gas: 21000,
                    gasPrice: gasPrices.low * 1000000000,
                    nonce: nonce,
                    chainId: 4,
                };
                const transaction = new EthereumTx(details, { chain: "rinkeby" });
                let privateKey = sendersData.privateKey.split("0x");
                let privKey = Buffer.from(privateKey[1], "hex");
                transaction.sign(privKey);
                const serializedTransaction = transaction.serialize();
                web3.eth.sendSignedTransaction("0x" + serializedTransaction.toString("hex"), (err, id) => {
                    if (err) {
                        console.log(err);
                        return reject();
                    }
                    const url = `https://rinkeby.etherscan.io/tx/${id}`;
                    console.log(url);
                    resolve({ id: id, link: url });
                });
            });
        });
    }
    async getCurrentGasPrices() {
        let response = await axios_1.default.get("https://ethgasstation.info/json/ethgasAPI.json");
        let prices = {
            low: response.data.safeLow / 10,
            medium: response.data.average / 10,
            high: response.data.fast / 10,
        };
        return prices;
    }
    async getBalance(address) {
        return new Promise((resolve, reject) => {
            web3.eth.getBalance(address, async (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(web3.utils.fromWei(result, "ether"));
            });
        });
    }
};
TransferService = __decorate([
    common_1.Injectable()
], TransferService);
exports.TransferService = TransferService;
//# sourceMappingURL=transfer.service.js.map