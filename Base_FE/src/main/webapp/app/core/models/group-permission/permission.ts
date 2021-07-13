export class Permission {
  permissionId?: number;
  code: string;
  name: string;
  level?: number;
  parentId?: null;
  description?: null;
  pathId?: number;
  createDate?: null;
  createBy?: null;
  updateDate?: null;
  updateBy?: null;
  isActive?: number;
  permissionChilds?: Permission[];
  hasChild?: boolean
}
