class Api::V1::GamesController < ApplicationController
  def index
    @games = Game.all
    render json: @games
  end

  def create
    @game = Game.new(game_params)
    @player = Player.find_or_create_by(username: params["game"]["player"]["username"])
    @game.player_id = @player.id

    if @game.save
      render json: @game, status: 201
    else
      render json: @game.errors, status: :unprocessable_entity
    end

  end

  private

  def game_params
    params.require(:game).permit(:score, :duration)
  end
end
