import { Injectable } from '@angular/core';
import{
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { DataStorageServices } from './data-storage.services';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private dataStorageService: DataStorageServices){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
      return this.dataStorageService.user.pipe(
        take(1),
        exhaustMap(user => {
          if(!user){
            return next.handle(req);
          }
          const modifiedReq = req.clone({
            headers: req.headers.set("x-access-token",
                user.token)
          });
          return next.handle(modifiedReq);
        })
      );
    }
}

