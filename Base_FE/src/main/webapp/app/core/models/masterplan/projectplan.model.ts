import { Moment } from 'moment';
export class ProjectPlanModel {


    projectPlanId: number;

    planCode: string;

    planName: string;

    projectId: number;

    startDate: Date;

    endDate: Date;

    deadline: Date;

    module: number;

    mileStone: string;

    humanResourceId: number;

    createDate: Date;

    createBy: number;

    updateDate: Date;

    updateBy: number;
    isActive: number;

    description: string;

}
