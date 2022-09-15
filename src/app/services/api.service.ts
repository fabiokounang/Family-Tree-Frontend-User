import { Injectable } from "@angular/core";
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiHttp: string = '';

  errGeneral: string = 'Something went wrong, please try again';

  constructor (private httpClient: HttpClient, private meta: Meta) {
    this.apiHttp = this.meta.getTag('name=api')?.content || '';
  }

  connection(method: string, subHttp: string, data: any = {}, query: string = '', strData = '') {
    const url = subHttp + (strData ? '/' + strData : '') + '?' + query + '&time=' + new Date().getTime();
    console.log(url)
    // const req = new HttpRequest(method, url, data);
    return this.httpClient.post(url, data, { observe: 'body' });
  }
}
