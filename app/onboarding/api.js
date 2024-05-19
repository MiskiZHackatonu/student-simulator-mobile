import { Alert } from 'react-native';
// hard code urls
const registerLoginUrl = 'http://localhost:3000/api/registerOrLogin'; 
const matchmakingUrl = 'http://localhost:3000/games/6/matchmaking';
// const registerLoginUrl = 'http://172.20.10.2:3000/api/registerOrLogin'; 

async function fetchMessage(url, message){
  var responseBody = null;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
    responseBody = await response.json();
  } catch (error) {
    Alert.alert('Error', 'There was a problem with the request. Please try again later.');
    // log error message from server to console
  }
  return responseBody;
}

// api.js
export async function registerOrLogin(name) {
  var responseBody = await fetchMessage(registerLoginUrl, {name: name});
  // test matchmaking 
  matchmaking(1, 1);
  if (responseBody.error) {
    Alert.alert('Connection Error', responseBody.message);
    console.log(responseBody);
  } else {
    Alert.alert('Success', 'User connected successfully');
    console.log('User connected successfully');
  }
}

export async function matchmaking(lobbyId, userId) {
  var responseBody = await fetchMessage(matchmakingUrl, {lobbyId: lobbyId, userId: userId});
  if (responseBody.error) {
    Alert.alert('Connection Error', responseBody.message);
    console.log(responseBody);
  } else {
    Alert.alert('Success', 'Matchmaking successful');
    console.log('Matchmaking successful');
  }
}