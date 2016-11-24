/**
 * Created by jarek on 23/11/2016.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule}   from '@angular/forms';

import {AppComponent} from './app.component';
import {Todo} from './todo/todo.component';

import {routing, routedComponents} from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    routedComponents,
    Todo
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}