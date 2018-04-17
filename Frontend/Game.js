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
    let playField = document.getElementById("play-field")
    playField.addEventListener("keypress", jumper.moveJumper)
    jumper.jump()
  }
}
