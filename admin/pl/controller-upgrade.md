# instrukcje aktualizacji sterownika js

Ze względu na inny sprzęt i platformy, na których działa ioBroker, kontroler js musi być aktualizowany ręcznie. Dalsze szczegóły można znaleźć w odpowiedniej sekcji.

## Informacje ogólne dla wszystkich platform

**W przypadku aktualizacji z kontrolera js 1.x do wersji 2.x należy zawsze przeczytać informacje na stronie https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im -Ostatnie repo przeczytaj i zanotuj!**

W przeciwnym razie najpierw zaktualizuj urządzenia podrzędne o aktualizację systemów master-slave, a urządzenie master na końcu!

## Linux/macOS (nowy instalator)
To jest zalecana opcja !!

Wykonaj następujące polecenia w powłoce SSH (konsoli):
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade self`
* `iobroker start` lub restart serwera, następnie ioBroker powinien się zrestartować i możesz być pewien, że wszystkie stare procesy zostały zakończone.

Jeśli polecenie aktualizacji wyświetla błędy praw dostępu / uprawnień, skorzystaj z narzędzia do naprawy instalacji (`curl -sL https://iobroker.net/fix.sh | bash-`), aby naprawić te problemy i polecenie aktualizacji biegnij jeszcze raz.

## Linux/macOS (instalowany ręcznie)

Ręczna instalacja zwykle odbywa się pod rootem jako użytkownik, dlatego przed poleceniami konieczne jest „sudo”.

Wykonaj następujące polecenia w powłoce SSH (konsoli):
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade self`
* `sudo iobroker start` lub restart serwera, następnie ioBroker powinien się zrestartować i możesz być pewien, że wszystkie stare procesy zostały zakończone.

Jeśli polecenie aktualizacji wyświetla błędy uprawnień / uprawnień, napraw je. Czasami „sudo” nie wystarczy i musisz uruchomić instalację jako prawdziwy root (wcześniej po prostu `sudo su -`).

## Windows

Aby zaktualizować ioBroker w systemie Windows, pobierz odpowiedni instalator z żądaną wersją sterownika js ze strony pobierania https://www.iobroker.net/#en/download i dokonaj aktualizacji za jego pomocą. Za pomocą Instalatora Windows wcześniej ręcznie zainstalowane serwery lub instalacje z innych systemów operacyjnych można migrować do systemu Windows i aktualizować.

## Windows (zainstalowany ręcznie)

Ręczna instalacja odbywa się z uprawnieniami administratora. Uruchom okno wiersza polecenia cmd.exe jako administrator (kliknij prawym przyciskiem myszy cmd.exe i uruchom jako administrator) i wykonaj następujące polecenia:

* `cd C:\iobroker` (lub gdzie został zainstalowany ioBroker)
* `iobroker stop`, aby zatrzymać usługę ioBroker
* `iobroker status`, aby sprawdzić, czy ioBroker się skończył
* `iobroker update`
* `iobroker upgrade self`
* Uruchom usługę ioBroker lub uruchom ponownie komputer, następnie ioBroker powinien się zrestartować i możesz być pewien, że wszystkie stare procesy zostały zakończone.

## Awaryjne Linux / macOS / Windows (ręczna ponowna instalacja, jeśli jakoś nic nie działa po aktualizacji)

W systemie Windows najpierw wywołaj w menu Start pod „ioBroker” wiersz poleceń odpowiedniej instancji ioBroker. Właściwy katalog jest następnie ustawiany automatycznie. W systemie Linux lub macOS przejdź do katalogu ioBroker.

Uruchom tam `npm install iobroker.js-controller`. Konkretną wersję można zainstalować za pomocą npm install `iobroker.js-controller@x.y.z` (zamień x.y.z na żądaną wersję).

Jeśli występują problemy z prawami dostępu podczas uruchamiania w systemie Linux, polecenie należy nieco zmienić:

* W przypadku systemów utworzonych za pomocą nowego instalatora Linux: `sudo -u iobroker -H npm install iobroker.js-controller`
* W systemach instalowanych ręcznie pod Linuksem prefiks `sudo` lub uruchamiany jako root.

Ten sposób jest konieczny tylko w nielicznych przypadkach i wcześniej skonsultuj się z forum!
