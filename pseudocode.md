# Pseudocode

#### 1. Define required constants
* Define player 1 and player 2

#### 2. Define required variables used to track the state of the game
* Use a board array (nested) to represent the squares. Nest an object with different square states (feared, occupied, etc)
* Use a turn variable to remember whose turn it is.
* Use a winner variable.

#### 3. Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
* something

#### 4. Upon loading the app should:
* Initialize the state variables
* Render those values to the page
* Wait for the user to click a square

#### 5.0 Check to see if animal is not in feared state
* if animal in feared state is true, limit player's move to that specific animal    

#### 5. Handle a player clicking a square with an animal
* make sure the animal is linked to the player
* Are any squares on the animals path _feared_ or _occupied_? if true, deactivate squares
* if _occupied_ is true; deactivate square
* no jump rule => check relative position of _occupied_ square to animal token's position - deactivate squares that are "behind" the _occupied_ square
* check for _feared_ squares that are on animal's path; if true, deactivate them
* highlight possible moves of clicked animal on board (css: brightness filter?)
* set wait period to handle destination click or clicking another animal on same turn???


#### 5.1 Handle clicking another animal on same turn
* remove previous iterations from previously clicked animal and reassign all of 5's code list to new animal clicked

#### 5.2 Handle a player clicking a destination square<br>
* remove the animal from original square
* move animal to new square
* if player moves an animal next to an opposing animal that is feared by it => set opposing player's animal to a feared state
* set square attributes(_feared_) from true state to null
* call switch player function


#### 6. Handle a player clicking the reset button
* re-initialize all features

#### 7. Win logic
* After every turn, if there are 3 animals on "watering" squares - check to see if they are from the same player
* if true => we have a winner
* otherwise call switch player function












