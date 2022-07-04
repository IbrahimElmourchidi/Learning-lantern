import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { ContactUsComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlansComponent } from './components/plans/plans.component';
import { ServiceListComponent } from './components/services/services.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { HttpService } from './shared/services/http.service';
import { StateService } from './shared/services/state.service';
import { LandingComponent } from './components/landing/landing.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { PlaceHolderDirective } from './shared/directeives/placeholder.directive';
import { NotifySerivce } from './shared/services/notify.service';
import { ChatService } from './classroom/services/chat.service';
import { ChatSocket } from './shared/sockets/sockets.service';
import { VerifiedGuard } from './shared/guards/verified.guard';
import { TokenService } from './shared/services/token.service';
import { CalendarComponent } from './classroom/compnents/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
]);
export function tokenGetter() {
  return localStorage.getItem('token');
}
// const socketConfig: SocketIoConfig = {
//   url: env.socketRoot,
//   options: {
//     extraHeaders: {
//       Authorization: tokenGetter() as string,
//     },
//   },
// };
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    BannerComponent,
    CalendarComponent,
    ServiceListComponent,
    PlansComponent,
    ContactUsComponent,
    FooterComponent,
    NotFoundComponent,
    LandingComponent,
    // shared components
    AlertComponent,
    PlaceHolderDirective,
  ],
  imports: [
    FullCalendarModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['learning-lantern.azurewebsites.net', '0.0.0.0:3005'],
        authScheme: 'Bearer ', // Default value
      },
    }),
  ],
  providers: [
    HttpService,
    StateService,
    AuthGuard,
    VerifiedGuard,
    NotifySerivce,
    ChatService,
    ChatSocket,

    TokenService,
  ],
  bootstrap: [AppComponent],
  // entryComponents[vi]
})
export class AppModule {}
