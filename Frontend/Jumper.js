let jumper = document.getElementById("jumper")

class Jumper {
  jump(){ //this function controls the constant jumping
    let that = this
    let jumpVel = []

    //CHANGE ONLY THESE VALUES
    let initialJumpSpeed = 15
    let numberOfFramesPerJump = 60
    let velocityDecreasePerFrame = 0.5 //it must be true that (numberOfFramesPerJump*velocityDecreasePerFrame)/(2*initialJumpSpeed) = 1

    //DON'T CHANGE BELOW HERE
    for (let i=0; i<numberOfFramesPerJump; i++) {
      jumpVel[i] = Math.floor(initialJumpSpeed-(velocityDecreasePerFrame*i))
    }

    let frame = 0
    let interval = setInterval(function(){
        jumper.style.bottom = `${Number(jumper.style.bottom.slice(0,-2)) + jumpVel[frame]}px`

        frame++
        if (frame >= numberOfFramesPerJump) {
          clearInterval(interval)
          that.jump()
        }
      }, 1000/numberOfFramesPerJump)
  }

  moveJumper(e) {
    let lateralSpeed = 2 //how fast you can move sideways
    let numberOfMovementFramesPerKeyPress = 5 //kinda controls the "slideyness"

    let sign = 0 //this part decides which direction to move
    if (e.which === 97) {
      sign = -1
    } else if (e.which === 100) {
      sign = 1
    }

    //this part does the actual movement
    let frame = 0
    let interval = setInterval(function() {
      jumper.style.left = `${Number(jumper.style.left.slice(0,-2)) + (sign*lateralSpeed)}px`
      frame++

      if (Number(jumper.style.left.slice(0,-2) < lateralSpeed) && sign === -1) {
        jumper.style.left = "0px"
      } else if (Number(jumper.style.left.slice(0,-2) > 580 - lateralSpeed) && sign === 1) {
        jumper.style.left = "580px"
      }

      if (frame >= numberOfMovementFramesPerKeyPress) {clearInterval(interval)}
    }, numberOfMovementFramesPerKeyPress*1000/60)
  }


}
