export interface SignatureModel {
  id?: number,
  state?: number,
  taxCode?: string,
  signatureType?: number,
  signatureTypeName?: string;
  tenantId?: number,
  tenantBranchId?: number,
  startDate?: Date,
  endDate?: Date,
  serial?: string,
  tenantName?: string,
  tenantBranchName?: string,
  status?: number,
  statusName?: string,
  issuer?: string,
}
