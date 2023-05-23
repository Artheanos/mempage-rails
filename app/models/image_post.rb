# frozen_string_literal: true

class ImagePost < ApplicationRecord
  belongs_to :user

  has_many :comments, dependent: :destroy
  has_many :reactions, dependent: :destroy
  has_many :post_hashtags, dependent: :destroy
  has_many :hashtags, through: :post_hashtags
  has_one_attached :image
  accepts_nested_attributes_for :reactions

  validates :header, presence: true

  def attach_hashtag(name)
    hashtag = Hashtag.find_or_create_by(name:)
    PostHashtag.create!(image_post: self, hashtag:)
  end
end
