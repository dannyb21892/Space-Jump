class Tutorial {
  static spawn(){
    let tutorial = document.createElement("div")
    tutorial.id = "tutorial"
    tutorial.innerHTML = `<h1>SPACE JUMP</h1><br><br>
    <h3>Your avatar will jump automatically.</h3>
    <h3>Use "A" and "D" keys to move laterally.</h3>
    <h3>Hold keys to build momentum for far jumps!</h3>
    <h3>You will encounter several types of platforms:</h3><br>
    <div class="basicPlatform"></div>
    <h4>Basic platforms have no special attribute.</h4><br>
    <div class="mobilePlatform"></div>
    <h4>Mobile platforms will move left to right.</h4><br>
    <div class="fragilePlatform"></div>
    <h4>Fragile platforms will disappear after you jump on them!<br>
    Some may also move left to right!</h4><br>
    <div class="smallPlatform"></div>
    <h4>Small platforms are...well I think you understand this one.</h4><br>
    <h3>Climb as high as you can to score the most points! Can you take #1?</h3>
    <h1 id="letsgo">LET'S GO!</h1>`

    $("#play-field").append(tutorial)
    $("#tutorial").fadeOut(0)
    $("#tutorial").fadeIn(1000)
    document.getElementById("letsgo").addEventListener("click", window.game.gameplay)
  }

  static despawn(){
    if (document.getElementById("tutorial")) {
      $("#tutorial").remove()
    }
  }
}
