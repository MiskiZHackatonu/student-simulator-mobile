import { View, Text, Button, Pressable} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";
import { matchmaking } from "@/app/onboarding/api";
import { AllGamesContext } from "../_layout";

export default function LobbyPage() {
  const [matchmaking_code, setMatchmakingCode] = useState("");
  const {nick} = useContext(AllGamesContext)

  return (
    <View>
      <Text>
        Tutorial:{'\n'}
        1. Znajdź drugą osobę, która chce zagrać w grę.{'\n'}
        2. Wpiszcie obydwoje ten sam kod matchmakingu.{'\n'}
        3. Naciśnijcie przycisk "Rozpocznij".{'\n'}
        Po połączeniu z drugą osobą zostaniecie przeniesieni do lobby gry waszym zadaniem będzie wspólne rozwiązanie
        zadania.{'\n'}
        
      </Text>
      <View>
        <TextInput
            value={matchmaking_code}
            onChangeText={setMatchmakingCode}/>
        </View>
        <Button title= "Rozpocznij" onPress={() => findCompanion(matchmaking_code, nick)}/>
    </View>
  );
}

async function findCompanion(matchmaking_code: string, nick) {
    const page_type = await matchmaking(matchmaking_code, nick)
    console.log(`got nick: ${nick}`)
    router.push({ pathname: "/games/game6/game_main", params: { player_id: page_type,lobby_id: matchmaking_code } });
    console.log("Finding companion with matchmaking code: " + matchmaking_code)
    //router.push("/games/game6/matchmaking_lobby") idk????
    }