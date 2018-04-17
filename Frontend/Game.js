class Game {
  static start() {
    let newGameForm = document.getElementById("newGameForm")
    newGameForm.style.visibility = ""
    newGameForm.addEventListener("submit", this.beginGame)
  }

  static beginGame(event){
    event.preventDefault()
    let usernameInput = document.getElementById("usernameInput")
    if (usernameInput.value != "") {
      window.username = usernameInput.value
      event.target.style = "visibility: hidden"
      Game.gameplay()
    } else {
      Game.start()
    }
  }

  static gameplay() {
    let jumper = new Jumper
    window.jumper = jumper
    let playField = document.getElementById("play-field")
    playField.addEventListener("keypress", jumper.moveJumper)
    jumper.jump()

    for (let i=0; i<20; i++){
	     new BasicPlatform(Math.round(Math.random()*600), Math.round(Math.random()*800))
     }
    //jumper.collisionCheck()
  }
}
