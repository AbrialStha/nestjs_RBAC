import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import AuthModule from './auth/auth.module';
import AppConfigService from './config/appConfig/app-config.service';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Get Configs for starting app
  const appConfig = await app.get(AppConfigService);

  // Enabled API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  //Enable Cors
  app.enableCors();

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  //Only Implement swagger in dev module
  const env = appConfig.env;
  if (env !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle(`${appConfig.name} API`)
      .setDescription(`all the apis related to ${appConfig.name}`)
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build();

    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        docExpansion: 'none',
        filter: true,
        tagsSorter: (a, b) => {
          if (a == 'Auth' || b == 'Auth') return 1;
          if (a == 'default' || b == 'default') return 1;
          if (a > b) return 1;
          else if (b > a) return -1;
          else return 0;
        },
      },
    };

    const document = SwaggerModule.createDocument(app, config, {
      include: [
        AppModule,
        UsersModule,
        AuthModule,
        //appConfig.appEnv == 'local' && ServerApiModule
      ],
    });
    SwaggerModule.setup('api/docs', app, document, customOptions);
  }

  await app.listen(appConfig.port, () => {
    console.info(
      `=================================================================\n
            ${appConfig.name} App started at 
            PORT:[${appConfig.port}] - ENV: [${appConfig.env}]
      \n=================================================================`,
    );
  });
}
bootstrap();
