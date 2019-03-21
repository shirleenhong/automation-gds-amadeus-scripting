import { FormControl, Validators } from '@angular/forms';

export class LeisureForm {
    name = new FormControl('', Validators.required);
}