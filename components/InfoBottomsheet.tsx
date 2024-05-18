import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'


const {height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5
const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 5

const gameInfo = {
    "UNIX" : {title: "UNIX", desc: "sdhlfkashdfjaslkdfhlakef"},
    "IO" : {title: "IO", desc: "sdhlfkashdfjaslkdfhlakef"},
    "BAZY" : {title: "BAZY", desc: "sdhlfkashdfjaslkdfhlakef"},
}

export default function Bottomsheet({ currentGameInfo, setCurrentGameInfo }) {
    const translateY = useSharedValue(0)
    const context = useSharedValue({y: 0})

    const gesture = Gesture.Pan()
    .onStart(e => {
        context.value = {y: translateY.value}
    })
    .onUpdate(e => {
        translateY.value = e.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y)
    })
    .onEnd(e => {
        if(translateY.value > -MIN_TRANSLATE_Y){
            translateY.value = withSpring(SCREEN_HEIGHT);
            setCurrentGameInfo("None");
        }
        if(translateY.value < -MIN_TRANSLATE_Y){
            translateY.value = withSpring(-MAX_TRANSLATE_Y)
        }
    })

    const reanimatedBottomStyle = useAnimatedStyle( e => {
        return {
            transform: [ {translateY: translateY.value} ]
        }
    })
    
    const scrollTo = ( destination ) => {
        'worklet'
        translateY.value = withSpring(destination, {damping: 50})
    }

    if (currentGameInfo == "None") {
        useEffect(() => {
            scrollTo(SCREEN_HEIGHT)
        }, [])
        return;
    } else {
        useEffect(() => {
            scrollTo( -SCREEN_HEIGHT/3)
        }, [])

        return (
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.bottomsheet_container, reanimatedBottomStyle]}>
                    <Text style={styles.title}>{gameInfo[currentGameInfo].title}</Text>
                    <Text style={styles.description}>{gameInfo[currentGameInfo].desc}</Text>
                </Animated.View>
            </GestureDetector>
          )
    }
}

const styles = StyleSheet.create({
    bottomsheet_container: {
        width: '100%',
        height: SCREEN_HEIGHT,
        backgroundColor: "#00f8",
        position: 'absolute',
        top: SCREEN_HEIGHT / 1.5,
        zIndex: 12000,
        borderRadius: 25,
        paddingHorizontal: 10
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#f8f8f8',
      },
      image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
      },
})