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
      name="tutorial"
      options={{
        headerBackTitle: "Wróć",
        title: "Opis zadania",
      }}
    />
  </Stack>
);

export default StackNavigator;
