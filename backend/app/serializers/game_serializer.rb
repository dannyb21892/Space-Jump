class GameSerializer < ActiveModel::Serializer
  attributes :id, :score, :duration
  belongs_to :player
end
