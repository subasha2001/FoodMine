import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../../services/loading.service';

// export class LoadingInterceptor {
//   constructor(public loadingservice: LoadingService){}
// }
var pendingRequests = 0;
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingservice = LoadingService;
  // loadingservice.showLoading();
  return next(req);
};
