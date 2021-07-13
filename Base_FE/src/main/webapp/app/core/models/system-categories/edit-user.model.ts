export class edituserModel {
    projectId ?: number;
    code?: string;
    name ?: string;
    startDate ?:string;
    endDate ?: string;
    description ?:string;
    partnerId ?: string;
    customerPmName ?:string;
    customerPmEmail ?:string;
    amName?:string;
    amEmail?:string;
    estimatePrelimiinary?:number;
    estimateActual?:number;
    estimateOffer?: number;
    estimateLatch?:number;
    estimateInternal?:number;
    statusOverview?:number;
    statusDetail?:number;
    statusPayment?:number;
    month?:string;
    dateExpected?:string;
    lstAttachDocument :[
        {
            code?:string;
            name?:string;
            path?:string;
        }
    ]
}