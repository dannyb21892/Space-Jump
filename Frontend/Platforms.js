let activePlatforms = []

function initialSpawns() {
  for (let i=0; i<10; i++){
    let left
    let bottom
    if (i === 0) {
      left = Math.round(Math.random()*530 + 20)
      bottom = Math.round(Math.random()*225)
    } else {
      let coords = generateSpawnPoint()
      bottom = coords[0]
      left = coords[1]
    }

    new BasicPlatform(left, bottom)
   }
}

function generateSpawnPoint(){
  let last = activePlatforms[activePlatforms.length - 1][1]
  bottom = Math.round(Math.random()*200 + last.bottom)
  let halfrange = 400-(bottom - last.bottom)
  if (last.left === 20) {
    left = last.left + Math.random()*halfrange
  } else if (last.left === 530) {
    left = last.left - Math.random()*halfrange
  } else {
    left = Math.random()*2*halfrange + (last.left - halfrange)
  }
  if (left < 20) {
    left = 20
  } else if (left > 530) {
    left = 530
  }
  return [bottom, left]
}

function maybeSpawnNewPlatform(){
  let last = activePlatforms[activePlatforms.length - 1][1]

  if (last.bottom <= 600) {
    let coords = generateSpawnPoint()
    new BasicPlatform(coords[1], 800)
  } else if (Math.random() > window.spawnFrequency) {
    let coords = generateSpawnPoint()
    new BasicPlatform(coords[1], 800)
  }
}

class BasicPlatform {
  constructor(left, bottom){
    //class instance
    this.bottom = bottom
    this.left = left

    //html stuff
    let playField = document.getElementById("play-field")

    let platform = document.createElement("div")

    platform.className = "basicPlatform"
    platform.style.left = `${left}px`
    platform.style.bottom = `${bottom}px`

    playField.append(platform)
    activePlatforms.push([platform, this])
  }
}
