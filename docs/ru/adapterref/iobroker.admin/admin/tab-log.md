---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/admin/tab-log.md
title: Вкладка Журнал
hash: kzof4XfyddkyR8KdFjUtTOUg5IE6jzeGfhiqozkyyE0=
---
# Вкладка Журнал
Здесь сообщения системы постоянно выводятся.
Последнее сообщение вверху.

![](../../../../de/adapterref/iobroker.admin/admin/img/tab-log_01.jpg)

## Строка заголовка
Строка заголовка содержит значки для наиболее важных процессов.
Для каждой иконки есть контекстная помощь. Просто держите мышь на значке некоторое время.

![](../../../../de/adapterref/iobroker.admin/admin/img/tab-log_icons.jpg)

### **Значки в деталях:**
### **1.) Остановить обновление**
При нажатии на эту кнопку постоянное обновление списка прекращается.
Вместо значка паузы теперь отображается количество новых сообщений, которые не отображаются.

### **2.) Обновление журнала**
Эта кнопка обновляет список.

### **3.) Копировать журнал**
После нажатия на этот значок список появится в виде текста. С помощью CTRL-A весь текст выделяется и вставляется с помощью CTRL-C в буфер обмена для дальнейшей обработки.

### **4.) Очистить список**
При нажатии на этот значок будет удален только список на экране.

### **5.) Очистить журнал**
Нажатие на этот значок навсегда удаляет весь журнал на хосте.

### Выпадающие меню
### **фильтр экземпляров**
![](../../../../de/adapterref/iobroker.admin/admin/img/tab-log_instances.jpg)

С помощью этого выпадающего меню сообщения могут быть отфильтрованы в соответствии с экземпляром журнала.
В меню отображаются только экземпляры, для которых также есть записи на странице.

### **отображаемый уровень журнала**
![](../../../../de/adapterref/iobroker.admin/admin/img/tab-log_loglevel.jpg)

Это меню используется для установки серьезности сообщения.
Однако это всего лишь фильтр существующего списка. Для того, чтобы установить определенный уровень регистрации для экземпляра, это должно быть установлено на вкладке _ **Instances** _