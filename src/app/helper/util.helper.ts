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

}