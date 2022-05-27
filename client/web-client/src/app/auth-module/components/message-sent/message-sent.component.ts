import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/**
 * this component is used to tell the user that a message was sent to his email
 */
@Component({
  selector: 'app-message-sent',
  templateUrl: './message-sent.component.html',
  styleUrls: ['./message-sent.component.scss'],
})
export class MessageSentComponent {
  /** the email of the user  */
  @Input('email') email: string;
  /** the type of the message sent
   *
   * ex: validation email
   */
  @Input('messageType') messageType: string;
  /**
   *
   * the constructor injects the activated route to get the 'email' and
   * 'message type' form the url
   *
   * @param route
   */
  constructor(private route: ActivatedRoute) {
    this.email =
      this.route.snapshot.paramMap.get('email') || 'cannot get email';
    this.messageType =
      this.route.snapshot.paramMap.get('messageType') ||
      'Email Validation Link';
  }
}
