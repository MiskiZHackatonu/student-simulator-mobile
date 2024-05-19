import { Stack } from "expo-router";

const StackNavigator = () => (
  <Stack>
    <Stack.Screen
      name="index"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="matchmaking_lobby"
      options={{
        title: "Lobby",
        headerBackTitle: "Zasady",
      }}
    />
    <Stack.Screen
      name="game_main"
      options={{
        title: "Tablica",
        headerBackTitle: "Zasady",
      }}
    />
  </Stack>
);

export default StackNavigator;
