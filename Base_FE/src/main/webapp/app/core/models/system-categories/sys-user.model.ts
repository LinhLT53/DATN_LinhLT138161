export class SysUserModel {
  id?: number;
  code?: string;
  email?: number;
  createDate: Date;
  updateDate: Date;
  delete: string;
  positionId: number;
  positionName: string;
  organizationId: number;
  organizationName: string;
  name?: number;
  note?: string;
  description?: string;
  userGroup?: Array<any>;
}
