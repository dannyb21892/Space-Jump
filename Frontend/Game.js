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
      console.log("hello")
      window.username = usernameInput.value
      event.target.style = "visibility: hidden"
      Game.gameplay()
    } else {
      Game.start()
    }
  }

  static gameplay() {
    Jumper.jump()
  }
}
