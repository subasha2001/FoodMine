export class Food{
    id!:string;
    name!:string;
    price!:number;        // !   -->    this is a required field in the form
    tags?:string[];       // ?   -->    this is not a required field in the form
    favorite!:boolean;
    stars!:number;
    imageUrl!:string
    origins!:string[];
    cookTime!:string;
}
