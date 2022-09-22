import { Injectable } from "@angular/core";
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { MatSnackBar } from "@angular/material/snack-bar";
import httpList from "../utils/http-list";
import { UserInterface } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiHttp: string = '';
  private subHttp: any = httpList;

  errGeneral: string = 'Something went wrong, please try again';

  constructor (private httpClient: HttpClient, private snack: MatSnackBar, private meta: Meta) {
    this.apiHttp = this.meta.getTag('name=api')?.content || '';
  }

  connection(method: string, subHttp: string, data: any = {}, query: string = '', strData = '') {
    const url = this.apiHttp + this.subHttp[subHttp] + (strData ? '/' + strData : '') + '?' + query + '&time=' + new Date().getTime();
    return this.httpClient.post(url, data, { observe: 'body' });
  }
  
  saveToLocalStorage (data: any) {
    console.log(data);
    localStorage.setItem('_id', data._id);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('status', data.status);
    localStorage.setItem('first_name_latin', data.first_name_latin);
    localStorage.setItem('last_name_latin', data.last_name_latin);
    localStorage.setItem('chinese_name', data.chinese_name);
    localStorage.setItem('theme', data.theme);
    localStorage.setItem('no_anggota', data.no_anggota);
  }

  removeLocalStorage () {
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('status');
    localStorage.removeItem('first_name_latin');
    localStorage.removeItem('last_name_latin');
    localStorage.removeItem('chinese_name');
    localStorage.removeItem('theme');
    localStorage.removeItem('no_anggota');
  }

  checkLocalStorage () {
    return localStorage.getItem('_id') && localStorage.getItem('token')&& localStorage.getItem('username') && localStorage.getItem('role') && localStorage.getItem('token');
  }

  getLocalStorageToken () {
    return localStorage.getItem('token');
  }

  getLocalStorageRole () {
    return localStorage.getItem('role');
  }

  getLocalStorageId () {
    return localStorage.getItem('_id');
  }

  getLocalStorageUsername () {
    return localStorage.getItem('username');
  }

  getLocalStorageLatin () {
    return localStorage.getItem('first_name_latin') + ' ' + localStorage.getItem('last_name_latin');
  }

  getLocalStorageChinese () {
    return localStorage.getItem('chinese_name');
  }

  getLocalStorageTheme () {
    return localStorage.getItem('theme');
  }

  getLocalStorageNoAnggota() {
    return localStorage.getItem('no_anggota');
  }

  async callSnack (text: string, action: string) {
    this.snack.open(text, action, {
      duration: 3000
    });
  }

  processErrorHttp (error) {
    const errMsg = error ? error : this.errGeneral;
    this.callSnack(errMsg, 'Dismiss');    
  }
}
