---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/admin/tab-hosts.md
title: Вкладка Хосты
hash: A0PX3gNVnrOQijF2MxOe4AXudr5VPDE9MVykcpPXSng=
---
# Вкладка Хосты
Доступные хосты отображаются здесь.

В стандартной системе есть только один хост. Для [Система Multi-хост](http://www.iobroker.net/?page_id=3068&lang=de) несколько.

## Строка заголовка
Строка заголовка содержит значки для наиболее важных процессов. Для каждой иконки есть контекстная помощь. Просто держите мышь на значке некоторое время.

![](../../../../de/adapterref/iobroker.admin/admin/img/tab-hosts_Hosts_icons.jpg)

### **Значки в деталях:**
### **1.) Получать обновления**
Чтобы проверить, есть ли обновление для js-контроллера, вы можете нажать на эту кнопку. При наличии обновления метка вкладки отображается зеленым цветом, а в столбце _ **доступно** _ отображается новая версия.

### **2.) Фильтр**
С этим бегством вы можете отфильтровать список хостов согласно вашим собственным

## Содержание страницы
На странице существующие хосты сведены в таблицу.

![](../../../../de/adapterref/iobroker.admin/admin/img/tab-hosts_Hosts_01.jpg)

Таблица состоит из следующих столбцов:

### **3.) Имя**
Это уникальное имя хоста, указанное в операционной системе хоста. Это имя должно быть уникальным.

### **4.) Перезагрузить хост**
С помощью этой кнопки соответствующий хост может быть перезапущен. Нажатие на него соответствует команде **_ перезагрузка _**

### **5.) Тип**
Указание, на каком движке работает хост.

### **6.) Название**
полное имя движка, обычно контроллер ioBroker.js

### **7.) Платформа**
Спецификация программной базы, на которой основан двигатель.

### **8.) Операционная система**
Спецификация операционной системы на хосте.

### **9.) Доступно**
Укажите последнюю доступную версию движка

Если доступна более новая версия движка, ее можно обновить через консоль.
Это всегда следует делать сначала, если это возможно, до начала обновления адаптеров.

### **9.) Установлено**
Спецификация установленной версии двигателя