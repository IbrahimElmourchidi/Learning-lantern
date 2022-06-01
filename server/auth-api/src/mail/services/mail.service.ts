import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async sendValidationEmail(
    user: string,
    code: string,
    email: string,
  ): Promise<any> {
    try {
      return this.mailer.sendMail({
        to: email,
        from: 'Learing-Lantern.com',
        subject: 'Welcome To Learning Lantern',
        template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          user: user,
          code: code,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal Server Error(Mail Server Error)',
      );
    }
  }
}
