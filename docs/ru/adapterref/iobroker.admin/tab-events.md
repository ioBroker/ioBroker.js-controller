---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-events.md
title: Вкладка событий
hash: Yi2E6W9RHhmNwuCEDkiJSk2tvvns8JKWVvLyrnyoMmo=
---
# Вкладка «События»
На этой вкладке отображаются текущие состояния всех точек данных. Значения также могут быть изменены.

![iobroker_admin_states_columns](../../../de/adapterref/iobroker.admin/img/tab-events_States_columns.jpg)

## Содержание страницы
На странице существующие объекты представлены в виде таблицы. Столбцы можно сортировать в алфавитном порядке в порядке возрастания или убывания, щелкая заголовки столбцов в соответствии с содержимым соответствующих столбцов (функция переключения). Поля внизу используются для фильтрации точек данных в соответствии с их собственными критериями.

Таблица состоит из следующих столбцов:

### **1.) ID**
Это уникальное имя соответствующей точки данных в соответствии со структурой, состоящей, например, из Имя адаптера. Номер экземпляра. Имя пользователя. Имя канала. Имя точки данных.

### **2.) Фамилия родителей**
Тот же контент, что и в столбце 3 имени.

### **3.) Имя**
Название точки данных. Это может быть автоматически сгенерированное или назначенное вручную имя, которое более понятно. Это имя не обязательно должно быть уникальным.

### **4.) Значение**
Здесь указывается текущее значение точки данных.

Это значение доступно для редактирования

### **5.) Подтверждено**
Если это значение было изменено, и оно взято из системы, значение _true_, иначе _false._

### **6.) Источник**
Здесь указывается, какой экземпляр осуществил последнее изменение точки данных.

### **7.) Время**
Это временная метка, до которой точка данных последний раз обновлялась.

### **8.) Изменено**
Это временная метка, до которой значение точки данных в последний раз изменялось.

## Нижний колонтитул страницы
В нижнем колонтитуле есть еще немного информации

![iobroker_admin_states_footer](../../../de/adapterref/iobroker.admin/img/tab-events_States_footer.jpg)

### **1.) Перезагрузить**
Этот значок можно нажать, чтобы обновить таблицу.

### **2.) Информация о странице**
Информационный блок в середине стопы страницы дает возможность регулировать количество строк на странице с помощью выпадающего меню. Доступно 20, 100, 200, 500 и 1000 строк на странице. Кроме того, есть информация о том, сколько страниц в общей сложности, а также возможность с помощью значков со стрелками перемещать страницы вперед или назад.

### **3.) Информация о точке данных**
Эта информация указывает общее количество существующих точек данных и диапазон, отображаемый на текущей странице.