import { OperatorFunction, interval, throwError, of } from 'rxjs';
import { Observable } from 'rxjs';
import { retryWhen, flatMap } from 'rxjs/operators';

export function http_retry<T>(maxRetry: number = 5, delayMs: number = 2000) {
    return (src: Observable<T>):Observable<T> => src.pipe(
      retryWhen(_ => {
        return interval(delayMs).pipe(
          flatMap(count => count == maxRetry ? throwError("Giving up") : of(count))
        )
      })
    )
  }