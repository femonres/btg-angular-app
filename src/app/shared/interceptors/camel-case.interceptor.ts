import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class CamelCaseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          const transformedBody = this.camelCaseKeys(event.body);
          return event.clone({ body: transformedBody });
        }
        return event;
      })
    );
  }
  camelCaseKeys(body: any): any {
    if (Array.isArray(body)) {
      return body.map(this.camelCaseKeys.bind(this));
    } else if (typeof body === 'object' && body !== null) {
      return Object.keys(body).reduce((acc: { [key: string]: any }, key: string) => {
        const camelCaseKey = this.toCamelCase(key)
        acc[camelCaseKey] = this.camelCaseKeys(body[key]);
        return acc;
      }, {} as { [key: string]: any });
    }
    return body
  }

  toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
  }  
}
