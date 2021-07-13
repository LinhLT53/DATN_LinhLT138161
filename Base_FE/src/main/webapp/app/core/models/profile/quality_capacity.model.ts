export class QualityCapacityModel {
  isPermissionAdd: boolean;
  isPermissionEdit: boolean;
  isPermissionUndo: boolean;
  isPermissionSave: boolean;
  status: number = 1;
  id: number;
  uuid: string;
  isActive: number = 1;

  partnerCapacityProfileId: number;
  assessGrowth: string;
  projectManagerTool: string;

  measurementCriteria: string;
  scoreEvaluate: number;
  note: string;
  timeEvaluation: any;
  timeEvaluationStr: any;

  staffEvaluation: string;
  reportingMechanism: string;
}
