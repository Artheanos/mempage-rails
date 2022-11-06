# frozen_string_literal: true

class Hashtag < ApplicationRecord
  has_many :post_hashtags
  has_many :image_posts, through: :post_hashtags
  validates :name, presence: true, uniqueness: true
end
