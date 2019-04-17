import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})

export class UtilHelper {
    modelCopy(src, target) {
        for (const prop in src) {
            if (src.hasOwnProperty(prop)) {
                target[prop] = src[prop];
            }
        }
    }


    getRegexValue(freeText: string, expression: RegExp) {
        if (expression.test(freeText)) {
            for (let result = expression.exec(freeText); result !== null;
                result = expression.exec(freeText)) {
                return result[0];
            }
        }
        return '';
    }

}