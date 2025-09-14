import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { spawn } from 'child_process';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Run gateway API on port from .env
  const port = process.env.GATEWAY_PORT || 3000;
  await app.listen(port);
  console.log(`Gateway running on http://localhost:${port}`);

  // Spawn Customer Service
  spawnService(process.env.CUSTOMER_SERVICE_PATH!, 'Customer-Service');

  // Spawn Product-Order Service
  spawnService(process.env.PRODUCT_ORDER_SERVICE_PATH!, 'Product-Order-Service');
}

function spawnService(path: string, name: string) {
  const service = spawn('npm', ['run', 'start:dev'], { cwd: path, shell: true });

  service.stdout.on('data', (data) => console.log(`[${name}] ${data}`));
  service.stderr.on('data', (data) => console.error(`[${name} ERROR] ${data}`));
  service.on('close', (code) => console.log(`[${name}] exited with code ${code}`));
}

bootstrap();
