// 6. Создать интерфейс, который описывает юзера. Поля на ваш выбор. Одно поле должно быть опциональным.
export interface IUser {
  id: number;
  name: string;
  surname: string;
  age?: number;
}

// 7. Создать интерфейс, который расширяется интерфейсом User с задания №5 и имеет свои дополнительные поля 
interface IEmployee extends IUser {
  position: string;
  status: EmployeeStatus;
}

type EmployeeStatus = 'active' | 'inactive' | 'fired';
type Status = 'loading' | 'success' | 'error';
type TextFormat = 'uppercase' | 'lowercase' | 'capitalize';

let employeeStatus: EmployeeStatus;

// 4. Создать переменную status, которая может быть только: "loading", "success", "error".
let status: Status;

// 5. Создать переменную textFormat, которая может быть только: 'uppercase', 'lowercase', 'capitalize'".
let textFormat: TextFormat;

// 3. Создать функцию, которая принимает 2 числа и возвращает их сумму. Полностью типизировать параметры, значение, возвращаемое функцией.
const sum = (a: number, b: number): number => {
  return a + b;
}

sum(2, 4);

// 8. Создать функцию, которая принимает строку и вариант,  как именно форматировать строку (задание №5) и на основе этого возвращает форматированную строку.
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

// 9. Создать функцию, которая принимает строку и символ, возвращает строку без переданного символа.  (есть специальные методы для этого, гуглим)
const removeSymbol = (str: string, symbol: string): string => {
  return str.replaceAll(symbol, "");
};

removeSymbol('Text', 'e')

// 10. Создать массив объектов на основе интерфейса с задания №6. Отфильтровать его по одному из параметров
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

const filteredUsersByStatus = users.filter(user => user.status === 'fired')