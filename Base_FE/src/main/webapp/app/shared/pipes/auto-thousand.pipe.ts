import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoThousand'
})
export class AutoThousandPipe implements PipeTransform {
  transform(value: any, regex: string): any {
    return this.thousandsSeparators(value, regex);
  }

  thousandsSeparators(num, regex): string {
    if (num) {
      const nums = num.split(regex);
      let resultStr = '';
      for (const n of nums) {
        resultStr = resultStr + n;
      }
      resultStr = resultStr.replace(/\B(?=(\d{3})+(?!\d))/g, regex);
      return resultStr;
    }
    return num;
  }
}
