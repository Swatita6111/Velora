import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Run REST API on port 3002
  await app.listen(3002);
  console.log('Product-Order service running on port 3002');
}
bootstrap();
