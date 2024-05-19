## Zainstaluj Node.js
Expo wymaga Node.js, środowiska uruchomieniowego JavaScript. Pobierz go ze [strony oficjalnej Node.js](https://nodejs.org/) i zainstaluj.

## Zainstaluj Expo
Expo jest narzędziem, które pomaga w budowaniu aplikacji React Native. Możesz zainstalować Expo, używając npm (Node Package Manager), który powinien być już zainstalowany, jeśli zainstalowałeś Node.js. Otwórz terminal lub wiersz poleceń i uruchom następujące polecenie:

```bash
npm install -g expo-cli
```

### W folderze z expo 

1. Zainstaluj zależności:

```bash
npm install
```

2. Odpal apke 

```bash
npx expo start
```

W wynikach znajdziesz opcje otwarcia aplikacji w:

- [wersji deweloperskiej](https://docs.expo.dev/develop/development-builds/introduction/)
- [emulatorze Androida](https://docs.expo.dev/workflow/android-studio-emulator/)
- [symulatorze iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), ograniczonym środowisku do próbowania tworzenia aplikacji z Expo

Możesz zacząć rozwijanie aplikacji poprzez edycję plików w katalogu **app**. Ten projekt korzysta z [routingu opartego na plikach](https://docs.expo.dev/router/introduction).

## Na serwerze node.js

1. Zainstaluj zależności:
```bash
npm install
```

2. Odpal apke 

```bash
npm run dev
```

## Uruchomienie klienta

Zainstaluj aplikacje Expo na telefonie:

Aplikacja Expo jest dostępna zarówno dla Androida, jak i iOS. Możesz ją pobrać z Google Play Store lub Apple App Store. Po zainstalowaniu aplikacji, będziesz mógł skanować kod QR generowany przez Expo CLI, aby uruchomić swoją aplikację bezpośrednio na swoim urządzeniu.

- [Expo na Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US)
- [Expo na Apple App Store](https://apps.apple.com/us/app/expo-go/id982107779)

Aby odpalić nalezy zeskanować kod QR z serwera
