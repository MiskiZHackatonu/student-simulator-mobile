import { Alert } from "react-native";
// hard code urls
const ifLocalhost = false;

const ip = ifLocalhost ? "localhost" : "172.20.10.5";

const registerLoginUrl = `http://${ip}:3000/api/registerOrLogin`;
const matchmakingUrl = `http://${ip}:3000/games/6/matchmaking`;
const setScoreUrl = `http://${ip}:3000/games/setScore`;
const games6SolvedUrl = `http://${ip}:3000/games/6/solved`;
const gamesRankingUrl = `http://${ip}:3000/games/ranking`;
// const registerLoginUrl = 'http://172.20.10.2:3000/api/registerOrLogin';

async function messagePOST(url, message) {
  var responseBody = null;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    responseBody = await response.json();
  } catch (error) {
    Alert.alert(
      "Error",
      "There was a problem with the request. Please try again later."
    );
    // log error message from server to console
  }
  return responseBody;
}

async function messageGET(url) {
  var responseBody = null;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    responseBody = await response.json();
  } catch (error) {
    Alert.alert(
      "Error",
      "There was a problem with the request. Please try again later."
    );
    // log error message from server to console
  }
  return responseBody;
}

// api.js
export async function registerOrLogin(name) {
  var responseBody = await messagePOST(registerLoginUrl, { name: name });
  // test matchmaking
  if (responseBody.error) {
    Alert.alert("Connection Error", responseBody.message);
    console.log(responseBody);
  } else {
    Alert.alert("Success", "User connected successfully");
    console.log("User connected successfully");
  }
}

export async function matchmaking(lobbyId, userId) {
  var responseBody = await messagePOST(matchmakingUrl, {
    lobbyId: lobbyId,
    userId: userId,
  });
  if (responseBody.error) {
    Alert.alert("Connection Error", responseBody.message);
    console.log(responseBody);
  } else {
    Alert.alert("Success", "Matchmaking successful");
    console.log("Matchmaking successful");
  }
  return responseBody.id;
}

export async function setScore(lobbyId, userId) {
  var responseBody = await messagePOST(setScoreUrl, {
    lobbyId: lobbyId,
    userId: userId,
  });
  if (responseBody.error) {
    Alert.alert("Connection Error", responseBody.message);
    console.log(responseBody);
  } else {
    Alert.alert("Success", "Score updated successfully");
    console.log("Score updated successfully");
  }
}

export async function games6Solved(lobbyId, userId) {
  console.log("lobbyId", lobbyId);
  console.log("userId", userId);
  var responseBody = await messagePOST(games6SolvedUrl, {
    lobbyId: lobbyId,
    userId: userId,
  });
  if (responseBody.error) {
    Alert.alert("Connection Error", responseBody.message);
    console.log(responseBody);
  } else {
    Alert.alert("Success", "Solved updated successfully");
    console.log("Solved updated successfully");
  }
}

export async function getRanking() {
  var responseBody = await messageGET(gamesRankingUrl);
  if (responseBody.error) {
    Alert.alert("Connection Error", responseBody.message);
    console.log(responseBody);
  } else {
    console.log(responseBody);
    return responseBody;
  }
}
