export class Payment{

  constructor(
    public id:number,
    public holder:string,
    public accountNumber:string,
    public date:string,
    public code:string,
    public nameTransaction: string,
    public price:number){}

}
