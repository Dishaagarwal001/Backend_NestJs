import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      entities: ['dist/**/*.entity.{ts,js}'],
      ssl: {
        rejectUnauthorized: false, // Adjust based on your environment
      },
      synchronize: true, // Never use true in production // use true initially and then seed
      logging: true, // Enable only in development
      type: 'postgres',
      url: 'postgresql://postgres_dev_env_user:dwVI9zwhcjtvuvaogQ0PKVXQlpJNnoD5@dpg-cuu9ct9opnds739utla0-a.oregon-postgres.render.com/postgres_dev_env',
      autoLoadEntities: true,
    };
  }
}
