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

## Windows (nowy Instalator Windows)

W takim przypadku pobierz zaktualizowany instalator ze strony pobierania i wykonaj aktualizację za jego pomocą.

## Windows (zainstalowany ręcznie)
Ręczna instalacja zwykle odbywa się z uprawnieniami administratora

Wykonaj następujące polecenia w powłoce SSH administratora (konsoli):
* `cd C:\iobroker` (lub gdzie został zainstalowany ioBroker)
* ?? Zatrzymaj usługę ioBroker
* `iobroker update`
* `iobroker upgrade self`
* Uruchom usługę ioBroker lub uruchom ponownie komputer, następnie ioBroker powinien się zrestartować i możesz być pewien, że wszystkie stare procesy zostały zakończone.

## Emergency (ręczna ponowna instalacja) (jeśli jakoś nic nie działa po aktualizacji)
Przejdź do katalogu ioBroker i uruchom `npm install iobroker.js-controller`. Konkretną wersję można zainstalować za pomocą `npm install iobroker.js-controller@x.y.z` (zamień x.y.z na żądaną wersję).

Jeśli podczas wykonywania wystąpią problemy z dostępem, polecenie należy nieznacznie zmienić:
* W przypadku systemów utworzonych za pomocą nowego instalatora Linux: `sudo -u iobroker -H npm install iobroker.js-controller`
* W systemach instalowanych ręcznie pod Linuksem prefiks `sudo` lub uruchamiany jako root.
* W systemach Windows wystarczy powłoka administratora

Ten sposób jest konieczny tylko w nielicznych przypadkach i wcześniej skonsultuj się z forum!
