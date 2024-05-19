import { Stack } from "expo-router";
import { createContext, useState} from "react";

export const AllGamesContext = createContext({})

const StackNavigator = () => {
  const [completed, setCompleted] = useState([])
  
  return(
   < AllGamesContext.Provider value={{
    completed, setCompleted
   }}>
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
  </AllGamesContext.Provider>
);
}
export default StackNavigator;
