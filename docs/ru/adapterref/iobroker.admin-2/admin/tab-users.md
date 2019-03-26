---
chapters: {"pages":{"de/adapterref/iobroker.admin-2/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin-2/README.md"},"de/adapterref/iobroker.admin-2/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin-2/admin/tab-adapters.md"},"de/adapterref/iobroker.admin-2/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-instances.md"},"de/adapterref/iobroker.admin-2/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin-2/admin/tab-objects.md"},"de/adapterref/iobroker.admin-2/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin-2/admin/tab-states.md"},"de/adapterref/iobroker.admin-2/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-groups.md"},"de/adapterref/iobroker.admin-2/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin-2/admin/tab-users.md"},"de/adapterref/iobroker.admin-2/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin-2/admin/tab-events.md"},"de/adapterref/iobroker.admin-2/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin-2/admin/tab-hosts.md"},"de/adapterref/iobroker.admin-2/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-enums.md"},"de/adapterref/iobroker.admin-2/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin-2/admin/tab-log.md"},"de/adapterref/iobroker.admin-2/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin-2/admin/tab-users.md
title: Пользователь вкладки
hash: HKsMwIvpGIO+9hqNOzBFUsRM8OOTNgILqQ6z75xDXDY=
---
# Вкладка Пользователь
Здесь пользователи могут быть созданы. Нажмите на (+) в левом нижнем углу. Администратор уже создан по умолчанию.

![iobroker_adapter_admin_user_01](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-user_01-1.jpg)

## Содержание страницы
На странице существующие пользователи отображаются в виде таблицы. Поля в заголовках столбцов используются для фильтрации таблицы по вашим собственным критериям.

Таблица состоит из следующих столбцов:

### **1.) ID**
Это уникальное имя каждого пользователя в соответствии со структурой, состоящей из sytem.user.user_name.

### **2.) Имя**
Имя пользователя. Это имя свободно выбирается. Это имя должно быть уникальным.

### **3.) Активирован**
С помощью этого флажка доступность пользователя может быть активирована или деактивирована.

### **4.) Группы**
Группы, созданные на вкладке **_ Группы _** отображаются здесь. Здесь пользователи могут быть назначены на соответствующие группы с помощью флажка.

![iobroker_adapter_admin_user_groups](../../../../de/adapterref/iobroker.admin-2/admin/img/tab-user_Groups.jpg)

### **5.) Создать нового пользователя**
Этот значок можно использовать для создания нового пользователя, который затем должен быть присвоен существующей группе.

### **6.) Изменить существующего пользователя**
После выбора существующего пользователя в списке данные этого пользователя можно редактировать с помощью этого значка.

### **7.) Удалить существующего пользователя**
С помощью значка корзины можно удалить существующего пользователя, существующие группы будут сохранены.