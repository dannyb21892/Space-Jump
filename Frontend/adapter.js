class Adapter {
  static getLeaderboardEntries(){
    return fetch("http://localhost:3000/api/v1/games")
    .then((response) => response.json())
  }

  static sendGameResults(username, score, duration){
    return fetch("http://localhost:3000/api/v1/games",{
      method: "POST",
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        game: {
          player: {
            username: `${username}`
          },
          score: `${score}`,
          duration: `${duration}`
        }
      })
    })
  }
}
