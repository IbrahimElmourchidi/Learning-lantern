import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private http: HttpService
  ) {}
  id!: string;
  code!: string;
  parameters: any;
  ngOnInit(): void {
    this.parameters = this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.code = params['code'];
    });
  }
  ngAfterViewInit(): void {
    this.http
      .doPost(
        env.authRoot + '/validate-email',
        {
          userId: this.id,
          validationCode: this.code,
        },
        {}
      )
      .subscribe(
        (res) => {
          const result = res as { token: string };
          localStorage.setItem('token', result.token);
          this.rotuer.navigate(['/']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
