import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

/**
 * this service is responsible for sending email.
 */
@Injectable()
export class MailService {
  /**
   *
   * The mailer service is defined by nestjs when you configure the MailerModule
   *
   * @param mailer
   */
  constructor(private readonly mailer: MailerService) {}

  /**
   *
   * send the validtion email to the user with the given email
   *
   * @param userId both Id and code are used for validation
   * @param code both Id and code are used for validation
   * @param email the email to which we are sending
   * @returns
   */
  async sendValidationEmail(
    userId: string,
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
          user: userId,
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
