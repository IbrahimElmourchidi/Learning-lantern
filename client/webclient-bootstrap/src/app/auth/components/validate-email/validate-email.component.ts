import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment as env } from 'src/environments/environment';
@Component({
  selector: 'app-validate-email',
  templateUrl: 'validate-email.component.html',
  styleUrls: ['validate-email.component.scss'],
})
export class ValidateEmailComponent implements OnInit, AfterViewInit {
  constructor(
    private rotuer: Router,
    private route: ActivatedRoute,
    private http: HttpService,
    private tokenService: TokenService
  ) {}
  id!: string;
  code!: string;
  parameters: any;
  ngOnInit(): void {
    this.parameters = this.route.queryParams.subscribe((params) => {
      this.id = params['userId'];
      this.code = params['token'];
    });
    console.log(this.code);
  }
  ngAfterViewInit(): void {
    this.http
      .doPost(
        env.authRoot + 'validate-email',
        {
          userId: this.id,
          token: this.code,
        },
        {}
      )
      .subscribe(
        (res) => {
          const result = res as { Token: string };
          localStorage.setItem('token', result.Token);
          this.tokenService.tokenParser(result.Token);
          this.tokenService.isLoggedIn();
          this.rotuer.navigate(['/']);
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
}
