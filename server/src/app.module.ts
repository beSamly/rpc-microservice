import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MathService } from "./math.service";
// import { EventStoreModule } from "@juicycleff/nestjs-event-store";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "EVENT_SERVICE",
        transport: Transport.NATS,
        options: {
          url: process.env.NATS_URL || 'nats://localhost:4222',
          // url: 'http://121.166.76.122:39016',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [MathService],
})
export class AppModule {}
