
export class Transactions {
    message:string;
    data:TransactionDetails[]
}


export class TransactionDetails {
    id:number;
    sender:string;
    receiver:string;
    totalAmount:number;
    paidAmount:number;
}