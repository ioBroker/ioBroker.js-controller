---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-enums.md
title: Вкладка перечисления
hash: rqPVvVeC50Hm4dxcQ7zBoNm0VTUa7zS5Txki6arYBmc=
---
# Вкладка Enumerations
Здесь перечислены фавориты, торги и комнаты от Homematic CCU.
Вы также можете создавать свои собственные списки, которые затем можно использовать в скриптах.

![iobroker_adapter_admin_enums_01](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_01.jpg)

## Строка заголовка
Строка заголовка содержит значки для наиболее важных процессов.
Для каждой иконки есть контекстная помощь. Просто держите мышь на значке некоторое время.

![iobroker_adapter_admin_enums_headers_01](../../../de/adapterref/iobroker.admin/img/ioBroker_Adapter_admin_Enums_Headers_01.jpg)

### **Значки в деталях:**
### **1.) Обновить вид**
Если вновь созданные списки не отображаются, нажатие на этот значок поможет обновить состояние страницы.

### **2.) Изменить сортировку**
Эта кнопка изменяет сортировку объектов на этой странице.

Если кнопка активна, все объекты отсортированы по алфавиту.
Если эта кнопка не активна, объекты отображаются иерархически в соответствии с перечислениями в древовидной структуре.

Затем видны следующие две иконки.

### **3.) Закройте все подпапки**
### **4.) Развернуть все подпапки**
### **5.) Добавить**
После выбора этого значка можно добавить дополнительные перечисления в базовой структуре.
Элементы в структуре папок создаются с помощью значка (+) справа (# 10).
Откроется окно конфигурации:

![iobroker_adapter_admin_enums_new](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new.jpg)

Теперь вам нужно выбрать имя для нового перечисления, сгенерированный идентификатор будет скорректирован автоматически.

### Содержание страницы
![iobroker_adapter_admin_enums_headers_03](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Headers_03.jpg)

На странице существующие списки и их участники сведены в таблицу.

Таблица состоит из следующих столбцов (поля под заголовками столбцов 6, 7 и 8 служат критериями фильтра). Таблица на рисунке упорядочена по иерархии, и все подузлы были расширены:

### **6.) ID**
Здесь все члены перечислений перечислены с их идентификаторами.Это обозначение можно изменить, дважды щелкнув или щелкнув соответствующий значок карандаша (# 9).
Полный идентификатор подчиненных структур также включает родительские уровни в каждом случае.

### **7.) Имя**
В этом столбце отображается имя участника. Это имя можно изменить, дважды щелкнув или щелкнув на соответствующем значке карандаша (# 9).

### **8.) Участники**
В этом столбце членов списка, в слишком многих отображается только номер.
Если вы наведете курсор мыши на поле, все члены будут отображаться в виде всплывающей подсказки.
Для получения дополнительной информации см. Информационный значок справа (# 12)

### **9.) Редактировать имена**
После нажатия на этот значок вы можете редактировать имена в столбце ID и имя.
Кнопка ok в виде галочки и значок отмены в виде (x) появляются в этой точке.

### **10.) Добавить элемент структуры**
После нажатия на этот значок открывается диалоговое окно, в котором можно создать нового члена в соответствующей структуре.

![iobroker_adapter_admin_enums_new_member](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new_Member.jpg)

Опять же, имя можно выбрать индивидуально. Связанный идентификатор генерируется автоматически в соответствии со структурой и выбранным именем.

### **11.) Удалить элемент**
Значок корзины удаляет элемент в этой строке

### **12.) Информация**
После нажатия на этот значок открывается другое окно с расширенной информацией о выбранном элементе.

![iobroker_adapter_admin_enums_info](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Info.jpg)