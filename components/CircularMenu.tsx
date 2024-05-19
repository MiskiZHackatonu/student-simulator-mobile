import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const CircularMenu = ({setGameInfo, itemParams}) => {
    const [containerLayout, setContainerLayout] = useState({x: 0, y: 0, width: 200, height: 200});
    const onLayout= (event) => {
        setContainerLayout(event.nativeEvent.layout)
        console.log(`${containerLayout.x} ${containerLayout.y} ${containerLayout.width} ${containerLayout.height} pressed`)
    }
    
    const center = {x: containerLayout.width / 2, y: containerLayout.height / 2}
    const itemProps = itemParams.map((params, index) => ({
        width: params.rad * 2, 
        height: params.rad * 2,
        top: params.pos_rad * Math.sin(params.ang) + center.y - params.rad,
        left: params.pos_rad * Math.cos(params.ang) + center.x - params.rad,
        borderRadius: params.rad,
        backgroundColor: params.backgroundColor
    }));

    const menuItems = itemProps.map((props, index) => (
        <TouchableOpacity
        key={index}
        style={[styles.menuItem, props]}
        onPress={() => {setGameInfo(itemParams[index].label)}}>
        <Text style={styles.menuItemText}>{itemParams[index].label}</Text>
        </TouchableOpacity>
    ));

    return (
        <View style={styles.container} onLayout={onLayout}>
            {menuItems}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuItem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  menuItemText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CircularMenu;
