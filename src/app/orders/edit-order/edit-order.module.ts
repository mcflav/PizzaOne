import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { EditOrderComponent } from "./edit-order.component";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    EditOrderComponent
  ],

  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: EditOrderComponent}])
  ]
})
export class EditOrderModule{}
