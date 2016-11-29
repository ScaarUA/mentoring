JSMP3.11: ReactJS Architectural Concept (Kotliar Vitalii)
======================================================================

Стек технологий
-------------
**Основные**: React 3.2.1, react-redux, redux-logger, redux-thunk.   
**Дополнительные**: React-router, react-router-redux, isomorphic-fetch, bootstrap.

Архитектура 
--------------
Базовая архитектура была взята с воркшопа. Но было внесено ряд изменений по разделению логики сущностей 
 comment и user. Так же были добавлены новые классов для связи с сервером. В конечном итоге получили слудующую архитектуру:
> -	actions/  — директория, в которой описываются все события, вызванные пользователем;
> -	api/ — набор сервисов для связи с сервером, содержит файл login.js в котором содержится логика по аутентификации пользователя;
> -	components/ — набор компонентов, из которых состоит приложение, директория содержит две папки comments и login;
> -	containers/ — директория, которая содержит корневые компоненты;
> -	reducers/ — директория, содержащая редьюсеры, включает в себя comments.js, user.js, index.js; 
В файле index.js происходит объединение редьюсеров при помощи метода combineReducers:

````
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './user';
import commentsReducer from './comments';

export default combineReducers({
    comments: commentsReducer,
    user: userReducer,
    routing: routerReducer
})
````
> -	store/ — директория, содержащая все сторы приложения;
> -	index.js — в файле происходит бутстрапинг приложения и конфигурируется роутинг:

````
<Provider store={configureStore()}>
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={LoginForm}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/comments" component={CommentBox}/>
        </Route>
    </Router>
</Provider>
````
> -	index.html — корневой файл приложения, с которого начинается запуск приложения;
> -	main.scss — стили приложения. 

Реализация
--------------
Было реализовано две страницы — login и comments. 
Первоначально запускается страница login. 
На этой странице содержится следующая логика: при нажатии на кнопку «Submit» 
отправляется запрос    _/auth/local/login POST_, если пользователь прошел валидацию возвращается 
объект с информацией о пользователе, который записывается в стор, после чего юзера перебрасывает 
на страницу /comments — где есть возможность удаления и добавления комментариев(взято с воршопа). 
Страница comments показана на скришоте ниже.
	
![N|Comments page](/comments_page.jpg)
	
В случае если пользователь не прошел валидацию, сервер возвращает 401 статус,
а пользователю показывается сообщение:    _«Incorrect email or password»_. 
Такое состояние можно увидеть на скриншоте ниже. 

![N|Login page](/login_page.jpg)

Запуск приложения
--------------
Для запуска react приложения необходимо:   
1) git clone git@git.epam.com:bohdan_huseinov/mentoring.git && cd mentoring;   
2) git checkout react_completed;  
3) use node version **7.0.0**;   
4) npm i;     
5) npm run start:react;        
6) Open your browser http://localhost:8888.  

