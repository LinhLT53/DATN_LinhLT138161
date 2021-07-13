import { Moment } from 'moment';
export class MasterPlanModel {


  masterPlanId: number;

  name: string;

  projectId: number;

  dateSendingPlan: String;

  dateDeliveryKBKT: String;

  actualDateDelivery: String;

  endDate: String;

  dateDemo: String;

  lstprojectPlanDTO: any[];

  statusBA: number;

  noteBA: string;

  reasonBA: string;

  statusTest: number;

  noteTest: string;

  reasonTest: string;

  statusPM: number;

  notePM: string;

  reasonPM: string;

  statusQA: number;

  noteQA: string;

  reasonQA: string;

  code: string;

  humanId: number;

  type : number;

  lstValueNew: any[];

  lstValueOld: any[];

}
