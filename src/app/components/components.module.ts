import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { GridListComponent } from './grid-list/grid-list.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ManagePermissionsComponent } from './manage-permissions/manage-permissions.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VmDetailsComponent } from './vm-details/vm-details.component';
import { AddVmComponent } from './add-vm/add-vm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

//Add changes 
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ApproveTimesheetComponent } from './approve-timesheet/approve-timesheet.component';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import { ApproveLeaverequestComponent } from './approve-leaverequest/approve-leaverequest.component';
import { LeavesListComponent } from './leaves-list/leaves-list.component'; 
//End


@NgModule({
  declarations: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    TooltipsComponent,
    ManageUsersComponent,
    CalendarComponent,
    ManagePermissionsComponent,
    UserDetailComponent,
    ChangePasswordComponent,
    AddUserComponent,
    LoginComponent,
    VmDetailsComponent,
    AddVmComponent,
    ResetPasswordComponent,
    TimeSheetComponent,
    ApproveTimesheetComponent,
    ApplyleaveComponent,
    ApproveLeaverequestComponent,
    LeavesListComponent
   
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsModule,
    ReactiveFormsModule,
    //Add changes  
    CalendarModule, 
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory,  
}),
//End
    
  ],
  exports: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
    ManageUsersComponent,
    UserDetailComponent,
    CalendarComponent,
   
  ]
})
export class ComponentsModule { }
