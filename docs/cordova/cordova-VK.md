JSMP3.15: Cordova / PhoneGap frameworks  (Vitalii Kotliar)
==========================================================

# Подготовка к запуску приложения на android  

Для того что бы запустить приложение на андроид необходимо было внести ряд изменений на клиентской 
и серверной части приложения. 

## Whttp
Был добавлен сервис который является обёрткой для стандартного сервиса http. 
Первоочередной задачей данного сервиса есть перенаправление запросов на заданный домен, 
реализуется это просто конкатенацией адресов. 
Для примера метод whttp.get()
```
public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.addPrefix(url), options);
    }
```
Приватный метод addPrefix() принимает адрес и добавляет к нему доменный адрес, который
указан константой в данном сервисе, в будущем желательно переместить эту переменную в файла .env. 
Также сервис Whttp добавляет в хедеры к каждому запросу токен, необходимый  для аутентификации
```
private appendHeaders(options: RequestOptionsArgs) {
        let headers = new Headers();
        headers.append('x-token', this.token);
        return Object.assign({}, options, { headers });
    }
```
## CORS 
Для того чтобы проверить работу приложения, сервер был задеплоен на онлайн idea c9.io.
При этом подключен дополнительный npm пакет - cors, который обеспечивает доступ к 
серверу с других доменов, то есть разрешает выполнять кроссдоменные запросы. 
```
const cors = require('cors'),
let app = express();
app.use(cors());
```
## Authorization 
Так как авторизация была реализованна через passportJS. Даная библиотека по 
умолчанию использует cookie подход для авторизации, что не подходит для приложения на Android, 
так как нам нужно выполнять кросдоменные запросы, на которых cookie не работают. 
В результате авторизация была переделана под подход с токеном. 
```
const Strategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const params = {
    secretOrKey: config.token.secret,
    jwtFromRequest: ExtractJwt.fromHeader('x-token')
};
const strategy = new Strategy(params, function (payload, done) {
        User.findById(payload.id, function (err, user) {
        ... 
        } 
}
```
## NPM scripts
Было добавлено несколько npm скриптов для быстрой работы с разными платформами. 
Основные скрипты следующие: 
"cordova:emulate" - собирает проект и запускает эмулятор в браузере
"make:android" - собирает проект, компилирует apk и копирует его в папку cordova

## Плагины
Для того что бы сделать фото и отравить его на сервер, было добавлено несколько плагинов.

> - cordova-plugin-camera - плагин для работы с камерой устройства. Добавляет просто API в
 объект navigator.camera. Среди всех возможностей было использовано метод getPicture() 
 для получения снимка с камеры
````
  const options = {
             quality: 50,
             destinationType: this.destinationType.FILE_URI
         };
         navigator.camera.getPicture(this.onPhotoSuccess, this.onPhotoFail, options);
````
> - cordova-plugin-file-transfer - плагин для отравки файлов с усторойства
````
public phoneUpload(state) {
        const url = encodeURI(this.whttp.addPrefix('/api/states'));
        const fileURI = state.file;
        const options = this.getOptions(state, fileURI);
        const ft = new FileTransfer();
        ft.upload(fileURI, url, this.onSuccessUpload, this.onFailUpload, options);
    }
````
> - cordova-plugin-console - плагин для записи логов JS, в общие логи приложения, 
используется для дебагинга приложения.

# Запуск приложения на android  
Для того что бы сделать фото, нужно нажать на кнопку "Take a photo", данная
кнопка доступна только на устройствах. 

![Button](/button.jpg)

После нажатия на кнопку нам открывается привычный режим для фотоснимков.

![Camera](/camera.jpg)