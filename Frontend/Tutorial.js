class Tutorial {
  static spawn(){
    let tutorial = document.createElement("div")
    tutorial.id = "tutorial"
    tutorial.innerHTML = `<h1 style="text-decoration: underline">SPACE JUMP</h1>
    <h4>Your avatar will jump automatically.</h4>
    <h4>Use "A" and "D" keys to move laterally.</h4>
    <h4>Hold keys to build momentum for far jumps!</h4>
    <h4>You will encounter several types of platforms:</h4><br>
    <div class="basicPlatform"></div>
    <h5>Basic platforms have no special attribute.</h5><br>
    <div class="mobilePlatform"></div>
    <h5>Mobile platforms will move left to right.</h5><br>
    <div class="fragilePlatform"></div>
    <h5>Fragile platforms will disappear after you jump on them!<br>
    Some may also move left to right!</h5><br>
    <div class="smallPlatform"></div>
    <h5>Small platforms are...well I think you understand this one.</h5><br>
    <h4>Climb as high as you can to score the most points! Can you take #1?</h4>
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
