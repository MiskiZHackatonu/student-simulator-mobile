import { View, Text, Button, Pressable} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";

export default function LobbyPage() {
  const [matchmaking_code, setMatchmakingCode] = useState("");

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
        <Button title= "Rozpocznij" onPress={() => findCompanion(matchmaking_code)}/>
    </View>
  );
}

function findCompanion(matchmaking_code: string) {
    console.log("Finding companion with matchmaking code: " + matchmaking_code)
    //router.push("/games/game6/matchmaking_lobby") idk????
    }