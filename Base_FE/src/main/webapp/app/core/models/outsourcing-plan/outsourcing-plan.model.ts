import { Moment } from 'moment';

export class OutsourcingPlanModel {
  id: number;
  softwareDevelopmentID: number;
  userCreateID: number;
  startTime: Moment;
  endTime: Moment;
  baNumber: number;
  devNumber: number;
  testNumber: number;
  requireBA: string;
  requireDev: string;
  requireTest: string;
  description: string;
  planCode: string;
  mmos: number;
  outsourceTypeCode: string;
  outsourceTypeName: string;
  planStatus: string;
  projectCode?: string;
  projectName: string;
  pm: string;
  am: string;
  productUnit: string;
  businessUnit: string;
  idProject: number;
  idBusinessUnit: number;
  idProductionUnit: number;
  outsourceTypeID: number;
  fileName: string;
  isFile: number;
  reasonRejection: string;
}
