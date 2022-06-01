import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './services/mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            type: 'oauth2',
            user: config.get('EMAIL'),
            clientId: config.get('CLIENT_ID'),
            clientSecret: config.get('CLIENT_SECRET'),
            refreshToken: config.get('REFRESH_TOKEN'),
          },
        },
        defaults: {
          from: 'Learning Lantern',
        },
        template: {
          dir: './templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
