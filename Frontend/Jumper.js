class Jumper {
  constructor(){
    this.multiplier = 1;
    this.rotation = 0
    this.direction = 0
    this.speed = 0
    this.rocketActive = 0
  }

  jump(){ //this function controls the constant jumping
    setTimeout(() => {//controls the possibility of a rocket being active. See the timeout delay below
      window.jumperObject.rocketActive = 0
      let jumper = document.getElementById("jumper")
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

      function myLoop() {
        setTimeout(function () {
          jumper.style.bottom = `${(Math.floor(Number(jumper.style.bottom.slice(0,-2))) + jumperObject.multiplier*jumpVel[frame])}px`
          window.jumperObject.rotation = window.jumperObject.direction*window.jumperObject.speed
          jumper.style.transform = `rotate(${Number(jumper.style.transform.slice(7,-4))+window.jumperObject.rotation}deg)`

          if (Math.floor(Number(jumper.style.bottom.slice(0,-2))) > 400) {
            window.game.screenScroll(Math.floor(Number(jumper.style.bottom.slice(0,-2))) - 400)
          }
          if((frame >= 30) && (frame < 60)){
            jumperObject.multiplier = 1
            if (that.collisionCheck()) {
              that.jump()
              return true
            }
          }
          frame++
          if (frame < 60) {
            myLoop()
            return false
          } else if (!gameOver){
            return fallLoop()
          } else {
            return false
          }
        }, 1000/numberOfFramesPerJump)
      }

      function fallLoop() {
        setTimeout(function () {
          jumper.style.bottom = `${Number(jumper.style.bottom.slice(0,-2)) - initialJumpSpeed}px`
          window.jumperObject.speed = Math.ceil(frame/5)
          window.jumperObject.rotation = window.jumperObject.direction*window.jumperObject.speed
          jumper.style.transform = `rotate(${Number(jumper.style.transform.slice(7,-4))+window.jumperObject.rotation}deg)`
          if (that.collisionCheck()) {
            that.jump()
            return true
          } else  if (!gameOver){
            fallLoop()
            return false
          } else {
            return false
          }
        }, 1000/numberOfFramesPerJump)
      }

      if (myLoop()) {
        return
      }
    }, 5000*window.jumperObject.rocketActive)//if rocket is active, delay jump for 5 seconds
  }

  moveJumper(e) {
    let jumper = document.getElementById("jumper")
    let lateralSpeed = 3 //how many pixels per frame you move laterally
    let numberOfMovementFramesPerKeyPress = 5 //kinda controls the "slideyness"

    let sign = 0 //this part decides which direction to move
    if (e.which === 97) {
      window.jumperObject.direction = -1
      sign = -1
    } else if (e.which === 100) {
      sign = 1
      window.jumperObject.direction = 1
    }

    //this part does the actual movement
    let frame = 0
    let interval = setInterval(function() {
      jumper.style.left = `${Number(jumper.style.left.slice(0,-2)) + (sign*lateralSpeed)}px`
      window.jumperObject.speed += 0.1
      window.jumperObject.rotation = window.jumperObject.direction*window.jumperObject.speed
      jumper.style.transform = `rotate(${Number(jumper.style.transform.slice(7,-4))+window.jumperObject.rotation}deg)`
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
    let jumper = document.getElementById("jumper")
    let jumperStyle = window.getComputedStyle(jumper)
    let jumperWidth = Number(jumperStyle.getPropertyValue('width').slice(0,-2))
    let jumperLeft = Number(jumper.style.left.slice(0,-2))
    let jumperBottom = Number(jumper.style.bottom.slice(0,-2))
    let jumperTop = Number(jumperBottom - jumper.style.height.slice(0,-2))
    let output = false

    activePlatforms.forEach(platform => { //platform in this case is an array [platformDiv, platformInstance]
      let platformStyle = window.getComputedStyle(platform[0])
      let platformLeft = Number(platformStyle.getPropertyValue('left').slice(0,-2))
      let platformBottom = platform[1].bottom
      let platformWidth = Number(platformStyle.getPropertyValue('width').slice(0,-2))
      let platformHeight = Number(platformStyle.getPropertyValue('height').slice(0,-2))

      let horizontalCollision = ((jumperLeft + jumperWidth) >= platformLeft) && (jumperLeft <= (platformLeft + platformWidth))
      let verticalCollision = (jumperBottom >= (platformBottom-10)) && (jumperBottom <= (platformBottom + platformHeight))
      if (horizontalCollision && verticalCollision) {
        jumper.style.bottom = `${platformBottom + platformHeight}px`
        if (platform[0].className === "fragilePlatform") {
          let i = activePlatforms.findIndex(element => element === platform)
          activePlatforms = [...activePlatforms.slice(0,i), 0, ...activePlatforms.slice(i+1)]
          platform[0].remove()
        } else if (platform[0].className === "mobileFragilePlatform"){
          let i = activePlatforms.findIndex(element => element === platform)
          activePlatforms = [...activePlatforms.slice(0,i), 0, ...activePlatforms.slice(i+1)]
          platform[0].remove()
        }
        output = true
      }
    })
    activePlatforms = activePlatforms.filter(element => element != 0)

    activeItems.forEach(item => {

      let itemStyle = window.getComputedStyle(item)
      let itemLeft = Number(itemStyle.getPropertyValue('left').slice(0,-2))
      let itemBottom = Number(itemStyle.getPropertyValue('bottom').slice(0,-2))
      let itemWidth = Number(itemStyle.getPropertyValue('width').slice(0,-2))
      let itemHeight = Number(itemStyle.getPropertyValue('height').slice(0,-2))

      let horizontalCollision = ((jumperLeft + jumperWidth) >= itemLeft) && (jumperLeft <= (itemLeft + itemWidth))
      let verticalCollision = (jumperBottom >= (itemBottom-10)) && (jumperBottom <= (itemBottom + itemHeight))

      if (horizontalCollision && verticalCollision) {
        if (item.className === "bouncer") {
          jumper.style.bottom = `${itemBottom + itemHeight}px`
          jumperObject.multiplier = 2
          output = true
        }
        if (item.className === "wand") {
          let wandCount = document.getElementById("wandCount")
          game.wands++
          wandCount.innerText = `x ${Number(wandCount.innerText.slice(2))+1}`
          let i = activeItems.findIndex(element => element === item)
          activeItems = [...activeItems.slice(0,i), 0, ...activeItems.slice(i+1)]
          item.remove()
          output = false
        }
        if (item.className === "rocket") {
          Rocket.useRocket(item)
          output = true
        }
      }
    })
    activeItems = activeItems.filter(element => element != 0)

    if (jumperBottom < -15) {
     window.game.end()
     output = false
   } else if (jumperBottom > 0 && !output){
     output = false
   }

   if (output) {
     window.jumperObject.speed = 1
     window.jumperObject.rotation = 0
     jumper.style.transform = `rotate(0deg)`
   }
   return output
  }
}
