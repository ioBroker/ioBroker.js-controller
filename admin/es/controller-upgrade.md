# instrucciones de actualización del controlador js

Debido a los diferentes hardware y plataformas en los que se ejecuta ioBroker, el controlador js debe actualizarse manualmente. Se pueden encontrar más detalles en la sección correspondiente.

## Información general para todas las plataformas

**Para una actualización de js-controller 1.xa 2.x, lea siempre la información en https://forum.iobroker.net/topic/26759/js-controller-2-jetzt-f%C3%BCr-alle-im-stable!**

De lo contrario, actualice primero los esclavos con una actualización de los sistemas maestro-esclavo y el maestro al final.

## Linux / macOS (nuevo instalador)
¡Esta es la opción recomendada!

Ejecute los siguientes comandos en un shell SSH (consola):
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade self`
* `iobroker start` o reiniciar el servidor, entonces ioBroker debería reiniciarse y puede estar seguro de que todos los procesos anteriores se completaron.

Si el comando de actualización muestra Derechos de acceso / Errores de permiso, utilice el fijador de instalación (`curl -sL https://iobroker.net/fix.sh | bash-`) para solucionar estos problemas y el comando de actualización corre de nuevo.

## Linux/macOS (instalado manualmente)

Una instalación manual generalmente tiene lugar bajo la raíz como usuario y, por lo tanto, es necesario un "sudo" antes de los comandos.

Ejecute los siguientes comandos en un shell SSH (consola):
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade self`
* `sudo iobroker start` o reinicio del servidor, luego ioBroker debería reiniciarse y puede estar seguro de que todos los procesos anteriores se completaron.

Si el comando de actualización muestra permisos / errores de permisos, corríjalos. A veces "sudo" no es suficiente y debe ejecutar la instalación como una raíz real (anteriormente simplemente `sudo su -`).

## Windows

Para actualizar ioBroker en Windows, descargue el instalador apropiado con la versión deseada del controlador js desde la página de descarga https://www.iobroker.net/#en/download y realice la actualización con él. Con Windows Installer, los servidores instalados previamente manualmente o las instalaciones de otros sistemas operativos se pueden migrar a Windows y actualizar.

## Windows (instalado manualmente)

Se realiza una instalación manual con derechos de administrador. Inicie una ventana de línea de comandos cmd.exe como administrador (haga clic con el botón derecho en cmd.exe y ejecútelo como administrador) y ejecute los siguientes comandos:

* `cd C:\iobroker` (o donde se instaló ioBroker)
* `iobroker stop` para detener el servicio ioBroker
* `iobroker status` para verificar si ioBroker ha finalizado
* `iobroker update`
* `iobroker upgrade self`
* Inicie el servicio ioBroker o reinicie la computadora, luego ioBroker debería reiniciarse y puede estar seguro de que todos los procesos anteriores se completaron.

## Emergencia Linux / macOS / Windows (reinstalación manual, si de alguna manera nada funciona después de la actualización)

En Windows primero, llame al menú de inicio en "ioBroker", la línea de comando de la instancia de ioBroker correspondiente. El directorio correcto se configura automáticamente. En Linux o macOS, vaya al directorio ioBroker.

Ejecute `npm install iobroker.js-controller` allí. Se puede instalar una versión específica usando npm install `iobroker.js-controller@x.y.z` (reemplace x.y.z con la versión deseada).

Si hay problemas con los derechos de acceso cuando se ejecuta en Linux, el comando debe cambiarse ligeramente:

* Para sistemas creados con el nuevo instalador de Linux: `sudo -u iobroker -H npm install iobroker.js-controller`
* Para los sistemas instalados manualmente en Linux, prefije `sudo` o ejecútelo como root.

¡De esta manera solo es necesario en muy pocos casos y por favor consulte el foro de antemano!
