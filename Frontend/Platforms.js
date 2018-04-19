let activePlatforms = []

function initialSpawns() {
  new BasicPlatform(275, 0)
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
   $(".basicPlatform").fadeOut(0)
   $("#jumper").fadeOut(0)
   $(".basicPlatform").fadeIn(1000)
   $("#jumper").fadeIn(1000)
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

function decideWhichPlatform(){
  let progress = window.game.score / 100000
  if (progress > 1) {progress = 1}
  let freqArray = [
    {klass: BasicPlatform, frequency: 1 - progress},
    {klass: MobileFragilePlatform, frequency: 0.1*progress},
    {klass: SmallPlatform, frequency: 0.2*progress},
    {klass: FragilePlatform, frequency: 0.3*progress},
    {klass: MobilePlatform, frequency: 0.4*progress}
  ].sort((a,b) => {
    if (a.frequency < b.frequency) {
      return -1
    } else if (a.frequency > b.frequency) {
      return 1
    } else {
      return 0
    }
  }) //sort the array of platforms in increasing order of frequency given current score
  let whichPlatform = ""
  let random = Math.random()
  let cumulativeFreq = 0

  for(let i=0; i<freqArray.length; i++){
    cumulativeFreq += freqArray[i].frequency
    if (random < cumulativeFreq) {
      whichPlatform = freqArray[i].klass
      break
    }
  }
  return whichPlatform
}

function maybeSpawnNewPlatform(){
  let last = activePlatforms[activePlatforms.length - 1][1]
  let whichPlatform = null
  let coords = null
  if (last.bottom <= 600) {
    coords = generateSpawnPoint()
    whichPlatform = decideWhichPlatform()
    new whichPlatform(coords[1], 800)
  } else if (Math.random() > window.spawnFrequency) {
    coords = generateSpawnPoint()
    whichPlatform = decideWhichPlatform()
    new whichPlatform(coords[1], 800)
  }

  if(!whichPlatform){
    //do not spawn an item
  } else if (whichPlatform === SmallPlatform) {
    maybeSpawnNewItem(coords[1]-6) // center 32px item on 20px platform
  } else {
    maybeSpawnNewItem(coords[1]+9) // center 32px item on 50px platform
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

class FragilePlatform {
  constructor(left, bottom){
    //class instance
    this.bottom = bottom
    this.left = left

    //html stuff
    let playField = document.getElementById("play-field")

    let platform = document.createElement("div")

    platform.className = "fragilePlatform"
    platform.style.left = `${left}px`
    platform.style.bottom = `${bottom}px`

    playField.append(platform)
    activePlatforms.push([platform, this])
  }
}

class MobilePlatform {
  constructor(left, bottom){
    //class instance
    this.bottom = bottom
    this.left = left
    this.movementSpeed = Math.floor(Math.random()*10 + 1)
    if (Math.random() < 0.5) {
      this.direction = -1
    } else {
      this.direction = 1
    }
    let that = this
    //html stuff
    let playField = document.getElementById("play-field")

    let platform = document.createElement("div")

    platform.className = "mobilePlatform"
    platform.style.left = `${left}px`
    platform.style.bottom = `${bottom}px`

    playField.append(platform)
    activePlatforms.push([platform, this])

    let movement = setInterval(() => {
      let platformStyle = window.getComputedStyle(platform)

      platform.style.left = `${Math.floor(Number(platformStyle.left.slice(0,-2))) + (that.direction*that.movementSpeed)}px`
      if (Number(platform.style.left.slice(0,-2)) < 0 || Number(platform.style.left.slice(0,-2)) > 550) {
        that.direction = that.direction * (-1)
      }
      if (Number(platformStyle.bottom.slice(0,-2)) < - 10) {
        clearInterval(movement)
      }
    }, 1000/60)
  }
}

class SmallPlatform {
  constructor(left, bottom){
    //class instance
    this.bottom = bottom
    this.left = left

    //html stuff
    let playField = document.getElementById("play-field")

    let platform = document.createElement("div")

    platform.className = "smallPlatform"
    platform.style.left = `${left}px`
    platform.style.bottom = `${bottom}px`

    playField.append(platform)
    activePlatforms.push([platform, this])
  }
}

class MobileFragilePlatform {
  constructor(left, bottom){
    //class instance
    this.bottom = bottom
    this.left = left
    this.movementSpeed = Math.floor(Math.random()*10 + 1)
    if (Math.random() < 0.5) {
      this.direction = -1
    } else {
      this.direction = 1
    }
    let that = this
    //html stuff
    let playField = document.getElementById("play-field")

    let platform = document.createElement("div")

    platform.className = "mobileFragilePlatform"
    platform.style.left = `${left}px`
    platform.style.bottom = `${bottom}px`

    playField.append(platform)
    activePlatforms.push([platform, this])

    let movement = setInterval(() => {
      let platformStyle = window.getComputedStyle(platform)

      platform.style.left = `${Math.floor(Number(platformStyle.left.slice(0,-2))) + (that.direction*that.movementSpeed)}px`
      if (Number(platform.style.left.slice(0,-2)) < 0 || Number(platform.style.left.slice(0,-2)) > 550) {
        that.direction = that.direction * (-1)
      }
      if (Number(platformStyle.bottom.slice(0,-2)) < - 10) {
        clearInterval(movement)
      }
    }, 1000/60)
  }
}
