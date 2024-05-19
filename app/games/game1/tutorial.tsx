import {
  View,
  TextInput,
  SafeAreaView,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { AllGamesContext } from "../_layout";

export default function TutorialPage() {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(0);
  const { setCompleted } = useContext(AllGamesContext);

  return (
    <SafeAreaView>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View>
          <ThemedText
            style={{
              marginTop: 30,
              textAlign: "center",
            }}
            type="title"
          >
            UNIX - wstęp do obsługi terminala
          </ThemedText>
        </View>
        <View
          style={{
            marginTop: 40,
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <ThemedText>
            W grze będziesz poruszał się po terminalu komendami Unixowymi.{"\n"}
            {"\n"}
            Przydadtne komendy:{"\n"}
            {"\t"}• ls - wyświetla zawartość bieżącego katalogu {"\n"}
            {"\t"}• cd [nazwa katalogu] - zmienia katalog{"\n"}
            {"\t"}• cat [nazwa pliku] - wyświetla zawartość pliku{"\n"}
          </ThemedText>
        </View>
        <View>
          <ThemedText
            style={{ marginRight: "auto", marginLeft: "auto", marginTop: 40 }}
          >
            Podaj 4 słowo w Części I w zadaniu 1a
          </ThemedText>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginTop: 10,
              marginRight: "auto",
              marginLeft: "auto",
              minWidth: "50%",
              padding: 8,
            }}
            placeholder="Odpowiedź"
            value={answer}
            onChangeText={(text) => setAnswer(text)}
          />
          <View>
            <Pressable
              onPress={() => {
                if (AnswerValidation(answer)) {
                  setResult(1);
                  setCompleted((completed) => [...completed, "UNIX"]);
                  Alert.alert("Poprawna odpowiedź", "Gratulacje", [
                    {
                      text: "OK",
                      onPress: () => {
                        router.replace("/games");
                        while (router.canGoBack()) {
                          router.back();
                        }
                      },
                    },
                  ]);
                } else {
                  setResult(2);
                  Alert.alert("Błędna odpowiedź", "Spróbuj ponownie");
                }
              }}
            >
              <ThemedText
                style={{
                  marginTop: "40%",
                  fontSize: 22,
                  textAlign: "center",
                }}
                type="link"
              >
                Sprawdź odpowiedź
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// Część I: Pytania teoretyczne

//     1. Historia systemu UNIX
//         a) Kiedy i przez kogo został stworzony system UNIX?
function AnswerValidation(answer: string) {
  if (answer.toLowerCase() === "kogo") {
    return true;
  }
  return false;
}
