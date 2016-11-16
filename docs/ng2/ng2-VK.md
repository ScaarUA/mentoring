JSMP3.12: Angular 2 (Kotliar Vitalii)
=====================================

Стек технологий
---------------

Angular 2.1.0, Webpack, Sass, Rxjs, Bootstrap, Ng2-select.

----------

Архитектура приложения
----------------------

Архитектура состоит из пяти модулей, каждый из которых содержит логику для работы с определенной сущностью — компоненты, сервисы, ресолвы, роутинг. 
Главный модуль app.module является точкой входа в приложение, выполняет подключение роутинга первого уровня и включает в себя общее компоненты, такие как header, footer, page not found, landing. 
Все модули имеют одинаковую структуру, рассмотрим на примере projects.module:
> - projects.module — создание и описание модуля;
> - projects.routing — описание роутинга данного модуля;
> - projects-service/ — директория, которая включает сервис для работы с сущностью проекта, именно в нем содержится вся логика по CRUD операциям и связью с сервером;
> - projects-resolvers/ - директория, которая содержит набор классов, что подключаются к определенным рутам для получение данных до загрузки компонента;
> - projects-pipes/ - директория с фильтрами для проектов;
> - projects.compoent, projects.html, projects.scss — описание корневого компонента в данном модуле;
> - add-project-from/, edit-project-form/, project/, project-details/, project-list — компоненты сущности проектов. 

Также кроме модулей имеются следующие директории:
> - components — общие компоненты, которые не попадают в модули сущностей;
> - guards — классы для проверки возможности перехода юзера по заданному роуту;
> - models — классы, которые описывают сущности используемые в приложении;
> - shared — общие сервисы;
> - common-styles — общие стили для проекта, среди них палитра, миксины и другое.

------------------------
Роутинг приложения
----------------------
![N|routing application](/routing.jpg)

Для всех внутренних рутов используется гард AuthGuard, где проходит проверка возможности перехода.  
> - 1) **projects** - список всех проектов, путь `/projects`
> - 2) **project-details** - детально о каждом проекте `/projects/:id/details`
> - 3) **flow-list** or **flow-slider** - список флоу в проекте, может быть в двух вариантах либо список, либо слайдер, по умолчанию при переходе по адресу `/projects/:id/details` открывается список, то есть `/projects/:id/details/list`.
 
----------------------
Реализация Projects
----------------------

## GET

Для получения списка с севера используется сервис, в котором хранится массив объектов, компоненту дается лишь ссылка на данный массив, такой подход дает возможность обновлять отображение при удалении, либо добавлении нового проекта. При клике по названию проекта происходит переход по пути /projects/:id/details/list и справа у нас появляется список флоу в данном проекте. Также можно поменять режим отображения на слайдер. Для того что бы отобразить список флоу, компоненты **flow-list** и **flow-slider** были экспортированы из модуля flows в модуль projects.
Также есть возможность поиска проектов по имени, либо описанию проекта. Реализуется данная возможность благодаря пайпу — projects-search.pipe, в котором проверяется вхождение введенного слова в заголовок или описание проекта. 

## ADD/EDIT

![N|update project](/update.png)

При создании и редактировании проекта используется ресолв на рутах, который получает все доступные флоу из сервера. Дальше мы можем добавить или изменить список флоу, благодаря модулю ng2-select, который предоставляет удобный API и неплохой дизайн для multiselect в Angular 2. Кнопка Back реализуется с помощью location.back(). 