import Game3Context from "@/contexts/Game3Context";
import { Stack } from "expo-router";
import { useState } from "react";

const defaultWordBank = ["SELECT", "users", "agh"];

const StackNavigator = () => {
  const [wordBank, setWordBank] = useState<string[]>(defaultWordBank);
  return (
    <Game3Context.Provider
      value={{
        wordBank,
        setWordBank,
      }}
    >
      <Stack>
        <Stack.Screen
          name="qrCamera"
          options={{
            presentation: "modal",
            title: "QR Camera",
          }}
        />
      </Stack>
    </Game3Context.Provider>
  );
};

export default StackNavigator;
