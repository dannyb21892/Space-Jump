let activeItems = []

class Bouncer {
  constructor(left) {
    let bouncer = document.createElement("div")
    bouncer.className = "bouncer"
    bouncer.style.left = `${left}px`
    bouncer.style.bottom = `800px`
    activeItems.push(bouncer)
    document.getElementById("play-field").append(bouncer)
  }
}

function maybeSpawnNewItem(left) {
  let freqArray = [//be sure to add new items to here and give them a frequency
    {klass: Bouncer, frequency: 0.05} //manually sort items in increasing frequency
  ]//each frequency represents the probability the item will spawn on every new platform

  let random = Math.random()
  let cumulativeFreq = 0

  for(let i=0; i<freqArray.length; i++){
    cumulativeFreq += freqArray[i].frequency
    if (random < cumulativeFreq) {
      new (freqArray[i].klass)(left)
      break
    }
  }
}
