import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the admin interface
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Set global prefix for API routes
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3001);
  console.log(
    `🚀 Backend server running on: http://localhost:${process.env.PORT ?? 3001}/api`,
  );
}
bootstrap();
