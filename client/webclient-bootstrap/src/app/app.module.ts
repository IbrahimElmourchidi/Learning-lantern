import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { ContactUsComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PlansComponent } from './components/plans/plans.component';
import { ServiceListComponent } from './components/services/services.component';
import { VideoComponent } from './components/video/video.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { HttpService } from './shared/services/http.service';
import { StateService } from './shared/services/state.service';

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
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [HttpService, StateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
