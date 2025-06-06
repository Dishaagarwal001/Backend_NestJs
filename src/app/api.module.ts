import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ErrorsFilter } from 'src/core/filters/exception.filter';
import { SuccessResponseInterceptor } from 'src/core/interceptor/success-response.interceptor';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './categories/category.module';
import { MaterialModule } from './material/material.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BrandModule,
    EmailModule,
    CategoryModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorsFilter,
    },
  ],
})
export class ApiModule {}
