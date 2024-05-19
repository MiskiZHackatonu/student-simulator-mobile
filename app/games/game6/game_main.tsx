import * as React from 'react';
import { View, Text, Alert, StyleSheet, StatusBar, Button } from 'react-native';
import { KanbanBoard, ColumnModel, CardModel } from '@/vendor/kanban_board/src';
import Card from '@/vendor/kanban_board/src/components/cards/card.component';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { ScrollView } from 'react-native-gesture-handler';
import {games6Solved} from "@/app/onboarding/api";

export default function ScrolableHorizontal(){
    const {nick} = useContext(AllGamesContext)

    const onCardPress = (card: CardModel) => {
       
      }
    
    const  board_data = {
        1:{
          "cards": ["+7","+4","+3","+2","+3","+4","+2"],
          "expectedValues": [14,5,6],
          "titles":[
            "Dokumentacja wymagań funkcjonalnych i niefunkcjonalnych.",
            "Tworzenie dokumentacji technicznej dla nowych funkcji.",
            "Określenie architektury systemu.",
            'Stworzenie wireframe\'ów i mockupów.',
            'Przygotowanie prototypów do testów użyteczności.',
            'Kodowanie backendu dla uwierzytelniania użytkowników.',
  '          Tworzenie frontendu dla formularza logowania.'
          ]
        },
        2:{
          "cards": ["+2","+3","+1","+2","+2","+5","+7"],
          "expectedValues": [6,4,12],
          "titles": [
            'Tworzenie testów jednostkowych dla nowo dodanych funkcji.',
            'Aktualizacja istniejących testów.',
            'Łączenie aplikacji z zewnętrznym API.',
            'Przeprowadzanie testów integracyjnych.',
            'Sprawdzenie jakości kodu i zgodności z wytycznymi.',
            'Wyszukiwanie potencjalnych błędów i sugestii ulepszeń.',
            'Sprawdzenie, czy kod spełnia ustalone standardy.'
          ]
        }
      }
    const params = useLocalSearchParams();
    const player_id:number = params.player_id;
    const other_player_id = (player_id == 1 ? 2 : 1);
    const card_models_h = []
    for (let i = 0; i < 7; i++) {
        card_models_h.push(new CardModel(
            i.toString(),
            "card_deck",
            board_data[other_player_id]["titles"][i],
            board_data[other_player_id]["cards"][i],
            board_data[other_player_id]["cards"][i],
            [],
            null,
            1
          ));
    }
    const cards_h = []
    for (let i = 0; i < card_models_h.length; i++) {
        cards_h.push(<Card model={card_models_h[i]} hidden={false}/>)
    }
    const columns = [
        new ColumnModel("card_deck", "Baza kart", 1,false,1,0),
        new ColumnModel("todo", "To Do", 2,false,1,board_data[player_id]["expectedValues"][0]),
        new ColumnModel("inprog", "In Progress", 3,false,1,board_data[player_id]["expectedValues"][1]),
        new ColumnModel("done", "Done", 4,false,1,board_data[player_id]["expectedValues"][2]),
    ];
    const cards = []
    for (let i = 0; i < 7; i++) {
        cards.push(new CardModel(
            i.toString(),
            "card_deck",
            board_data[player_id]["titles"][i],
            "",
            board_data[player_id]["cards"][i],
            [],
            null,
            1
          ));
    }
    const onCardDragEnd = async (srcColumn: ColumnModel, destColumn: ColumnModel, item: CardModel, cardIdx: number) => {
        const results = [0,0,0];
        var column = 0;
        
        for (let i = 0; i < cards.length; i++){
            const operation = cards[i].description?.charAt(0);
            const value = parseInt(cards[i].description?.substring(1) ?? '0');
            // console.log(operation);
            // console.log(value);
            // console.log(cards[i].columnId);
            switch (cards[i].columnId){
                case "card_deck":
                    column = 4;
                    break;
                case "todo":
                    column = 0;
                    break;
                case "inprog":
                    column = 1;
                    break;
                case "done":
                    column = 2;
                    break;
            }
            if (column === 4){
                continue;
            }
            switch (operation) {
                case '+':
                results[column] += value;
                break;
                case '-':
                results[column] += value;
                break;
                case '*':
                results[column] += value;
                break;
                case '/':
                results[column] += value;
                break;
                default:
                break;
            }
        }
        console.log(results);
        if (results[0] === board_data[player_id]["expectedValues"][0] && results[1] === board_data[player_id]["expectedValues"][1] && results[2] === board_data[player_id]["expectedValues"][2]){
            console.log("Solved!");
            await games6Solved(params.lobby_id, nick)
            console.log("Gratulacje! Wygrałeś!");
            Alert.alert("Gratulacje! Wygrałeś!");
        }
    }
    return(
    <ScrollView>   
        <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 20
        
        }}>Karty Drugiego Gracza</Text>
        <ScrollView horizontal={true} style={{flex: 1}}>
            {cards_h}
        </ScrollView>
        <View>
            
        <KanbanBoard
              columns={columns}
              cards={cards}
              onDragEnd={(srcColumn, destColumn, item, targetIdx) =>  onCardDragEnd(srcColumn, destColumn, item, targetIdx)}
              onCardPress={(item) => onCardPress(item)}
              style={styles.kanbanStyle}
              />
              <Text>
            </Text>
        </View>
         
    </ScrollView>)
}

const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    kanbanStyle: {
      marginTop: 1,
      flex: 1
    }
  });