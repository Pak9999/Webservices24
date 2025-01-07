
<div align="center">
  <img src="https://imgur.com/Y1mR36p.png" width="100" height="100">
</div>

# Fish Card Game (Finns i sjön)

A React-based implementation of the classic card game "Go Fish" (Finns i sjön in Swedish). The game features an intelligent computer opponent that learns from its gameplay experience.

## Features

- Single player game against a machine vision computer opponent
- Real-time game state updates
- Interactive card selection and gameplay
- Win condition detection and game reset functionality

## Tech Stack

Frontend:
- Node.js 
- React.js with TypeScript
- Axios for API calls
- CSS for styling
  
Backend:
- Java
- Javalin for the web server
- Unirest for HTTP requests
- Gson for JSON parsing.

APIs:
- [Deck of Cards API](https://deckofcardsapi.com/) for card management
- [Microsoft Azure](https://azure.microsoft.com) for machine vision
- [Google Vision AI](https://cloud.google.com/vision) for machine vision
- [Trafikverkert API](https://data.trafikverket.se/home) for the traffic pictures

## Prerequisites

- Node.js and npm installed on your machine.
- Java Development Kit (JDK) 17 or higher installed on your machine.

## Backend startup guide

1. Clone the repository
2. Check if a required JDK(Java Development Kit) is installed
 ```sh
java -version
```
if its not finding the command, install a JDK(Java Development Kit) 

4. Add a .env file with the provided API keys to the backend\src folder:
```sh
Trafik=************
Azure=*************
Gooogle=***********
```
3. To start the backend server run the file:
```sh
StartBackendHere.java
```

## Frontend startup guide

1. Clone the repository
2. Check if the required node.js is installed
 ```sh
node -v
```
if its not finding the command, install node.js

4. Install npm dependencies:
```sh
cd frontend/gofish
npm install --legacy-peer-deps
```
3. Run the frontend server:
```sh
npm start
```

## Authors

- [@Pak9999](https://www.github.com/pak9999)

- [@infotillandreas](https://www.github.com/infotillandreas)

- [@PerssonO](https://github.com/PerssonO)
 
- [@jontem1](https://www.github.com/jontem1)
