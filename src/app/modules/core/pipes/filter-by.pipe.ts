import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(list: any[], key: string, value: number | string | null, notEqual = false): any[] {
    if (!list.length) return list;

    return list.filter(item => notEqual ? item[key] !== value : item[key] === value);
  }
}
