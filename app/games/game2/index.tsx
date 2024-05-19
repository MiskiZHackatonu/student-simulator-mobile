import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Image, Button, Dimensions } from 'react-native';

const mapobject = require("@/assets/ASDmap/map.json");
const SQUARE_SIZE = 50; // Rozmiar kwadratu
const GRID_COLUMNS = 12; // Liczba kolumn
const GRID_ROWS = 8; // Liczba wierszy

export default function Game2() {
    const [scriptBlocks, setScriptBlocks] = useState([]);
    const [nextId, setNextId] = useState(0);
    const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
    const [endPosition, setEndPosition] = useState({ row: 3, col: 3 });
    const [beer, setBeer] = useState([]);
    const [puddle, setPuddle] = useState([]);
    const [wall, setWall] = useState([]);
    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);
    const [currentBlockId, setCurrentBlockId] = useState(null);

    useEffect(() => {
        loadMapData();
        const { width, height } = Dimensions.get('window');
        setScreenWidth(width);
        setScreenHeight(height);
    }, []);

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
                    block.id === currentBlockId && styles.currentBlock // Dodane podświetlenie
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

    const removeBlockFromScript = (id) => {
        setScriptBlocks(scriptBlocks.filter(block => block.id !== id));
    };

    const movePlayer = (direction) => {
        let newRow = playerPosition.row;
        let newCol = playerPosition.col;

        if (direction === 'Up' && playerPosition.row > 0) {
            newRow--;
        } else if (direction === 'Down' && playerPosition.row < GRID_ROWS - 1) {
            newRow++;
        } else if (direction === 'Left' && playerPosition.col > 0) {
            newCol--;
        } else if (direction === 'Right' && playerPosition.col < GRID_COLUMNS - 1) {
            newCol++;
        }

        setPlayerPosition({ row: newRow, col: newCol });
    };

    const loadMapData = async () => {
        try {
            if (mapobject !== null) {
                setPlayerPosition(mapobject.playerPosition);
                setEndPosition(mapobject.endPosition);
                setBeer(mapobject.beer);
                setPuddle(mapobject.puddle);
                setWall(mapobject.wall);
            }
        } catch (error) {
            console.error('Błąd wczytywania danych z pliku map.json:', error);
        }
    };

    const renderSquares = () => {
        const squares = [];
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLUMNS; col++) {
                const isPlayerPosition = row === playerPosition.row && col === playerPosition.col;
                const isEndPosition = row === endPosition.row && col === endPosition.col;
                const isBeerPosition = beer.some(item => item.row === row && item.col === col);
                const isPuddlePosition = puddle.some(item => item.row === row && item.col === col);
                const isWallPosition = wall.some(item => item.row === row && item.col === col);

                squares.push(
                    <View
                        key={`${row}-${col}`}
                        style={[
                            styles.square,
                            { backgroundColor: 'transparent' }
                        ]}
                    >
                        {isPlayerPosition && <Image source={require('@/assets/images/player.png')} style={styles.player} />}
                        {isEndPosition && <Image source={require('@/assets/images/kapitol.png')} style={styles.bottomBlock} />}
                        {isBeerPosition && <Image source={require('@/assets/images/beer.png')} style={styles.bottomBlock} />}
                        {isPuddlePosition && <Image source={require('@/assets/images/puddle.png')} style={styles.bottomBlock} />}
                        {isWallPosition && <Image source={require('@/assets/images/wall.png')} style={styles.bottomBlock} />}

                        <Image source={require('@/assets/images/grass.png')} style={styles.image} />
                    </View>
                );
            }
        }
        return squares;
    };

    const runSimulation = async () => {
        for (const block of scriptBlocks) {
            setCurrentBlockId(block.id); // Ustawianie aktualnie wykonywanego bloczka
            if (block.count !== undefined) {
                for (let i = 0; i < block.count; i++) {
                    switch (block.type) {
                        case 'Góra':
                            movePlayer('Up');
                            break;
                        case 'Dół':
                            movePlayer('Down');
                            break;
                        case 'Lewo':
                            movePlayer('Left');
                            break;
                        case 'Prawo':
                            movePlayer('Right');
                            break;
                        default:
                            break;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } else {
                console.log(block.type);
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Dodatkowa przerwa po każdym bloczku
        }
        setCurrentBlockId(null); // Zresetuj aktualnie wykonywany bloczek po zakończeniu
    };

    return (
        <View style={styles.container}>
            <Button title="Uruchom symulację" onPress={runSimulation} />
            <View style={styles.simulationArea}>
                <View style={styles.grid}>
                    {renderSquares()}
                </View>
            </View>
            <ScrollView style={styles.scriptScroll}>
                <View style={styles.scriptArea}>
                    {renderScriptBlocks()}
                </View>
            </ScrollView>
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
        flexDirection: 'column',
        backgroundColor: 'rgb(160, 172, 38)', // Dodaj kolor tła tutaj, aby rozciągnął się na cały ekran
    },
    simulationArea: {
        flex: 3,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center', // Wyśrodkowanie w poziomie
        justifyContent: 'center', // Wyśrodkowanie w pionie
    },
    scriptScroll: {
        flex: 2,
        backgroundColor: '#f0f0f0',
    },
    scriptArea: {
        padding: 10,
        flexDirection: 'column',
        flexWrap: 'wrap', // Dodane do zawijania bloczków
    },
    scriptBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 5,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    currentBlock: {
        backgroundColor: '#ff0', // Dodane podświetlenie aktualnie wykonywanego bloczka
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        marginLeft: 10,
        width: 50,
    },
    blocksArea: {
        flex: 1,
        backgroundColor: '#eee',
        flexDirection: 'row',
        flexWrap: 'wrap', // Dodane do zawijania przycisków
        justifyContent: 'center',
    },
    block: {
        padding: 10,
        margin: 5,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: SQUARE_SIZE * GRID_COLUMNS,
        height: SQUARE_SIZE * GRID_ROWS,
    },
    square: {
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        borderWidth: 1,
        borderColor: '#999',
        position: 'relative',
    },
    player: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bottomBlock: {
        position: 'absolute',
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
});

export default Game2;
