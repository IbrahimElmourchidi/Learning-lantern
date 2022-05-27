import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { SnackbarService } from '../shared/services/snackbar.service';
import { BannerComponent } from './components/banner/banner.component';
import { ContactComponent } from './components/contact/contact.component';
import { EnglishComponent } from './components/english/english.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PlanComponent } from './components/plans/plan.component';
import { ServiceItemComponent } from './components/service-item/service-item.component';
import { ServicesListComponent } from './components/service-list/service-list.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EnglishRoutingModule } from './english-routing.module';

@NgModule({
  declarations: [
    EnglishComponent,
    WelcomeComponent,
    HeaderComponent,
    BannerComponent,
    ServicesListComponent,
    ServiceItemComponent,
    PlanComponent,
    ContactComponent,
    FooterComponent,
    SidenavComponent,
  ],
  imports: [EnglishRoutingModule, MaterialModule, CommonModule],
  providers: [SnackbarService],
  exports: [HeaderComponent, FooterComponent],
})
export class EnglishModule {}
