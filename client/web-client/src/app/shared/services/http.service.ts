import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  doGet(url: string, options: {}) {
    return this.http.get(`${url}`, options);
  }

  doPost(url: string, body: {}, options: {}) {
    return this.http.post(`${url}`, body, options);
  }

  doPatch(url: string, options: {}) {
    return this.http.patch(`${url}`, options);
  }

  doDelete(url: string, options: {}) {
    return this.http.delete(`${url}`, options);
  }
}
