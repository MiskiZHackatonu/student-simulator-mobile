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
      name="qrCamera"
      options={{
        presentation: "modal",
        title: "Zeskanuj kod QR",
      }}
    />
  
  </Stack>
);

export default StackNavigator;
