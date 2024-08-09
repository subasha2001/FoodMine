import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidators = (passwordControlName:string, ComfirmPasswordControlName:string)=>{
    const validator = (form:AbstractControl)=>{
        //validation is done here
        // we should find the passwords controls in the form:AbsCtrl
        const passwordControl = form.get(passwordControlName);
        const confirmPasswordControl = form.get(ComfirmPasswordControlName);
        //comparing  theri values

        if(!passwordControl || !confirmPasswordControl) return

        if(passwordControl.value !== confirmPasswordControl.value){
            confirmPasswordControl.setErrors({notMatch: true}) //we creat results for notMatch in inputValCom
        }else{
            //we need to remove the error msg
            const errors = confirmPasswordControl.errors;
            if(!errors) return;

            delete errors.notMatch;   //delete keyword - removes property from object(notMatch from conPassCtrl)
            confirmPasswordControl.setErrors(errors);
        }
    }
    return validator;
}