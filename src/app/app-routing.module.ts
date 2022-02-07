import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'orders/:email/:firstname/:lastname/:id', component: OrdersComponent},
    // children: [
    //     //use path below if you use resolver service file to get data dynamically.
    //     // { path: ':id', component: OrderComponent, resolve: {order: OrderResolver} },
    //     { path: ':id/edit', component: EditOrderComponent}
    // ]},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
