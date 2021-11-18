import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { LoggingService } from './logging.service';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<unknown>;
  lastRead: number;
}

export abstract class RequestCache {
  abstract get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined;
  abstract put(
    req: HttpRequest<unknown>,
    response: HttpResponse<unknown>
  ): void;
  abstract clear(): void;
}

const maxAge = 60000 * 15; // maximum cache age (ms) 15 min

@Injectable()
export class RequestCacheWithMap implements RequestCache {
  cache = new Map<string, RequestCacheEntry>();

  constructor(private logger: LoggingService) {}

  get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < Date.now() - maxAge;
    const expired = isExpired ? 'expired ' : '';

    this.logger.info(`Found ${expired} cached response for "${url}".`);
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<unknown>, response: HttpResponse<unknown>): void {
    const url = req.urlWithParams;
    this.logger.info(`Caching response from "${url}".`);

    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    // remove expired cache entries
    const expired = Date.now() - maxAge;
    this.cache.forEach((entry) => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });

    this.logger.info(`Request cache size: ${this.cache.size}.`);
  }

  clear(): void {
    this.cache.forEach((entry) => {
      {
        this.cache.delete(entry.url);
      }
    });

    this.logger.info(`Clear request cache. Size is: ${this.cache.size}.`);
  }
}
