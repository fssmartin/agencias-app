
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

// export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

//   const ui = inject(UiService);

//   console.log("inteceptoooooo HttpInterceptorFn")

//   ui.showLoading();

//   return next(req).pipe(
//     finalize(() => {
//         ui.hideLoading();
//     })
//   );


// };
