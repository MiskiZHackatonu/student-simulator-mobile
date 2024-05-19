import { router } from "expo-router";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, FlatList, Dimensions, ImageBackground, Text, View, Pressable } from "react-native";
import InfoBottomsheet from "@/components/InfoBottomsheet";
import CircularMenu from "@/components/CircularMenu";
import QRButton from "@/components/QRButton";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AllGamesContext } from "./_layout";
import { ThemedText } from "@/components/ThemedText";

const { width, height } = Dimensions.get('window');
const s1_image = require('./../../assets/images/wydzial.jpg')
const s2_image = require('./../../assets/images/wydzial.jpg')

const s1_itemParams = [
  {rad: width / 5, ang: 149, pos_rad: 120, label: "BAZY", backgroundColor: 'blue'},
  {rad: width / 10, ang: 20, pos_rad: 120, label: "SYSOPY", backgroundColor: 'green'}
]
const s2_itemParams = [
  {rad: width / 6, ang: 50, pos_rad: 100, label: "UNIX", backgroundColor: 'yellow'}, 
  {rad: width / 8, ang: 110, pos_rad: 100, label: "IO", backgroundColor: 'red'},
]

const data = [
  {image: s1_image, params: s1_itemParams}, 
  {image: s2_image, params: s2_itemParams}
]
type ParamList = {
  params: {
    nick: string;
  };
};

const Screen = ({gameInfo, setGameInfo, itemParams, image}) => {

  const {completed, setCompleted} = useContext(AllGamesContext)

  return (
    <SafeAreaView style={styles.item}>
    <ImageBackground
    source={image}
    style={styles.backgroundImage}
    resizeMode="cover"
      >
    <CircularMenu setGameInfo={setGameInfo} itemParams={itemParams} completed={completed}/>
    <InfoBottomsheet
      key={gameInfo}
      currentGameInfo={gameInfo}
      setCurrentGameInfo={setGameInfo}
    />
    </ImageBackground>
  </SafeAreaView>
  )
}


const App = () => {
  const [gameInfo, setGameInfo] = useState("None");
  const route = useRoute<RouteProp<ParamList, 'params'>>();
  const { nick } = route.params;
  const navigation = useNavigation();


  // const handleGameClick = (gameName: string) => {
  //   if (games.includes(gameName)) {
  //     router.push(`/games/${gameName.toLowerCase().replace(" ", "")}`);
  //   }
  // };

  const logOut = useCallback(async () => {
    await AsyncStorage.removeItem("nick");
    router.replace({
      pathname: "/games/game6",
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ThemedText>Welcome, {nick}!</ThemedText>
      ),
      headerRight: () => (
        <Pressable onPress={logOut}>
          <ThemedText>Logout</ThemedText>
        </Pressable>
      ),
    });
  }, [navigation, logOut, nick]);

  return (
    <SafeAreaView style={styles.item}>
    <FlatList
      data={data}
      renderItem={({ item }) => <Screen 
        gameInfo = {gameInfo} 
        setGameInfo={setGameInfo} 
        itemParams={item.params} 
        image={item.image}/>}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={true}
      snapToAlignment="center"
      decelerationRate="fast"
    />
    <QRButton style={{
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
    }} onPress={() => router.push("/games/qrCamera")}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 32,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;