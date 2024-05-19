import { router } from "expo-router";
import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import InfoBottomsheet from "@/components/InfoBottomsheet";
import CircularMenu from "@/components/CircularMenu";
import QRButton from "@/components/QRButton";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AllGamesContext } from "./_layout";
import { ThemedText } from "@/components/ThemedText";

const { width, height } = Dimensions.get("window");
const s1_image = require("./../../assets/images/1.jpg");
const s2_image = require("./../../assets/images/2.jpg");
const background_wiet = require("./../../assets/images/background_wiet.jpg");

const s1_itemParams = [
  {
    rad: width / 5,
    ang: 10,
    pos_rad: 10,
    label: "BAZY",
    backgroundColor: "#F6A200",
  },
  {
    rad: width / 10,
    ang: 10.05,
    pos_rad: 170,
    label: "ASD",
    backgroundColor: "#13447E",
  },
];
const s2_itemParams = [
  {
    rad: width / 6,
    ang: 50,
    pos_rad: 100,
    label: "UNIX",
    backgroundColor: "#F6A200",
  },
  {
    rad: width / 8,
    ang: 110,
    pos_rad: 100,
    label: "IO",
    backgroundColor: "#13447E",
  },
];

const useless_items = [
  {
    rad: width / 6,
    ang: 4,
    pos_rad: -250,
    label: "NON_CLICKABLE",
    backgroundColor: "#13447E",
  },
  {
    rad: width / 6,
    ang: 5.4,
    pos_rad: 130,
    label: "NON_CLICKABLE",
    backgroundColor: "#84acca",
  },
  {
    rad: width / 4,
    ang: 4.5,
    pos_rad: 200,
    label: "CYFRÓWKA",
    backgroundColor: "#84ACCE",
  },
  {
    rad: width / 12,
    ang: 5.1,
    pos_rad: 230,
    label: "NON_CLICKABLE",
    backgroundColor: "#13447E",
  },
  {
    rad: width / 18,
    ang: 5.33,
    pos_rad: 350,
    label: "NON_CLICKABLE",
    backgroundColor: "#84ACCE",
  },
  {
    rad: width / 10,
    ang: 2.5,
    pos_rad: 150,
    label: "NON_CLICKABLE",
    backgroundColor: "#84ACCE",
  },
];

const useless_items_s2 = [
  {
    rad: width / 6,
    ang: 4,
    pos_rad: -250,
    label: "SIECI",
    backgroundColor: "#13447E",
  },
  {
    rad: width / 6,
    ang: 5.4,
    pos_rad: 130,
    label: "NON_CLICKABLE",
    backgroundColor: "#84acca",
  },
  {
    rad: width / 4,
    ang: 4.5,
    pos_rad: 200,
    label: "DYSKRETNA",
    backgroundColor: "#84ACCE",
  },
  {
    rad: width / 12,
    ang: 5.1,
    pos_rad: 230,
    label: "NON_CLICKABLE",
    backgroundColor: "#13447E",
  },
  {
    rad: width / 18,
    ang: 5.33,
    pos_rad: 350,
    label: "NON_CLICKABLE",
    backgroundColor: "#84ACCE",
  },
  {
    rad: width / 10,
    ang: 2.5,
    pos_rad: 150,
    label: "NON_CLICKABLE",
    backgroundColor: "#84ACCE",
  },
];

const data = [
  { image: s1_image, params: [...useless_items, ...s1_itemParams] },
  { image: s2_image, params: [...useless_items_s2, ...s2_itemParams] },
];
type ParamList = {
  params: {
    nick: string;
  };
};

const Screen = ({ gameInfo, setGameInfo, itemParams, image }) => {
  const { completed } = useContext(AllGamesContext);

  return (
    <SafeAreaView style={styles.item}>
      {/* <ImageBackground
    source={image}
    style={styles.backgroundImage}
    resizeMode="cover"
      > */}
      <CircularMenu
        setGameInfo={setGameInfo}
        itemParams={itemParams}
        completed={completed}
      />
      <InfoBottomsheet
        key={gameInfo}
        currentGameInfo={gameInfo}
        setCurrentGameInfo={setGameInfo}
      />
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

const App = () => {
  const [gameInfo, setGameInfo] = useState("None");
  const route = useRoute<RouteProp<ParamList, "params">>();
  const { nick } = route.params;
  const navigation = useNavigation();
  const [backgroundOffset, setBackgroundOffset] = useState(0);

  const { setNick } = useContext(AllGamesContext);
  setNick(nick);

  // const handleGameClick = (gameName: string) => {
  //   if (games.includes(gameName)) {
  //     router.push(`/games/${gameName.toLowerCase().replace(" ", "")}`);
  //   }
  // };

  const logOut = useCallback(async () => {
    await AsyncStorage.removeItem("nick");
    router.replace({
      pathname: "/onboarding",
    });
  }, []);

  useEffect(() => {
    console.log(`got nick ${nick}`);
    navigation.setOptions({
      headerTitle: () => <ThemedText>Welcome, {nick}!</ThemedText>,
      headerRight: () => (
        <Pressable onPress={logOut}>
          <ThemedText>Logout</ThemedText>
        </Pressable>
      ),
    });
  }, [navigation, logOut, nick]);

  return (
    <SafeAreaView style={styles.item}>
      <View>
        <Image
          style={{
            height: height,
            width: width * 3,
            position: "absolute",
            top: -50,
            left: backgroundOffset - width / 2 - 250,
          }}
          source={background_wiet}
        />
      </View>
      <FlatList
        data={data}
        onScroll={(event) => {
          const scrolling = -event.nativeEvent.contentOffset.x;
          setBackgroundOffset(scrolling);
        }}
        renderItem={({ item }) => (
          <Screen
            gameInfo={gameInfo}
            setGameInfo={setGameInfo}
            itemParams={item.params}
            image={item.image}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        snapToAlignment="center"
        decelerationRate="fast"
      />
      <QRButton
        style={{
          position: "absolute",
          bottom: 40,
          left: 20,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 50,
          zIndex: 100,
        }}
        onPress={() => router.push("/games/qrCamera")}
      />
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    width,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 32,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default App;
