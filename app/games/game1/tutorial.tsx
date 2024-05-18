import { View, Text, Button, TextInput} from "react-native";
import React, { useState } from "react";
export default function TutorialPage(){
    const [answer, setAnswer] = useState("")
    const [result, setResult] = useState(0)
    return (
        <View>
            <View>
                <Text>
                    Witaj w tutorialu obsługi terminala Unixowego.
                </Text>
            </View>
            <View>
                <Text>
                    W grze będziesz poruszał się po terminalu komendami Unixowymi.{"\n"}
                    Przydadtne komendy:{"\n"}
                    ls - wyświetla zawartość bieżącego katalogu{"\n"}
                    cd [nazwa katalogu] - zmienia katalog{"\n"}
                    np. cd Documents{"\n"} - przechodzi do katalogu Documents{"\n"}
                    cat [nazwa pliku] - wyświetla zawartość pliku{"\n"}
                    np cat plik.txt{"\n"} - wyświetla zawartość pliku file.txt{"\n"}
                </Text>
            </View>
            <View>
                <Text>Podaj 4 słowo w Części I zadaniu 1a</Text>
                <View>
                    <TextInput
                    value={answer}
                    onChangeText={setAnswer}/>

                </View>
                <View>
                    <Button title="Sprawdź odpowiedź" onPress={() => {
                        if(AnswerValidation(answer)){
                            setResult(1)
                        }else{
                            setResult(2)
                        }
                    }} />
                {result === 0 ? <Text></Text> : result === 1 ? <Text>Poprawna odpowiedź</Text>:<Text>Błedna odpowiedź</Text>}
                </View>
            </View>
        </View>
    )
}
// Część I: Pytania teoretyczne

//     1. Historia systemu UNIX
//         a) Kiedy i przez kogo został stworzony system UNIX?
function AnswerValidation(answer: string){
    console.log(answer)
    if(answer === "kogo"){
      return true 
    }
    return false
  }