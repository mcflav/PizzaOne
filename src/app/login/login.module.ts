import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShowHidePasswordModule } from "ngx-show-hide-password";
import { LoginComponent } from "./login.component";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    LoginComponent
  ],

  imports: [
    FormsModule,
    SharedModule,
    ShowHidePasswordModule,
    RouterModule.forChild([{ path: '', component: LoginComponent}])
  ]
})
export class LoginModule{}
