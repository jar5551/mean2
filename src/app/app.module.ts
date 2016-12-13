import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';

import {routing, routedComponents} from './app.routing';
import {MainHeaderDirective} from './directives/main-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routedComponents,
    MainHeaderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
