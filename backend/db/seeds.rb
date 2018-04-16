# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Player.create(username: "stacey")
Player.create(username: "dan")
Game.create(player_id: 1, score: 10, duration: 15)
Game.create(player_id: 2, score: 5, duration: 10)
