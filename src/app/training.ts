export interface IUser {
  id: number;
  name: string;
  surname: string;
  age?: number;
}

interface IEmployee extends IUser {
  position: string;
  status: EmployeeStatus;
}

type EmployeeStatus = 'active' | 'inactive' | 'fired';
type Status = 'loading' | 'success' | 'error';
type TextFormat = 'uppercase' | 'lowercase' | 'capitalize';

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
