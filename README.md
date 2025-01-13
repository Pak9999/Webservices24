
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

- [Node.js](https://nodejs.org/en) and npm installed on your machine.
- [Java Development Kit (JDK)](https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-21) 17 or higher installed on your machine.
- [VS Code](https://code.visualstudio.com/) 

## Backend startup guide

1. Clone the repository
2. Check if a required JDK(Java Development Kit) is installed by running this in a new terminal
 ```sh
java -version
```
if its not finding the command, install a JDK(Java Development Kit) 

3. Add a .env file with the provided API keys to the backend\src folder:
```sh
Trafik=************
Azure=*************
Gooogle=***********
```
4. If you are using VS Code add the the "Extension Pack for Java" from the marketplace.

5. Add the src folder to source path:
   - Go to the top search bar and select the show and run command
   - then type and select java: configure classpath
   - if there is no current path, click add source root
   - type src as the path
   - apply the settings
   
7. To start the backend server run the file:
```sh
StartBackendHere.java
```

## Frontend startup guide

1. Clone the repository
2. Check if the required node.js is installed by running this command in a new terminal
 ```sh
node -v
```
if its not finding the command, install node.js

3. Make sure the you are able to run remote signed scripts
  -  Open the PowerShell Console by selecting “Run as Administrator” (Or Right-click the Start menu and choose “Windows PowerShell (Admin)” from the context menu) and get the execution Policy with the command:
      ```
      Get-ExecutionPolicy
      ```
  - if the response says restricted change it to remotesigned with this command:
      ```
      Set-ExecutionPolicy RemoteSigned
      ```
  - then enter A or Y to confirm the change
    
  - verify the change by running the first command again:
      ```
      Get-ExecutionPolicy
      ```

3. Install npm dependencies:
```sh
cd frontend/gofish
npm install --legacy-peer-deps
```
```sh
npm install react-scripts --legacy-peer-deps
```
```sh
npm install axios --legacy-peer-deps 
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
