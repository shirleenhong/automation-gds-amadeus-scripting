export class BusinessRulesFormData {
    controlName: string;
    controlType: string;
    valueType?: string;
    currentValue?: string;
    placeholder?: string;
    options?: Array<{
        optionName: string;
        value: string;
    }>;
    validators?: {
        required?: boolean;
        minlength?: number;
        maxlength?: number;
    };

    constructor(json: any) {
        this.controlName = JSON.parse(json).label;
        this.controlType = JSON.parse(json).type;

        const optionDetails = {
            required: JSON.parse(json).required,
            minlength: JSON.parse(json).minlength,
            maxlength: JSON.parse(json).maxlength
        };
        this.validators = optionDetails;
    }
}
