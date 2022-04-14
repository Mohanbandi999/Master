import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {AngularFireStorageReference,AngularFireUploadTask,BUCKET} from "@angular/fire/compat/storage";
import { CommonModule } from '@angular/common';
 //import { TimeSheetComponent } from './time-sheet/time-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
   // TimeSheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,  
    AngularFireModule.initializeApp(environment.firebase,"cloud"),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CommonModule,
  ],
  providers: [{ provide: BUCKET, useValue: environment.firebase.storageBucket }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class AppModule { }
