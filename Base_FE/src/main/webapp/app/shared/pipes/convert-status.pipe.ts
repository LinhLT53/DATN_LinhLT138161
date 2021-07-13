import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'convertStatus'
})
export class ConvertStatusPipe implements PipeTransform {
  transform(value: string): any {
    if (value === 'ACTIVE') return 'Hoạt động';
    if (value === 'INACTIVE') return 'Không hoạt động';
  }


}
