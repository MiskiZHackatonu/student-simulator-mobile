import { Stack } from "expo-router";
import { createContext, useState } from "react";

export const Game2Context = createContext({});

const StackNavigator = () => {
  const [moves, setMoves] = useState([]);

  return (
    <Game2Context.Provider
      value={{
        moves,
        setMoves,
      }}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="gameplay"
          options={{
            title: "Gra",
            headerStyle: {
              backgroundColor: "rgb(160,172,38)",
            },
            headerBackTitle: "Zasady",
          }}
        />
        <Stack.Screen
          name="qrCamera"
          options={{
            presentation: "modal",
            title: "Zeskanuj kod QR",
            headerBackTitle: "Zasady",
          }}
        />
      </Stack>
    </Game2Context.Provider>
  );
};

export default StackNavigator;
