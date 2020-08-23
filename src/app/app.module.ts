import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { LoadingPageRoutingModule } from './Pages/loading/loading-routing.module';
import { LoginPagePageModule } from './Pages/login-page/login-page.module';
import { HomePagePageModule } from './Pages/home-page/home-page.module';

//Pages
import { LoadingPage } from './Pages/loading/loading.page';
import { LoginPagePage } from './Pages/login-page/login-page.page';
import { HomePagePage } from './Pages/home-page/home-page.page';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { SideMenuComponent } from './Components/side-menu/side-menu.component';

//Services
import { GlobalService } from './global.service';

import { from } from 'rxjs';

@NgModule({
  declarations: [
    //Pages
    LoadingPage,
    LoginPagePage,
    HomePagePage,

    //Components
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SideMenuComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    LoadingPageRoutingModule,
    LoginPagePageModule,
    HomePagePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
