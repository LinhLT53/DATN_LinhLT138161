export class PartnerCapacityProfileModel {
  id: number;
  partnerCode: any;
  partnerName: any;
  partnerShortName: any;
  foundedYear: any;
  groupPartner: any;
  partnerCategory: any;
  registeredBusinessLines: any;
  registeredBusinessAddress: any;
  headQuarter: any;
  city: any;
  totalScore: any;
  note: any;
  contactPointName: any;
  position: any;
  phoneNumber: any;
  email: any;
  ba: any;
  dev: any;
  test: any;

  groupPartnerStr: any;
  partnerCategoryStr: any;
  cityStr: any;
  registeredBusinessLinesList: any[];
  //Nang luc bao mat ATTT
  securityCapacityInfoDtos: any[];
  //Hop dong tuong tu
  similarContractsDtos: any[];
  //Nang luc doi tac
  financialCapacityDtos: any[];
  //Nguon luc doi tac
  partnerResourcesDtos: any[];
  //Tong nhan su san xuat
  totalProductionPersonnelDtos: any[];
  totalProductionPersonnelVTSDtos: any[];
  qualityManagementCapacityDtos: any[];
}
