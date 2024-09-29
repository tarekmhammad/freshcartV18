import { HttpInterceptorFn } from '@angular/common/http';

export const myhttpInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken: any = {
    token: localStorage.getItem('etoken'),
  };

  if (localStorage.getItem('etoken') !== null) {
    req = req.clone({
      setHeaders: myToken,
    });
  }
  return next(req);
};
