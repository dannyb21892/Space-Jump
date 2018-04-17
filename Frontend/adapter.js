class Adapter {
  static getLeaderboardEntries(){
    return fetch("http://localhost:3000/api/v1/games")
    .then((response) => response.json())
  }

  static sendGameResults(playername, score, duration){
    fetch("http://localhost:3000/api/v1/games",{
      method: "POST",
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        player: {
          name: `${playername}`
        },
        score: `${score}`,
        duration: `${duration}`
      })
    })
  }
}
