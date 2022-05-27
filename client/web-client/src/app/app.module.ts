import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeStatusService } from './shared/services/welcome-status.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment as env } from 'src/environments/environment';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const config: SocketIoConfig = {
  url: env.socketURL,
  options: {
    extraHeaders: {
      authorization: tokenGetter() as string,
    },
  },
};

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
      },
    }),
    SocketIoModule.forRoot(config),
  ],
  providers: [WelcomeStatusService],
  bootstrap: [AppComponent],
})
export class AppModule {}
