import { Injectable, Catch, HttpException, Inject } from "@nestjs/common";
import axios from "axios";
import { EthereumConfigModule } from "../config";
import { InsufficientBalance } from "../common/error/InsufficientBalance.error";
import { ConfigType } from "@nestjs/config";

// Import file with require because of type error.
const Web3 = require("web3");
const EthereumTx = require("ethereumjs-tx").Transaction;

@Injectable()
export class EthereumService {
  private web3;

  constructor(
    @Inject(EthereumConfigModule.KEY)
    private ethereumConfig: ConfigType<typeof EthereumConfigModule>
  ) {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(ethereumConfig.ethNetwork)
    );
  }

  async transferFund(sendersData, recieverData, amountToSend) {
    var nonce = await this.web3.eth.getTransactionCount(sendersData.address);

    // Get balance of sender
    var getBalanceResult = await this.web3.eth.getBalance(sendersData.address);

    if (getBalanceResult.err) {
      throw new InsufficientBalance("Internal error");
    } else {
      var usersBalance = getBalanceResult;

      let balance = this.web3.utils.fromWei(usersBalance, "ether");
      console.log(balance + " ETH");
      if (balance < amountToSend) {
        console.log("insufficient funds");
        // throw new InsufficientBalance("Not sufficient balance");
      }
    }

    // Get currnet gas price
    let gasPrices = await this.getCurrentGasPrices();

    // Set up transaction details
    let details = {
      to: recieverData.address,
      value: this.web3.utils.toHex(
        this.web3.utils.toWei(amountToSend.toString(), "ether")
      ),
      gas: 21000,
      gasPrice: gasPrices.low * 1000000000, //Convert wei to Gwei
      nonce: nonce,
      chainId: this.ethereumConfig.chainId
    };

    // Create transaction
    const transaction = new EthereumTx(details, { chain: this.ethereumConfig.chain});
    let privateKey = sendersData.privateKey.split("0x");
    let privKey = Buffer.from(privateKey[1], "hex");
    transaction.sign(privKey);
    const serializedTransaction = transaction.serialize();

    // Send signed transaction
    var transactionResult = await this.web3.eth.sendSignedTransaction(
      "0x" + serializedTransaction.toString("hex")
    );

    if (transactionResult.err) {
      console.log(transactionResult.err);
      return { error: transactionResult.err };

      // return reject();
    } else {
      const transactionHash = transactionResult.transactionHash;
      const url = `${this.ethereumConfig.transactionResultURL}/${transactionHash}`;
      console.log(url);

      return { transactionHash, link: url };
    }
  }

  async getCurrentGasPrices() {
    let response = await axios.get(this.ethereumConfig.ethGasStationURL);
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
}
