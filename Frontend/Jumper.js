class Jumper {
  static jump() {
    let jumpVel = []
    let frameCycle = 60
    for (let i=0; i<60; i++) {
      jumpVel[i] = Math.floor(15-(0.5*i))
    }
    console.log(jumpVel)
    let jumper = document.getElementById("jumper")
    let frame = 0
    let interval = setInterval(function(){
        jumper.style.bottom = `${Number(jumper.style.bottom.slice(0,-2)) + jumpVel[frame]}px`

        frame++
        if (frame > 59) {
          clearInterval(interval)
          Jumper.jump()
        }
      }, 1000/60)
  }
}
