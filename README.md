# Initial setup

## Game name
**Barca**

#### Board setup
* 10x10 grid
* 4 watering holes
* 6 tokens per player
* 3 animals (Elephant(2), Lion(2), Mouse(2))
* Players face each other with the board between them. The animals are separated into light and dark sets with twelve animals per set and two of each animal type in a set. The animals are arranged as shown in the diagram with the two elephants side by side in the center of the back row, the two mice in front of the two elephants, and the two lions separated on each side of the mice.

#### Gameplay
* turn-base game
* Players alternate turns moving one of their ainmals per turn

##### General Movements
* Mouse moves along rows and columns (ej. rook)
* Lion moves on diagonals (ej. bishop)
* Elephant moves along rows, columns and diagonals (ej. queen)

##### Movement Restrictions
* Animals can move any number of squares on the board but cannot jump over other animals
* A player's animals may occupy squares next to each other
* An animal may not move to a square adjacent to an opposing animal that it fears
* Squares adjacent to an animal include all those within one square of the animal, horizontally, vertically and diagonally.
* An animal is said to be "afraid" when it is adjacent to an animal it fears. For example, if a player moves a lion adjacent to the opposing player's mouse, then that mouse becomes afraid.
* On a player's turn, if any of the player's animals are afraid, then one of them must be moved to a square where it is not afraid, if possible.
* An animal is said to be "trapped" if it is afraid and its only available moves still leave it afraid.
* On a player's turn, if the player has one or more animals that are afraid, but all such animals are also trapped, then the player may optionally move a trapped animal to a square where it remains afraid. This is the only case in which an animal may move to a square in which it will be afraid.

#### Winning
* The four marked squares near the center of the board are the watering holes. The first player to get three of their animals on the watering holes at the same time wins the game. A player may win even if one or more of their animals remains afraid or trapped after the winning move.


##### Afraid state
* Each animal is afraid of one opposing animal
* Elephant fears the mouse
* Lion fears the elephant
* Mouse fears the lion

## Icebox
* Flip board for each player
* add a timed game play