Задача №1. Singleton или нет?

@Injectable({
    providedIn: 'root'
})
export class CounterService {
    id = Math.random();
}

@Component({
    selector: 'app-a'
})
export class ComponentA {
    counter = inject(CounterService);
}

@Component({
    selector: 'app-b'
})
export class ComponentB {
    counter = inject(CounterService);
}

Вопрос:
    Cколько экземпляров CounterService будет создано? Почему?
Ответ:
    Создан будет только один экземпляр на всё приложение из-за providedIn: 'root',
    компоненты получат один и тот же экземпляр сервиса (Singleton).

<---------------------------------------------------------------------->

Задача №2. Локальный Provider

@Injectable({
    providedIn: 'root'
})
export class CounterService {
    id = Math.random();
}

@Component({
    selector: 'app-child',
    providers: [CounterService]
})
export class ChildComponent {
    counter = inject(CounterService);
}

<app-child></app-child>
<app-child></app-child>

Вопрос:
    Сколько экземпляров CounterService будет создано?
Ответ:
    Создано будет два независимых экземпляра объекта из-за указанного `providers: [CounterService]` в компоненте.

<---------------------------------------------------------------------->

Задача №3. Какой экземпляр получит компонент?

@Injectable({
providedIn: 'root'
})
export class LoggerService {
    id = Math.random();
}

@Component({
    providers: [LoggerService]
})
export class ParentComponent {}

@Component({})
export class ChildComponent {
    logger = inject(LoggerService);
}

Вопрос:
    Какой экземпляр получит ChildComponent? Почему?
Ответ:
    Компонент получит экземпляр родителя ParentComponent, потому что inject проверяет зависимости в inject-дереве снизу вверх,
    т.е. сперва проверяет в текущем компоненте. Если нет, то поднимается выше и смотрит у родителя.
    В данном случае зависимость есть у родителя — его он и получит и дальше не поднимется до Root Injector.

<---------------------------------------------------------------------->

Задача №4. useExisting

@Injectable({
    providedIn: 'root'
})
export class LoggerService {}

providers: [
LoggerService,
    {
        provide: 'LOGGER',
        useExisting: LoggerService
    }
]

const a = inject(LoggerService);
const b = inject('LOGGER');

Вопрос
    Сколько экземпляров LoggerService существует?
Ответ:
    Один, useExisting создаст новый токен, т.е. ссылку LoggerService, но не создаст новый экземпляр объекта.
    Соответственно, экземпляр у LoggerService и 'LOGGER' будет один и тот же.

<---------------------------------------------------------------------->

Задача №5. useFactory

providers: [
    {
        provide: LoggerService,
        useFactory: () => new LoggerService()
    }
]
Вопрос:
    Когда будет вызвана useFactory?

При запуске приложения
При первом inject()
При каждом inject()

Ответ:
    При первом inject().

<---------------------------------------------------------------------->

Задача №6. Multi Provider

export const TOKEN = new InjectionToken<string[]>('TOKEN');
providers: [
    {
        provide: TOKEN,
        useValue: 'A',
        multi: true
    },
    {
        provide: TOKEN,
        useValue: 'B',
        multi: true
    }
]
const value = inject(TOKEN);

Вопрос:
    Что окажется в value?
Ответ:
    A и B, multi: true говорит не удаляй, а добавь в массив.
    Если без multi, то «A» был бы удалён, остался бы только «B».

<---------------------------------------------------------------------->

Задача №7. Optional

const logger = inject(LoggerService, {
    optional: true
});

Provider нигде не зарегистрирован.

Вопрос:
    Что произойдет?
Ответ:
    Не будет ошибки, вернет null из-за optional: true.

<---------------------------------------------------------------------->

Задача №8. Self

@Injectable({
    providedIn: 'root'
})
export class LoggerService {}

@Component({})
export class ChildComponent {

logger = inject(LoggerService, {
    self: true
});

}

В текущем компоненте Provider отсутствует.

Вопрос:
    Что произойдет?
Ответ:
    Вернет ошибку NullInjectorError, из-за self: true который говорит ищи зависимость только в тикушем компоненте.

<---------------------------------------------------------------------->

Задача №9. SkipSelf

@Component({
    providers: [LoggerService]
})
export class ParentComponent {}

@Component({})
export class ChildComponent {

logger = inject(LoggerService, {
    skipSelf: true
});

}

Вопрос:
    Какой экземпляр будет получен?
Ответ:
    Будет получен экземпляр у родителя ParentComponent, так как skipSelf: true говорит не ищи в текущем, а начни сразу с родителя.

<---------------------------------------------------------------------->

Задача №10. Нет регистрации

const service = inject(ApiService);

ApiService нигде не зарегистрирован.

Вопрос:
    Что произойдёт?
Ответ:
    Дойдет до конца вверх, т.е после Root Injector выбросит ошибку NullInjectorError.

<---------------------------------------------------------------------->

