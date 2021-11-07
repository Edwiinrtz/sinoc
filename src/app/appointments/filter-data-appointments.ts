import { Pipe, PipeTransform } from '@angular/core';
import { Sede } from './appointments-interfaces';

@Pipe({
  name: 'filterUnique',
  pure: false
})

export class UniqueSede implements PipeTransform {

  transform(Array: Sede[]): any[] {
    var newArray = [];
    var lookupObject  = {};

    for(var i in Array) {
       lookupObject[Array[i]["value"]] = Array[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
  }
}
