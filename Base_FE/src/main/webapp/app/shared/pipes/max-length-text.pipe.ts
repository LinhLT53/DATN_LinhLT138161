import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'maxLengthText'
})
export class MaxLengthTextPipe implements PipeTransform {
  transform(value: string, param?: number): any {
    if (value.length <= param) {
      return value
    } else {
      return value.slice(0,param) + " ...";
    }
  }


}
