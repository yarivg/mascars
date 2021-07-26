import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  ButtonsModule,
  InputsModule,
  MDBBootstrapModule,
  NavbarModule,
  TableModule,
  WavesModule
} from 'angular-bootstrap-md';
import {NavbarComponent} from './navbar/navbar.component';
import {CarsTableComponent} from './cars-table/cars-table.component';
import {FormsModule} from '@angular/forms';
import {CarsService} from './services/cars.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBrt3ZmhdbUezZzjLboOL5v6_Tw9_1O8Nw',
  authDomain: 'mascars-a2841.firebaseapp.com',
  projectId: 'mascars-a2841',
  storageBucket: 'mascars-a2841.appspot.com',
  messagingSenderId: '21658851540',
  appId: '1:21658851540:web:3f7d9ce58ca2e2a8e98341',
  measurementId: 'G-3QG794MKNL'
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MDBBootstrapModule.forRoot(),
    AngularFirestoreModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    FormsModule,
    WavesModule,
    TableModule,
    InputsModule
  ],
  providers: [CarsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
