import { Dimensions, StyleSheet, Text, View, ThemedText} from "react-native";
import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5;
const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 5;

// const gameInfo = {
//   UNIX: { title: "UNIX", desc: "sdhlfkashdfjaslkdfhlakef" },
//   IO: { title: "IO", desc: "sdhlfkashdfjaslkdfhlakef" },
//   BAZY: { title: "BAZY", desc: "sdhlfkashdfjaslkdfhlakef" },
//   SYSOPY: { title: "SYSOPY", desc: "sdhlfkashdfjaslkdfhlakef" },
// };

// const unix_title = () => {
//     return (<ThemedText
//     style={{
//       marginTop: 90,
//       textAlign: "center",
//     }}
//     type="title"
//   >
//     Semestr 3 - bazy danych
//   </ThemedText>)
// }

const gameInfo = {
    BAZY: { 
        title: "Semestr 3 - bazy danych",
        desc: 
        "    Znajdujesz się na semestrze trzecim, gdzie do zdania masz przedmiot\
Bazy danych! W tym roku aby zaliczyć przedmiot należy napisać \
kolokwium zaliczeniowe. Dostaniesz trzy pytania z zakresu SQL - dla \
każdego z nich musiz poprawnie ułożyć zapytanie SQL. Niestety twoj \
wiedza jest zerowa - nic dziwnego, przecież nic się nie uczyłeś cały \
semestr a dopiero 2h przed terminem ogarnąłeś że masz kolosa. \
Dodatkowo to kolokwium musisz niestety napisać na 100%. Na szczęście \
prowadzący czasami wychodzi z sali, a więc masz szansę na pomoc od \
kolegów - podejdź do nich skanując kod QR i skorzystaj z ich wiedzy!" 
    },
    IO: { 
        title: "Semestr 6 - IO", 
        desc: "Inżynierka pisze sie pełną parą, a twój promotor nagle wymyślił sobie zmiane platformy do zarządzania projektem. \
Software ten zapewnia Zwiększenie współpracy i synergii w celu optymalizacji procesów oraz osiągnięcia wspólnych celów strategicznych \
poprzez ukrywanie części informacji między użytkownikami zmuszając ich do większej kominukacji. \
Toim celem jest przeniesienie ze projektu na nowego kandama z pomocą drugiego gracza."},
    UNIX: { 
        title: "Semestr 1 - UNIX-Y",
        desc: "Zbliża sie termin poprawkowy egzaminu z Unixów, a Ty nie masz pojęcia \
o co chodzi. Twoi koledzy tak samo jak Ty nie przykładali się do \
nauki. Już nie masz szans nauczyć się wszystkiego na pamięć, zostało \
Ci tylko jedno wyjście - włamanie do systemu uczelni i zmiana zdobycie \
pytań na egzamin. Twoim zadaniem jest poruszanoe sie po terminalu \
komendami Unixowymi i odnalezienie pytań na egzamin poprawkowy. Twoi \
znajomi z roku liczą na Ciebie, nie zawiedź ich!" 

    },
    ASD: { 
        title: "Semestr 2 - ASD", 
        desc: "Znajdujesz się na semestrze drugim, gdzie do zdania masz przedmiot \
Algorytmy i Struktury Danych! W tym roku aby zaliczyć przedmiot \
należy napisać prosty algorytm. Po wejściu zobaczysz mapę AGH oraz studenta, \
który wraca z piątkowych zajęć. Twoim zadaniem jest napisać algorytm, \
dzięki czemu student dojdzie do akademika. Pamiętaj, że zbliża się weekend, \
dlatego aby algorytm był poprawny, student musi po drodzę zebrać wszystkie \
butelki piwa! Niestety twoja wiedza algorytmiczna jest zerowa - nic dziwnego, \
przecież nie ma co się uczyć w trakcie semestru. Na szczęście możesz znaleźć \
porozrzucane kody QR po sali, dzięki czemu skanując je, poznasz \
bloczkowe procedury, dzięki czemu będziesz w stanie napisać algorytm!"
    },
  };

export default function Bottomsheet({ currentGameInfo, setCurrentGameInfo }) {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart((e) => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
    })
    .onEnd((e) => {
      if (translateY.value > -MIN_TRANSLATE_Y) {
        runOnJS(setCurrentGameInfo)("None");
        translateY.value = withSpring(SCREEN_HEIGHT);
      }
      if (translateY.value < -MIN_TRANSLATE_Y) {
        translateY.value = withSpring(-MAX_TRANSLATE_Y);
      }
    });

  const reanimatedBottomStyle = useAnimatedStyle((e) => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const scrollTo = (destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  };

  useEffect(() => {
    if (currentGameInfo === "None") {
      scrollTo(SCREEN_HEIGHT);
    } else {
      scrollTo(-SCREEN_HEIGHT/3);
    }
  }, [currentGameInfo, scrollTo]);

  if (currentGameInfo === "None") {
    return null;
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.bottomsheet_container, reanimatedBottomStyle]}>
        <Text style={styles.title}>{gameInfo[currentGameInfo].title}</Text>
        <Text style={styles.description}>{gameInfo[currentGameInfo].desc}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  bottomsheet_container: {
    width: "100%",
    height: SCREEN_HEIGHT,
    backgroundColor: "#d9d9d9",
    position: "absolute",
    top: SCREEN_HEIGHT / 1.5,
    zIndex: 12000,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    color: "#84acce",
    margin: 20,
  },
});
