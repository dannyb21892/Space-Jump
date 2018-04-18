class Leaderboard {
  static render(){
    console.log("refreshing lb")
    let sorted = Leaderboard.sortEntries()
    let leaderboard = document.getElementById('lb-table')//ul')
    leaderboard.innerHTML = `<tr>
                              <th>Rank</th>
                              <th>Player</th>
                              <th>Score</th>
                            </tr>`
    let rank = 1
    sorted.then((games) => {games.forEach((game) => {
        let tr = document.createElement("tr")
        tr.innerHTML = `<td>${rank++}</td>
                        <td>${game.player.username}</td>
                        <td>${game.score}</td>`
        leaderboard.append(tr)
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
