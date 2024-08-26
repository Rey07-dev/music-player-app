import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../../environments/environment";


export const addHeader: HttpInterceptorFn = (request, next) =>{
  if (request.url.startsWith(environment.innoBasicUrl)) {
    let cloneReq = request.clone({
      setHeaders: {
        "X-APN": environment.xAPN,
      },
    });
    return next(cloneReq);
  }
  return next(request);
}
