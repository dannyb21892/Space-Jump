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
      console.log("use wand")
      let jumper = document.getElementById("jumper")
      let wandCount = document.getElementById("wandCount")
      new BasicPlatform(Number(jumper.style.left.slice(0,-2))-15, Number(jumper.style.bottom.slice(0,-2))-15)
      game.wands--
      wandCount.innerText = `x ${Number(wandCount.innerText.slice(2))-1}`
    }
  }
}

function maybeSpawnNewItem(left, parentPlatform) {
  let freqArray = [//be sure to add new items to here and give them a frequency
    {klass: MagicWand, frequency: 0.01}, //manually sort items in increasing frequency
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
