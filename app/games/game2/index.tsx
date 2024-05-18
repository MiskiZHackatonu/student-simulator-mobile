import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Draggable from 'react-native-draggable';

export default function Game2() {
    const [scriptBlocks, setScriptBlocks] = useState([]);

    const addBlockToScript = (type) => {
        let indentLevel = 0;
        if (scriptBlocks.length > 0) {
            const lastBlock = scriptBlocks[scriptBlocks.length - 1];
            indentLevel = lastBlock.indentLevel;
            if (lastBlock.type === 'Powtórz' && type !== 'Koniec powtórzenia') {
                indentLevel += 1;
            }
        }

        if (type === 'Koniec powtórzenia') {
            indentLevel = scriptBlocks.filter(block => block.type === 'Powtórz').length - 1;
        }

        const newBlock = {
            type,
            id: scriptBlocks.length,
            count: 1,
            indentLevel,
        };

        if (type === 'Skocz' || type === 'Koniec powtórzenia') {
            delete newBlock.count; // Skocz and Koniec powtórzenia don't have a count field
        }

        setScriptBlocks([...scriptBlocks, newBlock]);
    };

    const removeBlockFromScript = (id) => {
        setScriptBlocks(scriptBlocks.filter(block => block.id !== id));
    };

    const updateBlockCount = (id, count) => {
        const parsedCount = parseInt(count);
        setScriptBlocks(scriptBlocks.map(block =>
            block.id === id ? { ...block, count: isNaN(parsedCount) ? '' : parsedCount } : block
        ));
    };

    const renderScriptBlocks = () => {
        return scriptBlocks.map((block) => (
            <View
                key={block.id}
                style={[
                    styles.scriptBlock,
                    { marginLeft: block.indentLevel * 20 },
                ]}
            >
                <TouchableOpacity onPress={() => removeBlockFromScript(block.id)}>
                    <Text>{block.type}</Text>
                </TouchableOpacity>
                {'count' in block && block.count !== undefined && (
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={block.count.toString()}
                        onChangeText={(text) => updateBlockCount(block.id, text)}
                    />
                )}
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scriptArea}>
                {renderScriptBlocks()}
            </ScrollView>
            <View style={styles.simulationArea}>
                <Text>Obszar Symulacji</Text>
            </View>
            <View style={styles.blocksArea}>
                {['Góra', 'Dół', 'Lewo', 'Prawo', 'Skocz', 'Powtórz', 'Koniec powtórzenia'].map((direction, index) => (
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

