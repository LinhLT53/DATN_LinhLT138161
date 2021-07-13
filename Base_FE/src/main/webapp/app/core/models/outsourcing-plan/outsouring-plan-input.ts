import { Moment } from 'moment';

export class OutsourcingPlanInput {
  private id: number;
  private softwareDevelopmentID: number;
  private userCreateID: number;
  private startTime: Moment;
  private endTime: Moment;
  private baNumber: number;
  private devNumber: number;
  private testNumber: number;
  private requireBA: string;
  private requireDev: string;
  private requireTest: string;
  private description: string;
  private planCode: string;
  private mmos: number;
  private outsourceTypeCode: string;
  private outsourceTypeName: string;
  private planStatus: string;
  private projectCode: string;
  private projectName: string;
  private pm: string;
  private am: string;
  private productUnit: string;
  private businessUnit: string;
  private idProject: number;
  private idBusinessUnit: number;
  private idProductionUnit: number;
  private outsourceTypeID: number;
  private fileName: string;
  private isFile: number;
}
