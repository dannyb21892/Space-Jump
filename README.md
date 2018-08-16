# Space-Jump

Space Jump is a single player game written in JavaScript with a leaderboard hosted by a Rails API. View a demo here: https://www.youtube.com/watch?v=U3e78fpclAw

## Rules and Controls

Space Jump has only three controls: A to move left, D to move right, and Spacebar to use a Magic Wand. The rules of the game are simple: climb as high as you can by jumping on platforms to score points. If you fall and touch the bottom of the screen, the game is over. 

There are five types of platforms to encounter in the game. A basic platform is white and stationary and has no special attributes. A small platform is also white and stationary, but is less than half the width of a basic platform and is therefore more difficult to land on. A fragile platform is colored red and will disappear after landing on it one time, forcing the player to make quick decisions about where to go next. A mobile platform is colored purple and will travel laterally back and forth, switching direction when it touches the sides of the play area. A mobile platform may be randomly given any of 10 speeds, and so the difficulty of landing on one can vary. The final platform is a combination of fragile and mobile platforms. It can move and it will also disappear after one use.

There are three types of items the player will encounter. Every time a platform is spawned, there is a random chance that an item may be assigned to spawn on that platform. A Spring has the highest chance to spawn (5%), and the player will jump twice as high when landing on it. A spring may be jumped on repeatedly. A Magic Wand spawns at a rate of 2%, and will disappear and be added to the player's collection of wands when it is touched. If a player has a wand in their inventory, they may press the Spacebar at any time to immediate spawn a basic platform beneath the jumper. This expends one wand, and allows the player to make a difficult jump more easily, or if the player has good reflexes, can save the player just before they fall off the bottom of the screen. A Rocket Ship is the rarest item and spawns at a rate of 1%. When touched, this item will attach itself to the jumper and fly upwards for a few seconds with no chance of losing the game during that time. The player may control the rocket's lateral movement with the A and D keys as normal. A glow surrounding the rocket will gradually dissipate, signaling the end of the ride. When it is over the jumper will automatically be released from the rocket, and the player regains full control as the rocket falls off the screen.

## How it Works

### The Jumper

The jumper's horizontal motion is bound to the player's key presses. Each key press adds to the jumper's lateral velocty in the corresponding direction of the key. If the key is held, signals are sent repeatedly to add to the velocity, and when it released, the velocty decays to 0 automatically over a short time. These mechanics simulate a feeling of momentum and fluidity for the player's controls. The jumper's vertical motion is tied to a constant cycle of two functions: a gravity routine, and a free fall routine. When a collision is detected with a platform, the jumper is assigned an upward velocity and the gravity routine lessens that velocity every frame causing a parabolic trajectory. If the jumper falls below the height from which it started (coinciding with the gravity routine being allowed to complete before another collision is detected), the gravity routine gives way to free-fall. Here, the jumper is assigned a constant downward speed that can be understood as terminal velocity. This ends when the jumper falls off the bottom of the screen, or collision is detected. An entirely cosmetic rotation effect is applied to the jumper as it moves left to right.

### Spawning Platforms and Items

All platforms items currently active on the screen are tracked in an array with their type and position. When the jumper passes above the vertical mid-line of the play area, all objects on the screen (jumper included) are shifted downward by amount needed to keep the jumper exactly at the middle. The effect is that the camera view of the play area moves upward as the jumper climbs. The amount of each tick is directly tied to the player score. When a platform or item passes the bottom of the screen, it is despawned and no longer tracked in the array of active objects. Each time the play area shifts downward, an algorithm decides whether a new platform should be spawned. This algorithm references the position of the highest currently-active platform and if it ever detects that a future platform is in danger of being too far from the previous one, it forces the spawn. In this way, the platforms can be spawned randomly but also are guaranteed to be in a range that makes every jump possible. Whenever a platform is spawned, further random draws determine what type of platform it will be, and if it will have an item on it.

### Collision

Collision between the jumper and platforms or items is only ever checked when the jumper is falling. This allows for the jumper to jump upward through the bottoms of platforms, and land on them on the way down. If the jumper's position is calculated to overlap with a platform, the gravity routine is reset, and the jumper resets its jump animation. If it overlaps with an item, the item's identity is checked and a corresponding function takes over what effect to apply.

### Difficulty

The difficulty of the game progresses with the player's score until it reaches peak difficulty at 100000 points and beyond. As a part of the logic involved with spawning platforms, the player's progress from 0 to 100000 points is calculated and modifies the probabilities of a platform spawning more closely in range to the previously spawned platform. The higher your score, the smaller the probability of the platform spawning before it reaches the absolute maximum distance from the previous one. In this way, a linear map is created that forces larger and more skillful jumps as the player approaches 100000 points. This same linear map is applied to the function that determines which type of platform will spawn. As the player climbs, the probability of spawning basic platforms decresases, and that of special platforms increases resulting in a progression that spawns nearly all basic platforms at low altitude, and nearly all special platforms at high altitude.

### Themes

Links to different themes can be seen on the side of the play area. Clicking these switches out the active Stylesheet used on the webpage. Since the game is written in pure javascript, this dynamically changes how the game looks without interrupting gameplay.

### Leaderboard

A Rails API keeps track of each player by their username, and also tracks the gameplay history of each player. On page load, and whenever a game ends, the leaderboard makes a call to the API for the highest score each player has attained and displays those by default. In addition, each name on the leaderboard can be clicked, at which point an API call for that player's entire gameplay history is made. This allows players to toggle back and forth between global comparisons, and personal achievement.
