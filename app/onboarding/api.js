import { Alert } from 'react-native';
// hard code urls
const registerLoginUrl = 'http://localhost:3000/api/registerOrLogin'; 
// const registerLoginUrl = 'http://172.20.10.2:3000/api/registerOrLogin'; 

async function userFetch(url, name){
  var responseBody = null;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": name})
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
  var responseBody = await userFetch(registerLoginUrl,name);
  if (responseBody.error) {
    Alert.alert('Connection Error', responseBody.message);
    console.log(responseBody);
  } else {
    Alert.alert('Success', 'User connected successfully');
    console.log('User connected successfully');
  }
}
// export async function registerLoginUser(name, password) {
//   try {
//     var responseBody = await userFetch(registerUrl,name, password);
//     if (responseBody.error) {
//       Alert.alert('Registration Error', responseBody.message);
//       console.log(responseBody);
//     } else {
//       Alert.alert('Success', 'User registered successfully');
//       console.log('User registered successfully');
//     }
//   } catch {
//     Alert.alert('Error', 'There was a problem with the request. Please try again later.');
  
//   }
// }

// export async function loginUser(name, password) {
//   var responseBody = await userFetch(loginUrl,name, password);
//   if (responseBody) {
//     Alert.alert('Success', 'User logged in successfully');
//     // log token
//     console.log(responseBody);
//   } else {
//     Alert.alert('Login Error', 'Username or password is incorrect');
//     console.log('Username or password is incorrect');
//   }
// }