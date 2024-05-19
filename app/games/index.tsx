import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, FlatList, Dimensions, ImageBackground, Text, View} from "react-native";
import InfoBottomsheet from "@/components/InfoBottomsheet";
import CircularMenu from "@/components/CircularMenu";
import QRButton from "@/components/QRButton";

const { width, height } = Dimensions.get('window');

const imageXD = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const DATA = [
  { id: '1', title: 'Page 1' },
  { id: '2', title: 'Page 2' },
  { id: '3', title: 'Page 3' },
  { id: '4', title: 'Page 4' },
];

const GamesList = () => {
  const [gameInfo, setGameInfo] = useState("None");

  return (
    <SafeAreaView style={styles.item}>
      <ImageBackground
      source={{uri: 'https://legacy.reactjs.org/logo-og.png'}}
      style={styles.backgroundImage}
      resizeMode="cover"
        >
      <CircularMenu setGameInfo={setGameInfo} />
      <InfoBottomsheet
        key={gameInfo}
        currentGameInfo={gameInfo}
        setCurrentGameInfo={setGameInfo}
      />
      </ImageBackground>
    </SafeAreaView>
    
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.item}>
    <FlatList
      data={DATA}
      renderItem={({ item }) => <GamesList/>}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={true}
      snapToAlignment="center"
      decelerationRate="fast"
    />
    <QRButton onPress={() => router.push("games/game3/qrCamera")}/>
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
    width,
    height,
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