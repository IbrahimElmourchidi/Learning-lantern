import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment as env } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { ContactUsComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlansComponent } from './components/plans/plans.component';
import { ServiceListComponent } from './components/services/services.component';
import { VideoComponent } from './components/video/video.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HttpService } from './shared/services/http.service';
import { StateService } from './shared/services/state.service';
import { LandingComponent } from './components/landing/landing.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
const socketConfig: SocketIoConfig = {
  url: env.socketRoot,
  options: {
    extraHeaders: {
      Authorization: tokenGetter() as string,
    },
  },
};
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    BannerComponent,
    VideoComponent,
    ServiceListComponent,
    PlansComponent,
    ContactUsComponent,
    FooterComponent,
    NotFoundComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:3000'],
      },
    }),
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [HttpService, StateService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
