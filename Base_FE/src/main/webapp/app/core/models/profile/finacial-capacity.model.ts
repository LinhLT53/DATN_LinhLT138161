export class FinacialCapacityModel {
  id: number;
  year: string;
  isActive?: number;
  totalAssets: number;
  totalAssetsStr: string;
  uuid: string;
  totalLiabilities: number;
  totalLiabilitiesStr: string;

  shortTermAssets: number;
  shortTermAssetsStr: string;

  totalCurrentLiabilities: number;
  totalCurrentLiabilitiesStr: string;

  revenue: number;
  revenueStr: string;

  profitBeforeTax: number;
  profitBeforeTaxStr: string;

  profitAfterTax: number;
  profitAfterTaxStr: string;

  moreInfo: string;

  staffEvaluation: string;

  scoreAssessment: string;

  note: string;

  partnerCapacityProfileId: number;

  isPermissionAdd: boolean;
  isPermissionEdit: boolean;
  isPermissionUndo: boolean;
  isPermissionSave: boolean;
  status: number = 1;
}
