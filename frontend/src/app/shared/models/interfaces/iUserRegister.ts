export interface IUserRegister{
    //these fields will be sent to the server and 
    //we need to get it from the body on api
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    address: string;
}