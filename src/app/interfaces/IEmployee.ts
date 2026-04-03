import { Worker } from './Worker';
import { EmployeeStatus } from '../../types/EmployeeStatus';

export interface IEmployee extends Worker {
  position: string;
  status: EmployeeStatus;
}