import {Observable} from "rxjs";

export class ProjectMember {
  projectMemberId: number;
  humanResourceId: number;
  projectId: number;
  role: string;
  department: string;
  dateJoin: Date;
  dateOut: Date;
  resources: number;
  resourcesUsed: number;
  noJoin: number;
  firstName:string;
  username:string;
  listUnit2$ ?: Observable<any[]>;
  isActive:number;
}
