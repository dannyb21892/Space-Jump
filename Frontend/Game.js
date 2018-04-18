class Game {
  constructor() {
    this.score = 0
  }

  start() {
    let newGameForm = document.getElementById("newGameForm")
    newGameForm.style.visibility = ""
    newGameForm.addEventListener("submit", window.game.beginGame)
  }

  beginGame(event){
    event.preventDefault()
    let usernameInput = document.getElementById("usernameInput")
    if (usernameInput.value != "") {
      window.username = usernameInput.value
      event.target.style = "visibility: hidden"
      window.game.gameplay()
    } else {
      window.game.start()
    }
  }

  gameplay() {
    let jumper = new Jumper
    window.jumper = jumper
    let playField = document.getElementById("play-field")
    playField.addEventListener("keypress", jumper.moveJumper)
    initialSpawns()
    jumper.jump()
  }

  screenScroll(pixels) {
    // console.log(`Scrolling ${pixels} pixels`)
    window.game.score = window.game.score + Math.ceil(pixels)
    window.spawnFrequency = window.game.score*(0.1/100000) + 0.9
    //window.game.score*(a/c) + b. a+b must = 1.
    //c decides the score at which maximum difficulty is achieved.
    //make a small and b large for high initial difficulty.
    //Make a large and b small for low initial difficulty.

    let score = document.getElementById("score")
    score.innerText = window.game.score

    let jumper = document.getElementById("jumper")
    jumper.style.bottom = `${Number(jumper.style.bottom.slice(0,-2)) - pixels}px`

    // let tempActivePlatforms = [...activePlatforms]
    // let copyActivePlatforms = [...activePlatforms]
    // let deleteIndeces = []
    for (let i = 0; i < activePlatforms.length; i++) {
      activePlatforms[i][0].style.bottom = `${activePlatforms[i][1].bottom - pixels}px`
      activePlatforms[i][1].bottom = activePlatforms[i][1].bottom - pixels
      if (activePlatforms[i][1].bottom < -10) {
        activePlatforms[i][0].remove()
        activePlatforms = [...activePlatforms.slice(0,i), 0, ...activePlatforms.slice(i+1)]
      }
    }
    activePlatforms = activePlatforms.filter(element=>element != 0)
    // copyActivePlatforms.forEach(platform => {
    //   // console.log(`BEFORE SCROLL: ${platform[0]}, ${platform[1]}`)
      // platform[0].style.bottom = `${platform[1].bottom - pixels}px`
      // platform[1].bottom = platform[1].bottom - pixels
      // // console.log(`AFTER SCROLL: ${platform[0]}, ${platform[1]}`)
      // if (platform[1].bottom < -10) {
      //   activePlatforms[0][0].remove()
      //   activePlatforms.splice(0,1)
      // }
    // })

    // activePlatforms = tempActivePlatforms

    maybeSpawnNewPlatform()
    return
  }

  end(){
    let jumper = document.getElementById("jumper")

    let tempActivePlatforms
    let copyActivePlatforms = [...activePlatforms] //interval callback below loses scope of global activePlatforms. This is a weird ass workaround.

    if (document.getElementsByClassName("gameOver").length === 0){
      let gameOverDiv = document.createElement("div")
      gameOverDiv.innerHTML = `<h1>GAME<br>OVER</h1>
      <br><br><h2>FINAL SCORE:<br>${window.game.score}</h2>`
      gameOverDiv.style.top = "1200px"

      gameOverDiv.className = "gameOver"

      let playField = document.getElementById("play-field")
      playField.append(gameOverDiv)

      let interval = setInterval(function(){
        jumper.style.bottom = `${Number(jumper.style.bottom.slice(0,-2)) + 5}px`
        gameOverDiv.style.top = `${Number(gameOverDiv.style.top.slice(0,-2)) - 5}px`
        tempActivePlatforms = [...copyActivePlatforms]
        copyActivePlatforms.forEach(platform => {
          platform[0].style.bottom = `${platform[1].bottom + 5}px`
          platform[1].bottom = platform[1].bottom + 5
          if (platform[1].bottom > 800) {
            platform[0].remove()
            tempActivePlatforms = [...tempActivePlatforms.slice(1)]
          }
        })
        if(Number(gameOverDiv.style.top.slice(0,-2)) < 200){
          jumper.remove()
          clearInterval(interval)
        }
      },1000/60)
    }
  }
}
