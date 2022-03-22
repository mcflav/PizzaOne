import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { OrdersComponent } from "./orders.component";

@NgModule({
  declarations: [
    OrdersComponent
  ],

  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: OrdersComponent}])
  ]
})
export class OrdersModule{}
