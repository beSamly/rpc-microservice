import { Module } from "@nestjs/common";
// import { ConfigModule } from "@nestjs/config";
import { EthereumService } from "./ethereum.service";
// import { EtheremConfigModule } from "@config";
import { ConfigModule } from "@nestjs/config";
import { EthereumConfigModule } from "../config";

@Module({
  imports: [ConfigModule.forFeature(EthereumConfigModule)],

  providers: [
    {
      provide: "EthereumService",
      useClass: EthereumService,
    },
  ],
  exports: ["EthereumService"],
})
export class EthereumModule {}
