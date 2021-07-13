export class SecurityCapacityModel {
  id: any;
  isActive?: number;

  /**
   * 0: unedit
   * 1: edit
   */
  status: number = 1;

  dataSecurity: string;

  networkSecurity: string;

  note: string;

  physical: string;

  processEnsure: string;

  scoreEvaluation: string;
  isEmptyScoreEvaluation: boolean;

  specifiedProcess: string;

  timeEvaluation: Date;
  timeEvaluationStr: any;
  isEmptyTimeEvaluation: boolean;

  partnerCapacityProfileId: number;

  staffEvaluation: string;

  uuid: string;
  //Quyen them moi nay chi co tac dung khi xoa 1 row moi tinh thi khoi phuc lai quyen khac
  isPermissionAdd: boolean;
  isPermissionEdit: boolean;
  isPermissionUndo: boolean;
  isPermissionSave: boolean;
}