Задача №11. Что произойдет?

@Injectable({
    providedIn: 'root'
})
export class LoggerService {}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    logger1 = inject(LoggerService);
    logger2 = inject(LoggerService);

}
Вопрос:
    Сколько экземпляров LoggerService будет создано?
Ответ:
    Один. (Singleton)

<---------------------------------------------------------------------->

Задача №12. Финал

Есть приложение

    AppComponent
    │
    ├── HeaderComponent
    │      providers: [LoggerService]
    │
    └── DashboardComponent
        │
        └── UserCardComponent

LoggerService также зарегистрирован через providedIn: 'root'

Вопросы:
    1.Сколько экземпляров LoggerService существует?
    2.Какой экземпляр получит HeaderComponent?
    3.Какой экземпляр получит DashboardComponent?
    4.Какой экземпляр получит UserCardComponent?
    5.По какой цепочке Injector'ов Angular будет искать зависимость в UserCardComponent?

Ответ:
    1.Два экземпляра, в root и в header.
    2.Получит свой отдельйный экземпляр объекта.
    3.Root (Singleton).
    4.Root (Singleton).
    5.Сперва проверит в тикущем компоненте UserCardComponent,
    после проверит у родительского DashboardComponent,
    после в AppComponent, и после проверит в root.

<---------------------------------------------------------------------->

Задача №13. ⭐

Есть сервисы:

class A {
    b = inject(B);
}

class B {
    c = inject(C);
}

class C {
    d = inject(D);
}

class D {
    logger = inject(LoggerService);
}

Все сервисы зарегистрированы в Root.

Вопрос:
    Опишите каждый шаг, который выполнит Angular после inject(A).
    Начиная с поиска Provider, заканчивая кешированием.
Ответ:
    При inject(A) Ангуляр будет искать provider, посмотрит есть экземпляр или нет,
    если нет то создаст экземпляр объекта, т.е Ангуляр сначала спускается по цепочке зависимостей вниз создовая их (new B, new C, new D, new LoggerService).
    После поднимается вверх кешируя каждый из этих объектов отдельно (LoggerService, D, C, B).
    (Пока все зависимости не будут разрешены Ангуляр не кеширует)

<---------------------------------------------------------------------->

Задача №14. ⭐⭐

Есть приложение

    App
    ↓
    Dashboard
    ↓
    Users
    ↓
    UserCard

Все компоненты уже открыты.
Ни один сервис пока не использовался.
Все сервисы имеют providedIn: 'root'

Вопрос:
    1.Сколько объектов существует в памяти?
        Потом выполняется inject(UserService)
            UserService использует ApiService
            ApiService использует LoggerService
    2.Сколько объектов появится теперь? Почему?
Ответ:
    1. Ноль.
    2. При выполнение inject(UserService) по цепочке зависимостей в памяти будет созданы три объекта.
        Потому что Ангуляр не создает зависимости пока они не будут нужны.

<---------------------------------------------------------------------->

Задача №15. ⭐⭐⭐

Перед вами архитектура интернет-магазина.

Необходимо определить, как должен быть зарегистрирован каждый сервис.

Для каждого сервиса может быть выбран:

providedIn: 'root'
providers компонента
providers роутинга
InjectionToken
useFactory
useValue


1. ApiService. Отвечает за выполнение HTTP-запросов ко всему приложению.
Ответ: root

2. AuthService. Хранит текущего пользователя. Предоставляет методы:
    login()
    logout()
    currentUser()

Ответ: root

3. CartService

    Хранит товары в корзине.
Ответ: root

4. ProductFilterService
    Хранит состояние фильтров.
    На странице "Телефоны" фильтры свои.
    На странице "Ноутбуки" — свои.
    После ухода со страницы фильтры должны исчезать.

Ответ: providers: [ProductFilterService]

5. NotificationService

    Показывает toast-уведомления.

Ответ: root

6. ThemeService

    Хранит текущую тему приложения.
    Все страницы должны использовать одну тему.

Ответ: root

7. DashboardStatisticsService

    Загружает статистику только для страницы Dashboard.
    После ухода со страницы больше не используется.

Ответ: route provider

8. UserTableStateService

Хранит:
    сортировку;
    текущую страницу;
    выбранные фильтры.
    Используется только внутри страницы пользователей.

Ответ: route provider

9. ModalService

    Управляет открытием модальных окон.
    Любой компонент приложения может открыть модальное окно.
    Имеет метод isModalOpen(): boolean

Ответ: root

10. LoggerService

    В production должен отправлять логи на сервер.
    В development — писать в консоль.

Ответ: useFactory 

11. AppConfig

Содержит:
    apiUrl
    production
    appVersion

Ответ: InjectionToken + useFactory

12. CurrencyFormatter

    Хранит формат числа.

Ответ: root

13. AnalyticsService

    Должен существовать только если включена аналитика.

Ответ: useFactory
