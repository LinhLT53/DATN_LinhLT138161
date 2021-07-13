import { AttachDocument } from "app/core/models/project-management/attach-document";

export interface OrganizationCategoriesModel {
  id?: number;
  state?: number;
  group?: string;
  nameGroup?: string;
  orderNumber?: number;
  code?: string;
  name?: string;
  organizationGroup?: number;
  organizationGroupName?: string;
  parentId?: number;
  dataCategoryId?: number;
  parentName?: string;
  description?: string;
  note?: string;
  projectId?: number;
  partnerCode?: string;
  pmName?: string;
  testLeaderName?: string;
  statusOverviewName?: number;
  statusDetailName?: number;
  month?: string;
  createDate?: any;
  customerPmName?: string;
  requireRange?: string;
  amName?: string;
  qmName?: string;
  bmName?: string;
  dateExpected?: string;
  masterPlan?: string;
  estimateLatch?: number;
  estimateActual?: number;
  dateDeliveryKbkt?: string;
  dateActualDelivery?: string;
  estimatePrelimiinary?: number;
  estimateOffer?: number;
  dateSendingPlan?: string;
  startDate?: string;
  endDate?: string;
  dateActualComplete?: string;
  dateDemo?: string;
  baProgress?: number;
  devProgress?: number;
  testProgress?: number;
  docProgress?: number;
  kbktProgress?: number;
  retestOrFixbugProgress?: number;
  lstProjectMember?: any[];
  lstProjectMemberDelete?: any[],
  isActive?: number;
  lstAttachDocument: {
    name?: string;
    createDate?: string;
  }
  statusDetail?: string;
  tableType?: number;
  //lstAttachFile: AttachDocument [];
  cre
}
