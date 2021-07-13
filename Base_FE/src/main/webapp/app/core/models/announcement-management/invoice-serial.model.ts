import {Moment} from 'moment';

export interface InvoiceSerialModel {
  idd?: number;
  state?: number;
  createdDate?: Moment;
  tenantId?: number;
  tenantBranchId?: number;
  invoiceGroup?: string;
  invoiceTypeId?: string;
  serialNo?: string;
  description?: string;
  invoiceTemplateId?: number;
  invoiceTemplateName?: string;
  status?: number;
}
