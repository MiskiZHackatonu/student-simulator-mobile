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
        title: "Opis zadania",
        headerShown: false,
      }}
    />
  </Stack>
);

export default StackNavigator;
