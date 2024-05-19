import Game3Context from "@/contexts/Game3Context";
import { Stack } from "expo-router";
import { useState } from "react";

const defaultWordBank = ["SELECT", "*", "WYBIERZ", "DEFINE", "DISTINCT"];

const StackNavigator = () => {
  const [wordBank, setWordBank] = useState<string[]>(defaultWordBank);
  const [foundHelps, setFoundHelps] = useState<string[]>([]);

  return (
    <Game3Context.Provider
      value={{
        wordBank,
        setWordBank,
        foundHelps,
        setFoundHelps,
      }}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            presentation: 'modal'
          }}
        />
        <Stack.Screen
          name="q1"
          options={{
            headerBackTitle: "Zasady",
            title: "Pytanie 1",
          }}
        />
        <Stack.Screen
          name="q2"
          options={{
            title: "Pytanie 2",
          }}
        />
        <Stack.Screen
          name="q3"
          options={{
            title: "Pytanie 3",
          }}
        />
        <Stack.Screen
          name="help1"
          options={{
            title: "Pomoc nr 1",
          }}
        />
        <Stack.Screen
          name="help2"
          options={{
            title: "Pomoc nr 2",
          }}
        />
        <Stack.Screen
          name="help3"
          options={{
            title: "Pomoc nr 3",
          }}
        />
        <Stack.Screen
          name="qrCamera"
          options={{
            presentation: "modal",
            title: "Zeskanuj kod QR",
          }}
        />
      </Stack>
    </Game3Context.Provider>
  );
};

export default StackNavigator;
