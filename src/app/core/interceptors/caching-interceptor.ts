import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpInterceptor,
  HttpHandler,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

import { RequestCache } from '@core/services/request-cache.service';

/**
 * If request is cashable (e.g., package search) and
 * response is in cache return the cached response as observable.
 * If has 'x-refresh' header that is true,
 * then also re-run the package search, using response from next(),
 * returning an observable that emits the cached response first.
 *
 * If not in cache or not cashable,
 * pass request through to next()
 */
@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    if (!isCashable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);
    // cache-then-refresh
    if (req.headers.get('x-refresh')) {
      const results$ = sendRequest(req, next, this.cache);
      return cachedResponse
        ? results$.pipe(startWith(cachedResponse))
        : results$;
    }
    // cache-or-fetch
    return cachedResponse
      ? of(cachedResponse)
      : sendRequest(req, next, this.cache);
  }
}

function isCashable(req: HttpRequest<unknown>) {
  return req.method === 'GET';
}

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
  req: HttpRequest<unknown>,
  next: HttpHandler,
  cache: RequestCache
): Observable<HttpEvent<unknown>> {
  // No headers allowed in npm search request
  const noHeaderReq = req.clone({ headers: new HttpHeaders() });

  return next.handle(noHeaderReq).pipe(
    tap((event) => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.put(req, event); // Update the cache.
      }
    })
  );
}
