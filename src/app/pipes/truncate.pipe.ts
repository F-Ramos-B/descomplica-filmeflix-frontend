import { Pipe, PipeTransform } from '@angular/core';
import truncate from 'lodash/truncate';


@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(text: string, length: number): string {
    if (!text || !length) {
      return text;
    }

    return truncate(text, { length });

  }

}
