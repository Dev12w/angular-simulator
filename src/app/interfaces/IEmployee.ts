import { IUser } from './IUser';
import { EmployeeStatusType } from '../../types/employee-type';

export interface IEmployee extends IUser {
  position: string;
  status: EmployeeStatusType;
}