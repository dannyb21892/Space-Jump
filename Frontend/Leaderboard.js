class Leaderboard {
  static render(){
    let lbInfo = document.getElementById('lb-info')
    lbInfo.innerHTML = "Click a player to see all their scores"
    document.removeEventListener("click", Leaderboard.renderUser)
    let sorted = Leaderboard.sortEntries()
    let leaderboard = document.getElementById('lb-table')
    leaderboard.innerHTML = `<tr>
                              <th>Rank</th>
                              <th>Player</th>
                              <th>Score</th>
                            </tr>`
    let rank = 1
    let userList = {}
    sorted.then((games) => {games.forEach((game) => {
        if(game.score > 0) {
          if(!userList[game.player.username]){
            userList[game.player.username] = game.score
            let tr = document.createElement("tr")
            tr.innerHTML = `<td>${rank++}</td>
                            <td class="lb-player">${game.player.username}</td>
                            <td>${game.score}</td>`
            leaderboard.append(tr)
          } else if (userList[game.player.username] < game.score) {
            let tr = document.createElement("tr")
            tr.innerHTML = `<td>${rank++}</td>
                            <td>${game.player.username}</td>
                            <td>${game.score}</td>`
            leaderboard.append(tr)
          }
        }
      })
      document.addEventListener("click", Leaderboard.renderUser)
    })
  }

  static sortEntries() {
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

  static renderUser(event) {
    if (event.target.className === "lb-player") {
      let username = event.target.innerText
      let sorted = Leaderboard.sortEntries()
      let leaderboard = document.getElementById('lb-table')
      let lbinfo = document.getElementById('lb-info')
      leaderboard.innerHTML = `<tr>
                                <th>Rank</th>
                                <th>Player</th>
                                <th>Score</th>
                              </tr>`
      let rank = 1
      let total = 0
      sorted.then((games) => {games.forEach((game) => {
          if(game.player.username === username) {
            let tr = document.createElement("tr")
            tr.innerHTML = `<td>${rank++}</td>
                            <td>${game.player.username}</td>
                            <td>${game.score}</td>`
            leaderboard.append(tr)
            total += game.score
          }
        })
        lbinfo.innerHTML = `Player ${username} has played ${rank} games with an average score of ${Math.floor(total/rank)}. <a id="lb-reset">Click here to see all players.</a>`
        let a = document.getElementById("lb-reset")
        a.addEventListener("click", Leaderboard.render)
      })
    }
  }
}
