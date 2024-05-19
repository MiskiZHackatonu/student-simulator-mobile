import {
  Alert,
  Pressable,
  SafeAreaView,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import QRButton from "@/components/QRButton";
import DuoDragDrop, { Lines, Placeholder } from "@/vendor/duo-drag-drop";
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
    if (isEqual(ref.current?.getWords().answered, validSequence)) {
      onNext();
    } else {
      Alert.alert(
        "Psssssst",
        "Jesteś pewien tej odpowiedzi? Musisz tego kolosa zaliczyć na 100%!"
      );
    }
  };

  const [offsetY, setOffsetY] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);

  useEffect(() => {
    // TODO: Please change that in the future - caused by the shitty DuoDragDrop component
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const onLayout = useCallback((e) => {
    const { height } = e.nativeEvent.layout;
    const numberOfLines = Math.round(height / 54);

    // TODO: Please change that in the future - caused by the shitty DuoDragDrop component
    if (numberOfLines === 8) {
      setOffsetY(-120);
    } else if (numberOfLines === 7) {
      setOffsetY(-100);
    } else if (numberOfLines === 6) {
      setOffsetY(-70);
    } else if (numberOfLines === 5) {
      setOffsetY(-50);
    } else if (numberOfLines === 4) {
      setOffsetY(-20);
    } else if (numberOfLines === 3) {
      setOffsetY(5);
    } else if (numberOfLines === 2) {
      setOffsetY(35);
    } else {
      setOffsetY(50);
    }
  }, []);

  return (
    <>
      {isVisible && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(255, 255, 255)",
            zIndex: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      )}
      <SafeAreaView
        style={{
          height: "100%",
          padding: 20,
        }}
      >
        <ScrollView>
          <ThemedText
            style={{
              padding: 20,
              marginTop: 40,
              marginBottom: 50,
            }}
            type="subtitle"
          >
            {question}
          </ThemedText>
          <View
            style={{
              marginTop: 0,
            }}
          >
            <DuoDragDrop
              ref={ref}
              wordBankOffsetY={offsetY}
              words={wordBank}
              renderLines={(props) => (
                <Lines {...props} onLayout={onLayout} numLines={3} />
              )}
              renderPlaceholder={(props) => <Placeholder {...props} />}
            />
          </View>
        </ScrollView>
        <Pressable
          style={{
            marginLeft: "auto",
            marginRight: 20,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 18,
          }}
          onPress={validate}
        >
          <ThemedText
            style={{
              textAlign: "center",
              fontSize: 20,
            }}
            type="link"
          >
            Następne pytanie
          </ThemedText>
        </Pressable>
        <QRButton
          style={{
            position: "absolute",
            bottom: 40,
            left: 20,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 50,
            zIndex: 100,
          }}
          onPress={() => router.push("/games/game3/qrCamera")}
        />
      </SafeAreaView>
    </>
  );
}
