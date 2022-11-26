# frozen_string_literal: true

class ImagePost < ApplicationRecord
  belongs_to :user

  has_many :comments, dependent: :destroy
  has_many :reactions, dependent: :destroy
  has_many :post_hashtags, dependent: :destroy
  has_many :hashtags, through: :post_hashtags
  has_one_attached :image

  validates :header, presence: true

  def attach_hashtag(name)
    hashtag = Hashtag.find_or_create_by(name: name)
    PostHashtag.create!(image_post: self, hashtag: hashtag)
  end
end
