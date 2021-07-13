import { Moment } from 'moment';

export interface ContractManagerModel {
  id?: number;
  uuid?: string;
  createDate?: string;
  updateDate?: string;
  createUser?: number;
  userModifyId?: number;
  isActive?: string;
  contractCode?: string;
  partnerId?: string;
  signatureStatus?: number;
  ttrpakdNumber?: string;
  contractStatus?: number;
  contractType?: number;
  startTime?: string;
  endTime?: string;
  totalMM?: number;
  totalMMPayed?: number;
  price?: number;
  contractValue?: number;
  getContractDescription?: string;
  note?: string;
  dtoBase?: string;
  appraisalStatus?: number;
}
