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

function maybeSpawnNewItem(left, parentPlatform) {
  let freqArray = [//be sure to add new items to here and give them a frequency
    {klass: Bouncer, frequency: 0.99} //manually sort items in increasing frequency
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
