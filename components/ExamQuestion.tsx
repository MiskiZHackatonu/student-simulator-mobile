import { Alert, Pressable, SafeAreaView } from "react-native";
import React, { useCallback, useRef } from "react";
import QRButton from "@/components/QRButton";
import DuoDragDrop, { Lines } from "@/vendor/duo-drag-drop";
import { ThemedText } from "@/components/ThemedText";
import Game3Context from "@/contexts/Game3Context";
import { router } from "expo-router";

const isEqual = (array1: any[], array2: any[]) =>
  array1.length === array2.length &&
  array1.every((value, index) => value === array2[index]);

export default function Exam({ question, onNext, validSequence }) {
  const { wordBank } = React.useContext(Game3Context);
  const ref = useRef(null);

  const validate = () => {
    console.log(ref.current?.getWords().answered);
    if (isEqual(ref.current?.getWords().answered, validSequence)) {
      onNext();
    } else {
      Alert.alert("Błędna odpowiedź", "Spróbuj ponownie");
    }
  };

  return (
    <SafeAreaView
      style={{
        height: "100%",
        padding: 20,
      }}
    >
      <ThemedText
        style={{
          padding: 20,
          marginBottom: 50,
        }}
        type="subtitle"
      >
        {question}
      </ThemedText>
      <DuoDragDrop
        ref={ref}
        renderLines={(props) => (
          <Lines
            {...props}
            numLines={2}
            containerStyle={{ backgroundColor: "transparent" }}
            lineStyle={{ borderColor: "#CCC" }}
          />
        )}
        words={wordBank}
      />
      <Pressable
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onPress={validate}
      >
        <ThemedText
          style={{
            textAlign: "center",
          }}
          type="link"
        >
          Sprawdź
        </ThemedText>
      </Pressable>
      <QRButton onPress={() => router.push("/games/game3/qrCamera")} />
    </SafeAreaView>
  );
}
