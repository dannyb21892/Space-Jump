let activeItems = []

class Bouncer {
  constructor(left, parentPlatform) {
    let bouncer = document.createElement("div")
    bouncer.className = "bouncer"
    bouncer.style.left = `${left}px`
    bouncer.style.bottom = `800px`
    activeItems.push(bouncer)
    if (parentPlatform.constructor.name === "MobilePlatform" || parentPlatform.constructor.name === "MobileFragilePlatform") {
      bouncer.dataset.movementSpeed = parentPlatform.movementSpeed
      bouncer.dataset.direction = parentPlatform.direction
      let movement = setInterval(() => {
        let bouncerStyle = window.getComputedStyle(bouncer)

        bouncer.style.left = `${Math.floor(Number(bouncerStyle.left.slice(0,-2))) + (bouncer.dataset.direction*bouncer.dataset.movementSpeed)}px`
        if (Number(bouncer.style.left.slice(0,-2)) < 10) {
          bouncer.style.left = "9px"
          bouncer.dataset.direction = bouncer.dataset.direction * (-1)
        } else if (Number(bouncer.style.left.slice(0,-2)) > 558) {
          bouncer.style.left = "559px"
          bouncer.dataset.direction = bouncer.dataset.direction * (-1)
        }
        if (Number(bouncerStyle.bottom.slice(0,-2)) < - 10) {
          clearInterval(movement)
        }
      }, 1000/60)
    }
    document.getElementById("play-field").append(bouncer)
  }
}

class MagicWand {
  constructor(left, parentPlatform) {
    let wand = document.createElement("div")
    wand.className = "wand"
    wand.style.left = `${left}px`
    wand.style.bottom = `800px`
    activeItems.push(wand)
    if (parentPlatform.constructor.name === "MobilePlatform" || parentPlatform.constructor.name === "MobileFragilePlatform") {
      wand.dataset.movementSpeed = parentPlatform.movementSpeed
      wand.dataset.direction = parentPlatform.direction
      let movement = setInterval(() => {
        let wandStyle = window.getComputedStyle(wand)

        wand.style.left = `${Math.floor(Number(wandStyle.left.slice(0,-2))) + (wand.dataset.direction*wand.dataset.movementSpeed)}px`
        if (Number(wand.style.left.slice(0,-2)) < 10) {
          wand.style.left = "9px"
          wand.dataset.direction = wand.dataset.direction * (-1)
        } else if (Number(wand.style.left.slice(0,-2)) > 558) {
          wand.style.left = "559px"
          wand.dataset.direction = wand.dataset.direction * (-1)
        }
        if (Number(wandStyle.bottom.slice(0,-2)) < - 10) {
          clearInterval(movement)
        }
      }, 1000/60)
    }
    document.getElementById("play-field").append(wand)
  }

  static useWand(event) {
    if(event.which === 32 && game.wands > 0) {
      let jumper = document.getElementById("jumper")
      let wandCount = document.getElementById("wandCount")
      new BasicPlatform(Number(jumper.style.left.slice(0,-2))-15, Number(jumper.style.bottom.slice(0,-2))-15)
      game.wands--
      wandCount.innerText = `x ${Number(wandCount.innerText.slice(2))-1}`
    }
  }
}

class Rocket {
  constructor(left, parentPlatform) {
    let rocket = document.createElement("div")
    rocket.className = "rocket"
    rocket.style.left = `${left}px`
    rocket.style.bottom = `800px`
    activeItems.push(rocket)
    if (parentPlatform.constructor.name === "MobilePlatform" || parentPlatform.constructor.name === "MobileFragilePlatform") {
      rocket.dataset.movementSpeed = parentPlatform.movementSpeed
      rocket.dataset.direction = parentPlatform.direction
      let movement = setInterval(() => {
        let rocketStyle = window.getComputedStyle(rocket)

        rocket.style.left = `${Math.floor(Number(rocketStyle.left.slice(0,-2))) + (rocket.dataset.direction*rocket.dataset.movementSpeed)}px`
        if (Number(rocket.style.left.slice(0,-2)) < 10) {
          rocket.style.left = "9px"
          rocket.dataset.direction = rocket.dataset.direction * (-1)
        } else if (Number(rocket.style.left.slice(0,-2)) > 558) {
          rocket.style.left = "559px"
          rocket.dataset.direction = rocket.dataset.direction * (-1)
        }
        if (Number(rocketStyle.bottom.slice(0,-2)) < - 10) {
          clearInterval(movement)
        }
      }, 1000/60)
    }
    document.getElementById("play-field").append(rocket)
  }

  static useRocket(rocket) {
    document.getElementById("jumper")
    window.jumperObject.rocketActive = 1
    window.jumperObject.speed = 0
    window.jumperObject.direction = 0
    rocket.style.transform = "rotate(0deg)"
    let frameVel = [-15]
    for(let i=1; i<360; i++){
      if(i < 11){
        frameVel.push(frameVel[frameVel.length-1] + 3)
      } else if (i < 240){
        frameVel.push(15)
      } else if (i < 300){
        frameVel.push(frameVel[frameVel.length-1] - 0.25)
      } else {
        frameVel.push(frameVel[frameVel.length-1] - 0.25)
      }
    }
    let frame = 0
    let rocketInterval = setInterval(()=>{
      rocket.style.bottom = `${Number(rocket.style.bottom.slice(0,-2)) + frameVel[frame]}px`
      if (frame < 300){
        jumper.style.transform = "rotate(0deg)"
        window.jumperObject.speed = 0
        window.jumperObject.direction = 0
        window.jumperObject.rotation = 0
        jumper.style.bottom = `${Number(rocket.style.bottom.slice(0,-2)) - 20}px`
        rocket.style.left = `${Number(jumper.style.left.slice(0,-2))-6}px`
        if (frame < 120 && frame%4===0) {
          jumper.style.boxShadow = `0px 0px 150px ${Number(jumper.style.boxShadow.slice(18,-2)) + 1}px red`
        } else if (frame >= 120){
          jumper.style.boxShadow = `0px 0px 150px ${2*Math.abs(Math.floor(frameVel[frame]))}px red`
        }
        if (Math.floor(Number(jumper.style.bottom.slice(0,-2))) > 400) {
          window.game.screenScroll(Math.floor(Number(jumper.style.bottom.slice(0,-2))) - 400)
        }
      }
      // debugger
      if (frame >= 300) {
        rocket.style.transform = `rotate(${Number(rocket.style.transform.slice(7,-4))-2}deg)`
        rocket.style.left = `${Number(rocket.style.left.slice(0,-2)) - 2}px`
      }
      frame++
      if (frame >= 360) {
        jumper.style.boxShadow = ""
        clearInterval(rocketInterval)
      }
    }, 1000/60)
  }
}

function maybeSpawnNewItem(left, parentPlatform) {
  let freqArray = [//be sure to add new items to here and give them a frequency
    {klass: Rocket, frequency: 0.005},//manually sort items in increasing frequency
    {klass: MagicWand, frequency: 0.01},
    {klass: Bouncer, frequency: 0.05}
  ]//each frequency represents the probability the item will spawn on every new platform

  let random = Math.random()
  let cumulativeFreq = 0

  for(let i=0; i<freqArray.length; i++){
    cumulativeFreq += freqArray[i].frequency
    if (random < cumulativeFreq) {
      new (freqArray[i].klass)(left, parentPlatform)
      break
    }
  }
}
