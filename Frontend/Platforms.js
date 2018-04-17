let activePlatforms = []

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
