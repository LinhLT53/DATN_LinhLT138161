export interface InvoiceAnnouncementModel {
  id?: number;
  createdBy?: string;
  createdDate?: Date;
  state?: number;
  tenantId?: number;
  tenantBranchId?: number;
  supplierId?: number;
  announcementNo?: string
  announcer?: string;
  supplierTaxCode?: string;
  registrationName?: string;
  name?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  taxReceiveName?: string;
  storeFolderId?: number;
  filePath?: string;
  fileName?: string;
  dateUpload?:string;
  fileContent?: string;
  startDate?: Date;
  endDate?: Date
  approver?: string;
  approveDate?: string;
  approveRequestSender?: string;
  disapproveReason?: string;
  disapproveDate?: Date;
  destroyer?: string;
  destroyDate?: Date;
  destroyerEmail?: string;
  destroyerPhone?: number;
  destroyReason?: string;
  disapprover?: string;
  disapproverEmail?: string;
  disapproverPhone?: number;
  representative?: string;
  fileName32?: string;
  fileContent32?: string;
  fileNameDecision?: string;
  fileContentDecision?: string;
  shortName?: string;
  supplierTaxOfficeId?: number;
  taxOfficeId?: number;
  status?: number;
  decimalPoint?: string;
  separatorPoint?: string;
  description?: string;
  totalReg?: number;
  used?: number;
  usedTotals?: string
}





