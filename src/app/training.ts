import { IEmployee } from '../app/interfaces/IEmployee';
import { EmployeeStatus } from '../types/EmployeeStatus';
import { Status } from '../types/Status';
import { TextFormat } from '../types/TextFormat';

let employeeStatus: EmployeeStatus;
let status: Status;
let textFormat: TextFormat;

const sum = (a: number, b: number): number => {
  return a + b;
}

sum(2, 4);

const formatText = (text: string, format: TextFormat): string => {
  switch (format) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  }
}

formatText('angular simulator', 'capitalize');
formatText('angular simulator', 'uppercase');
formatText('Angular Simulator', 'lowercase');

const removeSymbol = (str: string, symbol: string): string => {
  return str.replaceAll(symbol, "");
};

removeSymbol('Text', 'e');

const users: IEmployee[] = [
  {
    id: 1,
    name: 'Jon',
    surname: 'Whitmore',
    position: 'Frontend',
    status: 'inactive'
  },
  {
    id: 2,
    name: 'Ethan',
    surname: 'Bennett',
    position: 'Backend',
    status: 'active'
  },
  {
    id: 3,
    name: 'Lucas',
    surname: 'Carter',
    position: 'Frontend',
    status: 'fired'
  }
]

const filteredUsersByStatus: IEmployee[] = users.filter((user: IEmployee) => user.status === 'fired');
