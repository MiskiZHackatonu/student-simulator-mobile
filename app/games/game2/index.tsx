import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView , Image, Keyboard, Platform } from 'react-native';
        
const SQUARE_SIZE = 50; // Rozmiar kwadratu
const GRID_COLUMNS = 12; // Liczba kolumn
const GRID_ROWS = 8; // Liczba wierszy
        
export default function Game2() { 
    const [scriptBlocks, setScriptBlocks] = useState<any[]>([]);
  const [nextId, setNextId] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 }); // Pozycja gracza

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      switch (event.key) {
        case 'ArrowUp':
          movePlayer('Up');
          break;
        case 'ArrowDown':
          movePlayer('Down');
          break;
        case 'ArrowLeft':
          movePlayer('Left');
          break;
        case 'ArrowRight':
          movePlayer('Right');
          break;
        default:
          break;
      }
    };
    if (Platform.OS === 'web') {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      Keyboard.addListener('keydown', handleKeyPress);
    }

    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('keydown', handleKeyPress);
      } else {
        Keyboard.removeListener('keydown', handleKeyPress);
      }
    };
  }, [playerPosition]);
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
    const removeBlockFromScript = (id: number) => {
        setScriptBlocks(scriptBlocks.filter(block => block.id !== id));
    };

    const movePlayer = (direction: string) => {
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
  const renderSquares = () => {
    const squares = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLUMNS; col++) {
        const isGreen = (row + col) % 2 === 0;
        const isPlayerPosition = row === playerPosition.row && col === playerPosition.col;

        squares.push(
          <View
            key={`${row}-${col}`}
            style={[
              styles.square,
              { backgroundColor: 'transparent' }
            ]}
          >
            {isPlayerPosition && <Image source={require('./graphics/player.png')} style={styles.player} />}
            <Image source={require('./graphics/grass.png')} style={styles.image} />
          </View>
        );
      }
    }
    return squares;
  };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scriptArea}>
                {renderScriptBlocks()}
            </ScrollView>
      <View style={styles.simulationArea}>
        <Text>Simulation Area</Text>
        <View style={styles.grid}>
          {renderSquares()}
        </View>
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
    backgroundColor: 'rgb(160, 172, 38)', // Stały kolor tła
    padding: 10,
    borderLeftWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center', // Wyśrodkowanie w poziomie
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SQUARE_SIZE * GRID_COLUMNS,
    height: SQUARE_SIZE * GRID_ROWS,
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 1,
  },
  player: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 2,
  },
  block: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});
