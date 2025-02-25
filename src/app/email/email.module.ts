import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bullmq';
import { EmailService } from './email.service';
import { EmailProcessor } from './email.processor';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    ConfigModule,

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            service: 'Gmail',
            host: configService.get<string>('MAIL_HOST'),
            port: configService.get<number>('MAIL_PORT'),
            secure: configService.get<number>('MAIL_PORT') === 465, // true for port 465, false for 587
            auth: {
              user: configService.get<string>('MAIL_USER'),
              pass: configService.get<string>('MAIL_PASS'),
            },
          },
          defaults: {
            from: `"${configService.get<string>('MAIL_FROM_NAME')}" <${configService.get<string>('MAIL_FROM_ADDRESS')}>`,
          },
          template: {
            dir: process.cwd() + '/src/app/email/templates/',
            adapter: new EjsAdapter(),
            options: {
              strict: false,
            },
          },
        };
      },
    }),

    // Global Redis Connection
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        connection: {
          host: 'oregon-keyvalue.render.com',
          port: 6379,
          password: 'T6yrPucbeImDTkhoiWMpEQqOzCMic3kO',
          tls: {}, // Required for Render Redis
        },
      }),
    }),

    // Register 'email' queue
    BullModule.registerQueueAsync({
      name: 'email',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');

        return {
          connection: {
            url: redisUrl,
            tls: {},
          },
        };
      },
    }),
  ],
  providers: [EmailService, EmailProcessor],
  exports: [EmailService],
})
export class EmailModule {}
