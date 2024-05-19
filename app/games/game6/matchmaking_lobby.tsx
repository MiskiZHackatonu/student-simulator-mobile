import { View, Text, Button, Pressable, ScrollView} from "react-native";
import React, { useState,useContext } from "react";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";
import { matchmaking } from "@/app/onboarding/api";
import { AllGamesContext } from "../_layout";
import { ThemedText } from "@/components/ThemedText";
export default function LobbyPage() {
  const [matchmaking_code, setMatchmakingCode] = useState("");
  const {nick} = useContext(AllGamesContext)

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 60}} style={{
      padding:20,
      
    }}>
      <ThemedText
          style={{
            marginTop: 0,
            textAlign: "left",
          }}
        >
      Tutorial matchmakingu:{'\n'}
      1. Znajdź drugą osobę, która chce zagrać w grę.{'\n'}
      2. Wpiszcie obydwoje ten sam kod matchmakingu.{'\n'}
      3. Naciśnijcie przycisk "Rozpocznij".{'\n'}
      Po połączeniu z drugą osobą zostaniecie przeniesieni do lobby gry waszym zadaniem będzie wspólne rozwiązanie
      zadania.{'\n'}

      Tutorial gry:{'\n'}
      Na ekranie zobaczysz 2 zbiory kart.{'\n'}
      Te na górze należą do drugiego gracza, nie możesz nimi poruszać ale posiadasz informacje o ich wartościach.{'\n'}
      Twoje karty znajdują się na dole.{'\n'}
      Waszym zadaniem jest ułożenie kart w odpowiednich kolumnach tak aby suma wartości kart w kolumnie była równa wartości na dole kolumny.{'\n'}
      Celem gry jest aby obydwoje graczy ułoży karty w odpowiednich kolumnach 
      </ThemedText>
      <View>
        <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginTop: 10,
              marginRight: "auto",
              marginLeft: "auto",
              minWidth: "50%",
              padding: 8,
            }}
            placeholder="kod matchmakingu"
            value={matchmaking_code}
            onChangeText={setMatchmakingCode}/>
        </View>
        <Button title= "Rozpocznij" onPress={() => findCompanion(matchmaking_code, nick)}/>
    </ScrollView>
  );
}

async function findCompanion(matchmaking_code: string, nick) {
    const page_type = await matchmaking(matchmaking_code, nick)
    console.log(`got nick: ${nick}`)
    router.push({ pathname: "/games/game6/game_main", params: { player_id: page_type,lobby_id: matchmaking_code } });
    console.log("Finding companion with matchmaking code: " + matchmaking_code)
    //router.push("/games/game6/matchmaking_lobby") idk????
    }