class Leaderboard {
  static render(){
    console.log("refreshing lb")
    let sorted = Leaderboard.sortEntries()
    let leaderboard = document.getElementById('lb-ul')
    leaderboard.innerText = ""
    let rank = 1
    sorted.then((games) => {games.forEach((game) => {
        let li = document.createElement("li")
        li.innerText = `Rank: ${rank++} | Player: ${game.player.username} | Score: ${game.score}`
        leaderboard.append(li)
      })
    })
    console.log("should be done?")
  }

  static sortEntries() {
    console.log("fetching rankings")
    let entries = Adapter.getLeaderboardEntries()
    return entries.then(json => {
      return json.sort((a,b) => {
        if (Number(a.score) > Number(b.score)){
          return -1
        } else if (Number(a.score) < Number(b.score)){
          return 1
        } else {
          return 0
        }
      })
    })
  }


}
