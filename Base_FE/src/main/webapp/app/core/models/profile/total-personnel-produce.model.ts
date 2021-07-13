export class TotalPersonnelProduceModel {
  isPermissionAdd: boolean;
  isPermissionEdit: boolean;
  isPermissionUndo: boolean;
  isPermissionSave: boolean;
  status: number = 1;
  id: number;
  uuid: string;
  isActive: number = 1;

  timeEvaluation: any;
  timeEvaluationStr: any;
  totalPersonnel: number;
  totalBA: number;

  expertBA: number;

  experienceBA: number;

  basicBA: number;

  totalDev: number;

  expertDev: number;

  experienceDev: number;

  basicDev: number;

  totalTest: number;

  expertTest: number;

  experienceTest: number;

  basicTest: number;
  /**
   * 0: VTS
   * 1:
   */
  typePersonnel: number;

  partnerCapacityProfileId: number;

  purpose: string;
}
