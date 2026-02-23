import { IUser } from './IUser';
import { EmployeeStatus } from '../../types/EmployeeStatus';

export interface IEmployee extends IUser {
  position: string;
  status: EmployeeStatus;
}