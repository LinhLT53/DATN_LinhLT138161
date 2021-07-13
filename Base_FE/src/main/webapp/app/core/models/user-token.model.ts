export class UserPermission {
  resourceCode: string;
}

export class UserMenu {
  code: string;
  name: string;
  parentId: number;
  resourceKey: string;
  sortOrder: number;
  sysMenuId: number;
  url: string;
}

export class UserToken {
  access_token: string;
  employeeCode: string;
  expires_in: number;
  loginName: string;
  phoneNumber: string;
  userId: number;
  loginTime: number;
  tokenExpiresIn: number;
  userPermissionList: UserPermission[];
  userMenuList: UserMenu[];
  userInfo: any;
  avatar: string;

  id: number;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  authorities: any;
  userState: number;
  tenantState: number;
}
