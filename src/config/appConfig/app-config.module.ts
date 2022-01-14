import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import AppConfigService from './app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string(),
        APP_ENV: Joi.string()
          .valid('dev', 'local', 'prod', 'stage', 'uat')
          .default('dev'),
        APP_PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string(),
        JWT_EXPIRES_IN: Joi.string().default('60s'),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export default class AppConfigModule {}
