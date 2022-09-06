import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseOptionsRequest } from '../models/base-options-request.model';
import { Options } from '../models/options.model';


@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private baseApiUrl;

  constructor(private readonly httpClient: HttpClient) {
    this.baseApiUrl = environment.api.url;
  }

  public get<T>(
    endpointUrl: string,
    searchParams?: BaseOptionsRequest,
  ): Observable<T> {
    const options = this.getOptions(searchParams);

    return this.httpClient.get<T>(`${this.baseApiUrl}${endpointUrl}`, options);
  }

  public save(
    endPointUrl: string,
    requestBody: any,
    headers?: HttpHeaders,
    searchParams?: BaseOptionsRequest
  ): Observable<any> {
    const options = this.getOptions(searchParams, headers);
    return this.httpClient.post(`${this.baseApiUrl}${endPointUrl}`, requestBody, options);
  }

  public update(
    endPointUrl: string,
    requestBody: any,
    searchParams?: BaseOptionsRequest
  ): Observable<any> {
    const options = this.getOptions(searchParams);
    return this.httpClient.put(`${this.baseApiUrl}${endPointUrl}`, requestBody, options);
  }

  public remove(
    endPointUrl: string,
    searchParams?: BaseOptionsRequest
  ): Observable<any> {
    const options = this.getOptions(searchParams);
    return this.httpClient.delete(`${this.baseApiUrl}${endPointUrl}`, options);
  }

  private getOptions(searchParams?: BaseOptionsRequest, httpHeaders?: HttpHeaders): Options {
    const options: Options = {};
    const params = searchParams ? this.getSearchParams(searchParams) : null;
    const headers = httpHeaders ? httpHeaders : null;

    if (params) {
      options.params = params;
    }

    if (headers) {
      options.headers = headers;
    }

    return options;
  }

  private getSearchParams(searchParams: any): HttpParams {
    let params = new HttpParams();

    for (const prop in searchParams) {
      if (![undefined, '', null].includes(searchParams[prop])) {
        params = params.set(prop, searchParams[prop].toString());
      }
    }

    return params;
  }
}
