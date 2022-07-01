import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from 'src/app/app.module';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-email-sent',
  templateUrl: 'email-sent.component.html',
  styleUrls: ['email-sent.component.scss'],
})
export class EmailSentComponent implements OnInit {
  constructor(
    private http: HttpService,
    private jwtService: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  resendValidationEmail() {
    try {
      if (!this.jwtService.isTokenExpired()) {
        this.http
          .doGet(env.authRoot + 'resend-validation', {
            headers: {
              authorization: 'bearer ' + tokenGetter(),
            },
          })
          .subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        this.router.navigate(['/auth/login']);
      }
    } catch (error) {
      console.log('invalid token');
    }
  }
}
