import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { DataStorageServices } from "./services/data-storage.services";
import { OrdersServices } from "./services/orders.services";
import { UsersServices } from "./services/users.services";

@NgModule({
    providers: [
        DataStorageServices,
        OrdersServices,
        UsersServices,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule{}
