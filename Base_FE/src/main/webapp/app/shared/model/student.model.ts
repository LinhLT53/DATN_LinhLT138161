import { Moment } from 'moment';

export interface IStudent {
  id?: number;
  name?: string;
  birthday?: Moment;
  address?: string;
}

export class Student implements IStudent {
  constructor(public id?: number, public name?: string, public birthday?: Moment, public address?: string) {}
}
