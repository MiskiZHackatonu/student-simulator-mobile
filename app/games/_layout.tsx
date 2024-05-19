import { Stack } from "expo-router";
import { createContext, useState} from "react";

export const AllGamesContext = createContext({})

const StackNavigator = () => {
  const [completed, setCompleted] = useState([])
  const [nick, setNick] = useState("Unknown")
  
  return(
   <AllGamesContext.Provider value={{
    completed, setCompleted, nick, setNick
   }}>
  <Stack>
    <Stack.Screen
          name="index"
          options={{
            headerShown: true,
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
  </AllGamesContext.Provider>
);

}
export default StackNavigator;
