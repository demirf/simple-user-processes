import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { config } from 'dotenv';

config();

export default class OrmDatabaseConfig {
  getOptions(importPaths = true): ConnectionOptions {
    const configService = new ConfigService();
    const paths = importPaths ? {
      migrations: [`${path.resolve()}/app/api/database/migrations/**/*{.ts,.js}`],
      entities: [`${path.resolve()}/app/api/modules/**/entities/**/*.entity{.ts,.js}`],
    } : {};

    const defaultSettings = {
      logging: true,
      type: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: configService.get('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DATABASE'),
      autoLoadEntities: true,
      synchronize: false,
    };

    return { ...defaultSettings, ...paths } as ConnectionOptions;
  }
}
