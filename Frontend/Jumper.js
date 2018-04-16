class Jumper {
  static jump() {
    let jumpVel = []

    //CHANGE ONLY THESE VALUES
    let initialJumpSpeed = 15
    let numberOfFramesPerJump = 60
    let velocityDecreasePerFrame = 0.5 //it must be true that (numberOfFramesPerJump*velocityDecreasePerFrame)/(2*initialJumpSpeed) = 1

    //DON'T CHANGE BELOW HERE
    for (let i=0; i<numberOfFramesPerJump; i++) {
      jumpVel[i] = Math.floor(initialJumpSpeed-(velocityDecreasePerFrame*i))
    }

    let jumper = document.getElementById("jumper")
    let frame = 0
    let interval = setInterval(function(){
        jumper.style.bottom = `${Number(jumper.style.bottom.slice(0,-2)) + jumpVel[frame]}px`

        frame++
        if (frame >= numberOfFramesPerJump) {
          clearInterval(interval)
          Jumper.jump()
        }
      }, 1000/numberOfFramesPerJump)
  }
}
