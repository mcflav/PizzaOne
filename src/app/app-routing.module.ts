import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
    { path: 'orders/:email/:firstname/:lastname/:id', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
    // children: [
    //     //use path below if you use resolver service file to get data dynamically.
    //     // { path: ':id', component: OrderComponent, resolve: {order: OrderResolver} },
    //     { path: ':id/edit', loadChildren: () => import('./orders/edit-order/edit-order.module').then(m => m.EditOrderModule)}
    // ]},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
