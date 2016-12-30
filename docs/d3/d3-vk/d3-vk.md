JSMP3.17: D3.js library (Kotliar Vitalii)
==================================================================

Стек технологий
---------------

D3.js, Select2, Jquery(для плагина select2). 

API
---
Для входных данных был выбран API ресурса https://currencylayer.com/.
Ресурс предоставляет информации о текущем рынке валюты. На данном ресурсе существуют различные ражими для API, базовый - для получения 
текущего курса валют. Также существуют более продвинутые режимы, но они к сожалению коммерческие.
```
 const url = 'http://www.apilayer.net/api/live';
 const api = `${url}?access_key=e9568c555f60dc612e93214da97d35d8&format=1&currencies=${currencies}`;
 window.fetch(api, options)
        .then((response) => response.json())
        .then(prepareData)
        .then((data) => {
            init(data, currencies);
        });
```
----------

Graph
-----
На графике изображена текущая ситуация на рынке валют: за сколько можно купить доллар другими валютами. 
По умолчанию выбрано 4 валюты: EAR, UAH, CAD, RUB. 

![N|default](/default.jpg)

Update graph 
------------
Для того что бы выбирать валюты, был разработан multiselect, который написан при помощи плагина select2. 
В данном селекте есть следующие валюты: EUR, GBP, PLN, UAH, CAD, GBP, HKD, JPY, RUB. 

```
let data = currencies.map((item) => {
        return {
            id: item,
            text: item,
            selected: selectedCurrency.includes(item)
        }
    });

const $select = $('.js-example-basic-multiple').select2({ data });
```

В спискепредставлены основные валюты мира, но при желании их можно расширить до 168 штук, весь список можно 
посмотреть на сайте https://currencylayer.com/. 
При добавлении или удалении валют, отсылается запрос на API и наш график обновляется.

![N|select](/select.jpg)

Tooltip
-------
При наведении на столбик диаграммы, появляется подсказка в которой указан точный
курс выбранной валюты. 

![N|tooltip](/tooltip.jpg)