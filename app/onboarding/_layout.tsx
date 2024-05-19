import { Stack } from "expo-router";

const StackNavigator = () => (
  <Stack
    screenOptions={{
      headerShown: false,
      animation: 'none'
    }}
  />
);

export default StackNavigator;
