class Tutorial {
  static spawn(){
    let tutorial = document.createElement("div")
    tutorial.id = "tutorial"
    tutorial.innerHTML = `<h1 style="text-decoration: underline">SPACE JUMP</h1>
    <h4>Your avatar will jump automatically.
    Use "A" and "D" keys to move laterally.
    Hold keys to build momentum for far jumps!</h4>
    <h4>You will encounter several types of platforms and items:</h4>
    <div class="basicPlatform"></div><p style="font-size: 3px; color: black;">.</p>
    <h5>Basic platforms have no special attribute.</h5>
    <div class="mobilePlatform"></div><p style="font-size: 3px; color: black;">.</p>
    <h5>Mobile platforms will move left to right.</h5>
    <div class="fragilePlatform"></div><p style="font-size: 3px; color: black;">.</p>
    <h5>Fragile platforms will disappear after you jump on them!<br>
    Some may also move left to right!</h5>
    <div class="smallPlatform"></div><p style="font-size: 3px; color: black;">.</p>
    <h5>Small platforms are...well I think you understand this one.</h5>
    <div class="bouncer"></div><p style="font-size: 10px; color: black;">.</p>
    <h5>Bouncers give you a double height jump when you land on them.</h5>
    <div class="wand"></div><p style="font-size: 10px; color: black;">.</p>
    <h5>Collect magic wands and press "SPACE" to magically spawn a basic platform beneath you.</h5>
    <div class="rocket"></div><p style="font-size: 10px; color: black;">.</p>
    <h5>Hop on a rocket to get a free ride for five seconds. You will automatically hop off.</h5>
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
