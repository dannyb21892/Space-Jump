let activePlatforms = []

function initialSpawns() {
  for (let i=0; i<10; i++){
    let left
    let bottom
    if (i === 0) {
      left = Math.round(Math.random()*530 + 20)
      bottom = Math.round(Math.random()*225)
    } else {
      let last = activePlatforms[activePlatforms.length - 1][1]
      bottom = Math.round(Math.random()*200 + last.bottom)
      let halfrange = 400-(bottom - last.bottom)
      left = Math.random()*2*halfrange + (last.left - halfrange)
      if (left < 20) {
        left = 20
      } else if (left > 530) {
        left = 530
      }
      //left = Math.round(Math.random()*530 + 20)
    }

    new BasicPlatform(left, bottom)
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
