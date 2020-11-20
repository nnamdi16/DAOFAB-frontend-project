export class TransactionDetails {
    id:number = 0;
    sender:string = "";
    receiver:string = "";
    totalAmount:number = 0;
    paidAmount:number = 0;
}

export class ChildTransaction {
    id: number = 0;
    parentId:number = 0;
    paidAmount: number = 0;
}

export class PaginationDetails {
    // constructor(totalItems) {
    //     this.totalItems = totalItems;
    // }
    totalItems: number = 0;
    currentPage: number = 0;
    totalPages: number = 0;
    startPage: number = 0;
    endPage: number = 0;
    startIndex: number = 0;
    endIndex: number = 0;
    pages:number[]=[];
}


export class Transactions  {
    message:string;
    data:Array<TransactionDetails>;
    paginationResponse:PaginationDetails;
    constructor(message="", paginationResponse = new PaginationDetails(), data=[new TransactionDetails]) {
        this.paginationResponse = paginationResponse;
        this.message = message;
        this.data = data;
    }
}


export class ChildTransactionDetails {
    message:string;
    data: Array<ChildTransaction>;
    constructor(message="", data = [new ChildTransaction] ) {
        this.message = message;
        this.data = data;
    }
}