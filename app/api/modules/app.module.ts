import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OrmDatabaseConfig from '../../../config/orm.database.config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return new OrmDatabaseConfig().getOptions(false);
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
