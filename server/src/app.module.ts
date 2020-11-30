import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MathService } from "./math.service";
// import { EventStoreModule } from "@juicycleff/nestjs-event-store";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EthereumModule } from "./etherium/ethereum.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./common/loggin.interceptor";
import { LoggerService } from "./common/logger.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "EVENT_SERVICE",
        transport: Transport.NATS,
        options: {
          url: process.env.NATS_URL || "nats://localhost:4222",
          // url: 'http://121.166.76.122:39016',
        },
      },
    ]),
    EthereumModule,
  ],
  controllers: [AppController],
  providers: [
    MathService,
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
