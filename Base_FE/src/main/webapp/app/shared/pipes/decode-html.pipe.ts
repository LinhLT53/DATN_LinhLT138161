import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'decodeHtml', pure: false})
export class DecodeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
