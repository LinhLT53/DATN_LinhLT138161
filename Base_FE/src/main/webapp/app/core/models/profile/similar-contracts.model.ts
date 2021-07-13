export class SimilarContractsModel {
  id: any;
  isActive: number = 1;
  uuid: string;
  isEdited: boolean = true;

  customerName: string;
  isEmptyCustomerName: boolean = true;

  customerAddress: string;
  isEmptyCustomerAddress: boolean = true;

  customerPhoneNumber: string;
  isEmptyCustomerPhoneNumber: boolean = true;

  contractName: string;
  isEmptyContractName: boolean = true;

  contractNum: string;
  isEmptyContractNum: boolean = true;
  dateSignContract: Date;
  dateSignContractStr: string;

  dateEndContract: Date;
  dateEndContractStr: string;

  productProvider: string;

  contractValue: number;
  contractValueStr: string;
  isEmptyContractValue: boolean = true;

  implementationScale: string;

  bidParticipants: string;

  moreInfo: string;

  staffEvaluation: string;

  scoreEvaluation: number;
  scoreEvaluationStr: string;
  isEmptyScoreEvaluation: boolean = true;

  note: string;
  partnerCapacityProfileId: number;

  isPermissionEdit: boolean;
  isPermissionUndo: boolean;
  isPermissionSave: boolean;
  status: number = 1;
}
