import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = 'assets/data.json';
  constructor(private httpClient: HttpClient) {}

  getContacts(): Observable<any> {
    return this.httpClient.get(this.url);
  }
}
