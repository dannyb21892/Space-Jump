gameOver = false

class Game {
  constructor() {
    this.score = 0
  }

  start() {
    gameOver = false
    $("#newGameForm").fadeOut(0)
    $("#newGameForm").fadeIn(1000)
    Leaderboard.render()
    let newGameForm = document.getElementById("newGameForm")
    newGameForm.style.visibility = ""
    newGameForm.addEventListener("submit", window.game.beginGame)
  }

  beginGame(event){
    event.preventDefault()
    let usernameInput = document.getElementById("usernameInput")
    if (usernameInput.value != "") {
      window.username = usernameInput.value
      $("#newGameForm").fadeOut(1000)
      setTimeout(() => {
        $("#newGameForm").remove()
        Tutorial.spawn()
      }, 1000)
    } else {
      window.game.start()
    }
  }

  gameplay() {
    gameOver = false
    $("#tutorial").fadeOut(1000)
    setTimeout(() => {
      Tutorial.despawn()
    }, 1000)
    let jumper = new Jumper
    window.jumperObject = jumper
    document.addEventListener("keypress", jumper.moveJumper)
    initialSpawns()
    document.getElementById("jumper").style.left = "290px"
    jumper.jump()
  }

  screenScroll(pixels) {
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

    for (let i = 0; i < activePlatforms.length; i++) {
      activePlatforms[i][0].style.bottom = `${activePlatforms[i][1].bottom - pixels}px`
      activePlatforms[i][1].bottom = activePlatforms[i][1].bottom - pixels
      if (activePlatforms[i][1].bottom < -10) {
        activePlatforms[i][0].remove()
        activePlatforms = [...activePlatforms.slice(0,i), 0, ...activePlatforms.slice(i+1)]
      }
    }
    activePlatforms = activePlatforms.filter(element=>element != 0)

    for (let i = 0; i < activeItems.length; i++) {
      let itemStyle = window.getComputedStyle(activeItems[i])
      activeItems[i].style.bottom = `${Number(itemStyle.getPropertyValue("bottom").slice(0,-2)) - pixels}px`
      if (Number(activeItems[i].style.bottom.slice(0,-2)) < -10) {
        activeItems[i].remove()
        activeItems = [...activeItems.slice(0,i), 0, ...activeItems.slice(i+1)]
      }
    }
    activeItems = activeItems.filter(element=>element != 0)

    maybeSpawnNewPlatform()
    return
  }

  end(){
    gameOver = true
    let jumper = document.getElementById("jumper")
    if (jumper) {
      document.removeEventListener("keypress", jumperObject.moveJumper)
      jumper.style.bottom = "0px"
      jumper.remove()

      let tempActivePlatforms
      let copyActivePlatforms = [...activePlatforms] //interval callback below loses scope of global activePlatforms. This is a weird ass workaround.

      let tempActiveItems
      let copyActiveItems = [...activeItems]

      if (document.getElementsByClassName("gameOver").length === 0){
        let gameOverDiv = document.createElement("div")
        gameOverDiv.innerHTML = `<h1>GAME<br>OVER</h1>
        <br><br><h2>FINAL SCORE:<br>${window.game.score}</h2><br>
        <h1 id="retry">PLAY AGAIN AS ${window.username}?</h1>
        <h1 id="retryNew">PLAY AS NEW PLAYER</h1>`

        gameOverDiv.style.top = "1200px"

        gameOverDiv.id = "gameOver"

        let playField = document.getElementById("play-field")
        playField.append(gameOverDiv)

        let interval = setInterval(function(){
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

          tempActiveItems = [...copyActiveItems]
          copyActiveItems.forEach(item => {
            item.style.bottom = `${Number(item.style.bottom.slice(0,-2)) + 5}px`
            if (Number(item.style.bottom.slice(0,-2)) > 800) {
              item.remove()
              tempActiveItems = [...tempActiveItems.slice(1)]
            }
          })

          if(Number(gameOverDiv.style.top.slice(0,-2)) < 200){
            clearInterval(interval)
          }
        },1000/60)
      }
      Adapter.sendGameResults(window.username, window.game.score, 10).then(Leaderboard.render)
      let retry = document.getElementById("retry")
      retry.addEventListener("click", game.restart)
      let retryNew = document.getElementById("retryNew")
      retryNew.addEventListener("click", game.restartNew)
    }
  }

  restart() {
    let retry = document.getElementById("retry")
    retry.removeEventListener("click", game.restart)
    let playField = document.getElementById("play-field")
    window.game = new Game
    $("#gameOver").fadeOut(1000)
    setTimeout(()=> {
      playField.innerHTML = `
      <div id="scoreDiv">
        <h3 id="scoreTitle">SCORE:</h3>
        <p id = "score">0</p>
      </div>
      <form id="newGameForm" method="post" style="visibility: hidden">
        <label id="usernameInputLabel" style="color: white">Username:</label><br>
        <input id="usernameInput" type="text"><br>
        <input type="submit" value="START">
      </form>
      <div id="jumper" style="bottom: 0px; left: 290px;"></div>`
      game.gameplay()
    }, 1000)
  }

  restartNew() {
    let retryNew = document.getElementById("retryNew")
    retryNew.removeEventListener("click", game.restartNew)
    let playField = document.getElementById("play-field")
    window.game = new Game
    $("#gameOver").fadeOut(1000)
    setTimeout(()=> {
      playField.innerHTML = `
      <div id="scoreDiv">
        <h3 id="scoreTitle">SCORE:</h3>
        <p id = "score">0</p>
      </div>
      <form id="newGameForm" method="post" style="margin-top: 170px">
        <label id="usernameInputLabel" style="color: white">Username:</label><br>
        <input id="usernameInput" type="text"><br>
        <input type="submit" value="START">
      </form>
      <div id="jumper" style="bottom: 0px; left: 290px;"></div>`
      $("#playField").fadeIn(1000)
      game.start()
    }, 1000)
  }
}
