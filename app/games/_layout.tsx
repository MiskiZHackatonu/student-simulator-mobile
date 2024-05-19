import { Stack } from "expo-router";
import { createContext, useState } from "react";

export const AllGamesContext = createContext({});

const StackNavigator = () => {
  const [completed, setCompleted] = useState([]);
  const [nick, setNick] = useState("Unknown");

  return (
    <AllGamesContext.Provider
      value={{
        completed,
        setCompleted,
        nick,
        setNick,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#13447e",
            },
          }}
        />
        <Stack.Screen
          name="qrCamera"
          options={{
            presentation: "modal",
            title: "Zeskanuj kod QR",
            headerShown: true,
          }}
        />
      </Stack>
    </AllGamesContext.Provider>
  );
};
export default StackNavigator;
