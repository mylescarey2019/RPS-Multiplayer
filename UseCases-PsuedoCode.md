# Rock Paper Scissors Lizard Spock - Multplayer game

RPSLK - Multiplayer

## Description

This game uses Firebase cloud storage database to help manage a two browser game
of Rock Paper Scissors Lizard Spock, a variation on the classic Rock-Paper-Scissors game. 


![preliminary wireframe drawing](assets/images/wireframe0.png)

## Requirement Note

Intend to leverage Bootstrap due to need for more practice and desire to make responsive.
Intend to use local storage to make application data persist for user


## User Stories / Use Cases

0.  This was the intended Use Case and program flow - final result was close to this
    although some differences to evolve during development.  See javascript code header
    for more details.

1.  page loads for the user
    1. page has header bar with title on left, right side has dropdown for saved searches, search text input box
       and clear search button
    2. dropdown box will be populated with any saved searches (from local storage)
    3. instruction messsage is shown
    4. gif display is empty (or maybe i will decide to load firt search - TBD)
    
2.  user selects a saved search term from dropdown box
    1. dipslay loads with gifs for the selected term
    2. display allows user to scroll (if using carousle

3.  user enters search term in search input box/clicks search
    1. term is used to search for gifs 
    2. if none found - display message
    3. if found then add term to the dropdown list and update the locally storage saved list
    4. display found gifs 

4.  user clicks Clear Search button
    1. remove all entries from the dropdown list
    2. clear the local stored saved list
    3. clear the gif display

### Psuedo Code - notes

1. Global
    1. Variables
    2. Functions

2. Objects/Classes
    1. Terms (static object)
        1. Properties
            1. search term array
        2. Methods
            1. add term
            2. clear terms
            3. save to local storage
            4. clear from local storage
            5. load from local storage
    2. User Interface (static object)
        1. Properties
            1. instruction message
            2. non gifs found message
            3. clear search term message
        2. Methods
            1. display message
            2. clear gif display
            3. load git display

3. Events/Listeners/Timers
    1. on click for dropdown control
    2. on click for search term box
    3. on click for clear search button           
