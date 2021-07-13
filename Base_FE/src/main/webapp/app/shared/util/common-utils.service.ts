import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonUtils {
  public static isExcessLimitDecimal(number: number, regex: string, limitDecimal: number): boolean {
    const numStr = number.toString();
    const numSplits = numStr.split(regex);
    if (numSplits.length > 1) {
      if (numSplits[1].length <= limitDecimal) return false;
      else if (numSplits[1].length > limitDecimal) return true;
    }
    return false;
  }

  public static isNullOrEmpty(str: string): boolean {
    return !str || str === '';
  }

  public static isValidId(id: any): boolean {
    if (CommonUtils.isNullOrEmpty(id)) {
      return false;
    }
    return id !== '0';
  }

  public static nvl(value: any, defaultValue = 0): number {
    if (value === null || value === undefined || value === '') {
      return defaultValue;
    }
    return value;
  }

  public static nvlString(value: any, defaultValue = ''): string {
    if (value === null || value === undefined || value === '') {
      return defaultValue;
    }
    return value;
  }

  /**
   * convertData
   */
  public static convertData(data: any): any {
    if (typeof data === typeof true) {
      return CommonUtils.convertToBoolean(data);
    } else if (data === '1') {
      return CommonUtils.convertStringToBoolean(data);
    }
    return data;
  }

  public static convertToBoolean(value: boolean): number {
    return value ? 1 : 0;
  }

  public static convertStringToBoolean(value: string): number {
    return value ? 1 : 0;
  }

  public static convertObjectToArray(obj) {
    const arr = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        arr.push(obj[key]);
      }
    }
    return arr;
  }

  /**
   * tctGetFileSize
   * param files
   */
  public static tctGetFileSize(files) {
    try {
      let fileSize;
      // if (typeof files === typeof []) {
      //   fileSize = files[0].size;
      // } else {
      fileSize = files.size;
      // }
      fileSize /= 1024 * 1024; // chuyen ve MB
      return fileSize.toFixed(2);
    } catch (ex) {
      console.error(ex.message);
    }
  }

  /**
   * copyProperties
   * param dest
   * param orgs
   */
  public static buildParams(obj: any): HttpParams {
    return Object.entries(obj || {}).reduce((params, [key, value]) => {
      if (value === null) {
        return params.set(key, String(''));
      } else if (typeof value === typeof {}) {
        return params.set(key, JSON.stringify(value));
      } else {
        return params.set(key, String(value));
      }
    }, new HttpParams());
  }

  public compareArray(a, b): boolean {
    a = a.sort();
    b = b.sort();
    if (a.length !== b.length) {
      return false;
    } else {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
  }

  public parseErrorBlob(err: HttpErrorResponse): Observable<any> {
    const reader: FileReader = new FileReader();
    const obs = Observable.create((observer: any) => {
      reader.onloadend = e => {
        if (typeof reader.result === 'string') {
          observer.next(JSON.parse(reader.result));
        }
        observer.complete();
      };
    });
    reader.readAsText(err.error);
    return obs;
  }

  // public static isExcessLimitDecimal(number: number, regex: string, limitDecimal: number): boolean {
  //   const numStr = number.toString();
  //   const numSplits = numStr.split(regex);
  //   if (numSplits.length > 1) {
  //     if (numSplits[1].length <= limitDecimal) return false;
  //     else if (numSplits[1].length > limitDecimal) return true;
  //   }
  //   return false;
  // }
}
