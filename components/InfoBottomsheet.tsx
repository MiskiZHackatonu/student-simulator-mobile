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
        title: "IO", 
        desc: 
        "sdhlfkashdfjaslkdfhlakef" },
    UNIX: { 
        title: "UNIX",
        desc: "sdhlfkashdfjaslkdfhlakef" 
    },
    SYSOPY: { 
        title: "SYSOPY", 
        desc: "sdhlfkashdfjaslkdfhlakef" 
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
