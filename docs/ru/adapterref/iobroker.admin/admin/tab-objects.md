---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/admin/tab-objects.md
title: Закладка объектов
hash: GIc3qNC2ZnoKb8Y2zbYYsyTbWS+DWObdVmPTllsNDVk=
---
# Закладка Объекты
Под этой вкладкой находятся все управляемые объекты. Для каждого экземпляра здесь создается папка, в которой созданные им точки данных находятся в иерархической структуре. Объекты также могут быть созданы и удалены вручную здесь. Целые структуры объекта могут быть загружены или загружены. Другая кнопка позволяет просматривать экспертный вид.

<span style="line-height: 1.5; text-align: justify;"></span>

![iobroker_admin_objekte_inhalt00](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_Inhalt00.jpg)

## Строка заголовка
Строка заголовка содержит значки для наиболее важных процессов. Для каждой иконки есть контекстная помощь. Просто держите мышь на значке некоторое время.

![iobroker_admin_objekte_headline_icons](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_Headline_Icons.jpg)

### **Значки в деталях:**
### **1.) Обновить вид**
Если только что созданные объекты не видны, нажатие на этот значок поможет обновить состояние страницы.

### **2.) Изменить сортировку**
Эта кнопка изменяет сортировку объектов на этой странице.

Если кнопка активна, все объекты отсортированы по алфавиту. Если эта кнопка не активна, объекты сортируются иерархически в соответствии с экземплярами.

Затем видны следующие две иконки.

### **3.) Закрыть все темы**
### **4.) Развернуть все темы**
### **5.) Режим администратора**
При выборе этого значка отображаются другие объекты (функция переключения). Это точки данных системы.

### **6.) Добавить**
После выбора этого значка можно добавить другие объекты.
Если папка выбрана, она становится _Parent_ в структуре объекта.
Откроется окно конфигурации:

![iobroker_admin_objekte_addobject](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_AddObject.jpg)

Здесь теперь необходимо выбрать имя для нового объекта, в результате чего устройство, канал или точка данных будут доступны как тип в соответствии с иерархической структурой.
Типы точек данных включают в себя логическое значение, переключатель, строку, число, список значений, поле, объект и смешанный тип.

Как только вы подтвердите окно ввода с ок, откроется другое окно:

![iobroker_admin_objekte_addobjec02t](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_AddObjec02t.jpg)

Здесь вы можете ввести еще некоторые данные. Таким образом, вы можете добавить роль и значок к объекту.

Среди других вкладок есть и другие свойства объекта.
Такая информация существует для каждого объекта.

### **7.) Загрузить**
С помощью этой кнопки полная структура объекта загружается на сервер ioBroker в виде файла json.

### **8.) Скачать**
С помощью этой кнопки выбранная структура объекта загружается в виде файла json с сервера ioBroker и может быть сохранена.

## Содержание страницы
![iobroker_admin_objekte_headline_columns](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_Headline_Columns.jpg)

На странице существующие объекты представлены в виде таблицы.

Таблица состоит из следующих столбцов (поля под заголовками столбцов 1 и 2 и раскрывающиеся меню других столбцов служат критериями фильтрации).
Таблица на рисунке упорядочена по иерархии, и все подузлы были расширены:

### **1.) ID**
Это верхние уровни иерархии объектов. Здесь, как верхний уровень, например
имя экземпляра, включая структуру созданных данных.

### **2.) Имя**
В этом столбце указывается название объекта. Кроме того, предыдущий значок показывает, какой это иерархический уровень (устройство, канал или точка данных).

Значения этого столбца доступны для редактирования.

![iobroker_admin_objekte_structure01](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_Structure01.jpg)

### **3.) Тип**
Тип на уровне иерархии, который уже был виден в столбце _Name_ предыдущим значком, снова здесь явно упоминается. С помощью выпадающего меню в заголовке столбца вы можете фильтровать по этим типам. показать только все точки данных.

### 4.) Роль
Роль указывает, как пользовательские интерфейсы, такие как .vis и mobile, должны обращаться с этой точкой данных.
Это в принципе функция этого объекта, кратко описанная термином.
После этого вы можете снова фильтровать. Значения этого столбца доступны для редактирования.

### **5.) Номер**
Если этот объект уже был присвоен комнате, он будет отображен здесь.
Это также служит США. Фильтрация при поиске объектов.
Значения этого столбца доступны для редактирования. Таким образом, объекты могут все еще быть назначены комнатам позже.
Если щелкнуть поле, откроется всплывающее окно с ранее созданными комнатами.

![iobroker_admin_objekte_rooms](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_Rooms.jpg)

### **6.) Функция**
Этот столбец содержит сделку, которой назначен соответствующий объект.

Значения этого столбца доступны для редактирования. Таким образом, объекты могут быть позже назначены на торги. Если вы нажмете на поле, откроется всплывающее окно с ранее созданными сделками.

### **7.) Значение**
Если объект является точкой данных, здесь отображается текущее значение этой точки данных.

### **8.) Другое**
При нажатии на значок карандаша открывается окно со свойствами этого объекта.
Это то же самое окно, которое появилось выше при создании нового объекта.
Здесь свойства объекта могут быть изменены. Эту функцию следует использовать с особой осторожностью и только в том случае, если вы точно знаете, что вы делаете с ней.

Нажатие на значок корзины удаляет этот объект и **все** базовые объекты в иерархии. В целях безопасности появляется окно, в котором удаление необходимо подтвердить еще раз.

![iobroker_admin_objekte_delete](../../../../de/adapterref/iobroker.admin/admin/img/tab-objects_delete.jpg)

Значок шестеренки отображается, только если установлен хотя бы один экземпляр истории (History, InfluxDB или SQL).
Здесь вы можете настроить точку данных для регистрации исторических данных. Дополнительную информацию можно найти в описании [История адаптер](http://www.iobroker.net/?page_id=144&lang=de).

Через звездочку в строке заголовка это действие может быть выполнено одновременно для всех точек данных, которые соответствуют текущим критериям фильтра. Поэтому важно проверить, выбраны ли критерии фильтрации на этой странице, чтобы были включены только желаемые точки данных.

Выпадающее меню для фильтрации этого столбца относится к точкам данных с зарегистрированными данными.
_Mit_, _ohne_ и _alle_ и установленные экземпляры истории доступны здесь.