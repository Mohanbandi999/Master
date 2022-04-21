import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ManagePermissionsComponent } from './components/manage-permissions/manage-permissions.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import {LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VmDetailsComponent } from './components/vm-details/vm-details.component';
import { AddVmComponent } from './components/add-vm/add-vm.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import { TimeSheetComponent } from './components/time-sheet/time-sheet.component';
import { ApproveTimesheetComponent } from './components/approve-timesheet/approve-timesheet.component';
import { ApplyleaveComponent } from './components/applyleave/applyleave.component';
import { ApproveLeaverequestComponent } from './components/approve-leaverequest/approve-leaverequest.component';
import { LeavesListComponent } from './components/leaves-list/leaves-list.component';


const routes: Routes = [
  {
    path:"login",
    component:LoginComponent,
    children: [
      {path:"", redirectTo:"login", pathMatch:"full"},
    ]
  },
  {
    path:"reset-password",
    component:ResetPasswordComponent,
    children: [
      {path:"", redirectTo:"/reset-password", pathMatch:"full"},
    ]
   },
  


  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"login", pathMatch:"full"},    
      //{path:"dashboard", component:DashboardComponent},
      {path:"user-detail",component:UserDetailComponent},
      {path:"dashboard", component:DashboardComponent},
      {path:"alerts", component:AlertsComponent},
      {path:"forms", component:FormsComponent},
      {path:"manage-users", component:ManageUsersComponent},
      {path:"table", component:ProductComponent},
      {path:"grid-list", component:GridListComponent},
      {path:"menu", component:MenuComponent},
      {path:"tabs", component:TabsComponent},
      {path:"expansion", component:ExpansionComponent},
      {path:"chips", component:ChipsComponent},
      {path:"progress", component:ProgressComponent},
      {path:"toolbar", component:ToolbarComponent},
      {path:"progress-snipper", component:ProgressSnipperComponent},
      {path:"snackbar", component:SnackbarComponent},
      {path:"slider", component:SliderComponent},
      {path:"slide-toggle", component:SlideToggleComponent},
      {path:"tooltip", component:TooltipsComponent},
      {path:"button", component:ButtonsComponent},
      {path:"manage-permissions",component:ManagePermissionsComponent},
      {path:"calendar",component:CalendarComponent},
      //{path:"user-detail",component:UserDetailComponent},
      {path:"change-password",component:ChangePasswordComponent},
      {path:"add-user",component:AddUserComponent},
      {path:"login",component:LoginComponent},
      {path:"vm-details",component:VmDetailsComponent},
      {path:"add-vm",component:AddVmComponent},
      {path:"reset-password",component:ResetPasswordComponent},
      {path:"time-sheet",component:TimeSheetComponent},
      {path:"approve-timesheet",component:ApproveTimesheetComponent},
      {path:"applyleave",component:ApplyleaveComponent},
      {path:"approve-leaverequest",component:ApproveLeaverequestComponent},
      {path:"leaves-list",component:LeavesListComponent}

      //{path:"home", component:DashboardComponent},
      //{path:"**", redirectTo:"/home", pathMatch:"full"},
      
    ]
  },
      
  //{path:"", redirectTo:"/home", pathMatch:"full"},
 // {path:"**", redirectTo:"/home", pathMatch:"full"},
];



@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,
    ReactiveFormsModule,CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
