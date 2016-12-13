import { Directive } from '@angular/core';

@Directive({
  selector: '[appMainHeader]',
  template: require('./main-header.directive.html')
})
export class MainHeaderDirective {

  constructor() { }

}
