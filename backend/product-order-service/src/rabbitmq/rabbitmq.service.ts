import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from './rabbitmq.module';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject(RABBITMQ_SERVICE) private readonly client: ClientProxy,
  ) {}

  async send(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }

  async emit(pattern: string, data: any) {
    this.client.emit(pattern, data);
  }
}
