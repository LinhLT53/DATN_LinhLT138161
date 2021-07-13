import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormStoringService {

  constructor() {
  }

  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : '';
  }

  setSession(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getSession(key) {
    const val = sessionStorage.getItem(key);
    return val ? JSON.parse(val) : '';
  }

  clear(key) {
    localStorage.removeItem(key);
  }

  clearSession(key) {
    sessionStorage.removeItem(key);
  }
  getToken(){
    const val = localStorage.getItem('token');
    return val ? val : '';
  }
  getCurrentUserFromToken(){
    const val = localStorage.getItem('user');
    return val ? JSON.parse(val) : '';
  }
}
