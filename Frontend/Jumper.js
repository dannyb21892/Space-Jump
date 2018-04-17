let jumper = document.getElementById("jumper")
let jumpInterval
let collisionCheckInterval


class Jumper {
  jump(){ //this function controls the constant jumping
    let that = this
    let jumpVel = []

    //CHANGE ONLY THESE VALUES
    let initialJumpSpeed = 15
    let numberOfFramesPerJump = 60
    let velocityDecreasePerFrame = 0.5 //it must be true that (numberOfFramesPerJump*velocityDecreasePerFrame)/(2*initialJumpSpeed) = 1
    // maxJumpHeight = 225
    //DON'T CHANGE BELOW HERE
    for (let i=0; i<numberOfFramesPerJump; i++) {
      jumpVel[i] = Math.floor(initialJumpSpeed-(velocityDecreasePerFrame*i))
      // if (i<30) {jumpHeight = jumpHeight + jumpVel[i]}
    }
    // console.log(jumpHeight)
    // let frame = 0
    // jumpInterval = setInterval(function(){
    //   if (frame >= numberOfFramesPerJump) {
    //     jumper.style.bottom = `${Number(jumper.style.bottom.slice(0,-2)) - initialJumpSpeed}px`
    //     that.collisionCheck()
    //   } else {
    //     jumper.style.bottom = `${Number(jumper.style.bottom.slice(0,-2)) + jumpVel[frame]}px`
    //     that.collisionCheck()
    //     frame++
    //   }
    //   }, 1000/numberOfFramesPerJump)
    let frame = 0

    function myLoop() {
      setTimeout(function () {
        jumper.style.bottom = `${Number(jumper.style.bottom.slice(0,-2)) + jumpVel[frame]}px`
        if((frame >= 30) && (frame < 60)){
          if (that.collisionCheck()) {
            that.jump()
            return true
          }
        }
        frame++
        if (frame < 60) {
          myLoop()
          //debugger
          return false
        } else {
          //debugger
          return fallLoop()
        }
      }, 1000/numberOfFramesPerJump)
    }

    function fallLoop() {
      setTimeout(function () {
        jumper.style.bottom = `${Number(jumper.style.bottom.slice(0,-2)) - initialJumpSpeed}px`
        if (that.collisionCheck()) {
          that.jump()
          return true
        } else {
          fallLoop()
          return false
        }
      }, 1000/numberOfFramesPerJump)
    }

    if (myLoop()) {return}

  }

  moveJumper(e) {
    let lateralSpeed = 3 //how many pixels per frame you move laterally
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

  collisionCheck(){
    let jumperStyle = window.getComputedStyle(jumper)
    let jumperWidth = Number(jumperStyle.getPropertyValue('width').slice(0,-2))
    let jumperLeft = Number(jumper.style.left.slice(0,-2))
    let jumperBottom = Number(jumper.style.bottom.slice(0,-2))
    let jumperTop = Number(jumperBottom - jumper.style.height.slice(0,-2))
    let output = false
    // collisionCheckInterval = setInterval(function(){
    activePlatforms.forEach(platform => { //platform in this case is an array [platformDiv, platformInstance]
      let platformLeft = platform[1].left
      let platformBottom = platform[1].bottom
      let platformStyle = window.getComputedStyle(platform[0])
      let platformWidth = Number(platformStyle.getPropertyValue('width').slice(0,-2))
      let platformHeight = Number(platformStyle.getPropertyValue('height').slice(0,-2))

      let horizontalCollision = ((jumperLeft + jumperWidth) >= platformLeft) && (jumperLeft <= (platformLeft + platformWidth))
      let verticalCollision = (jumperBottom >= (platformBottom-10)) && (jumperBottom <= (platformBottom + platformHeight))
      if (horizontalCollision && verticalCollision) {
        //clearInterval(jumpInterval)
        jumper.style.bottom = `${platformBottom + platformHeight}px`
        //window.jumper.jump()
        output = true
      }
    })
    if (jumperBottom <= 0) {
     clearInterval(jumpInterval)
     jumper.style.bottom = `0px`
     // window.jumper.jump()
     output = true
   } else if (jumperBottom > 0 && !output){
     output = false
   }
   return output
  // }, 1000/60)
  }


}
