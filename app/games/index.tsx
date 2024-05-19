import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, FlatList, Dimensions, ImageBackground, Text, View, Pressable } from "react-native";
import InfoBottomsheet from "@/components/InfoBottomsheet";
import CircularMenu from "@/components/CircularMenu";
import QRButton from "@/components/QRButton";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');

const imageXD = { uri: 'https://legacy.reactjs.org/logo-og.png' };

const DATA = [
  { id: '1', title: 'Page 1' },
  { id: '2', title: 'Page 2' },
  { id: '3', title: 'Page 3' },
  { id: '4', title: 'Page 4' },
];

const GamesList = () => {
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
      <ImageBackground
        source={{ uri: 'https://legacy.reactjs.org/logo-og.png' }}
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
        renderItem={({ item }) => <GamesList />}
        keyExtractor={item => item.id}
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
      }} onPress={() => router.push("/games/qrCamera")} />
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