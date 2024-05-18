import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Draggable from 'react-native-draggable';

export default function Game2() {
    const [scriptBlocks, setScriptBlocks] = useState([]);
    const [nextId, setNextId] = useState(0);

    const addBlockToScript = (type) => {
        setScriptBlocks([...scriptBlocks, { type, id: nextId }]);
        setNextId(nextId + 1);
    };

    const removeBlockFromScript = (id) => {
        setScriptBlocks(scriptBlocks.filter(block => block.id !== id));
    };

    const renderScriptBlocks = () => {
        return scriptBlocks.map((block) => (
            <TouchableOpacity key={block.id} style={styles.scriptBlock} onPress={() => removeBlockFromScript(block.id)}>
                <Text>{block.type}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.scriptArea}>
                {renderScriptBlocks()}
            </View>
            <View style={styles.simulationArea}>
                <Text>Simulation Area</Text>
            </View>
            <View style={styles.blocksArea}>
                {['Up', 'Down', 'Left', 'Right'].map((direction, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.block}
                        onPress={() => addBlockToScript(direction)}
                    >
                        <Text>{direction}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    scriptArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    simulationArea: {
        flex: 2,
        backgroundColor: '#fff',
        padding: 10,
        borderLeftWidth: 1,
        borderColor: '#ddd',
    },
    blocksArea: {
        flex: 1,
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    scriptBlock: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#add8e6',
        borderRadius: 5,
    },
});

