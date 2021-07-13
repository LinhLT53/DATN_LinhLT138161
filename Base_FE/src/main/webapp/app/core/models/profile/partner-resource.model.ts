export class PartnerResourceModel {
  isPermissionAdd: boolean;
  isPermissionEdit: boolean;
  isPermissionUndo: boolean;
  isPermissionSave: boolean;
  status: number = 1;
  id: number;
  uuid: string;
  isActive: number = 1;

  timeEvaluation: string;

  totalPersonnel: number;

  numberDHCNTTPersonnel: number;

  numberProgrammingCertifiedPersonnel: number;

  numberTestCertifiedPersonnel: number;

  numberQTDACertifiedPersonnel: number;

  trainingProgram: string;

  numberTrainedPersonnel: number;

  staffEvaluation: string;

  scoreEvaluation: string;

  note: string;

  partnerCapacityProfileId: number;
}
