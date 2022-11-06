# frozen_string_literal: true

class PostHashtag < ApplicationRecord
  belongs_to :image_post
  belongs_to :hashtag

  validates :image_post_id, uniqueness: { scope: :hashtag_id }
end
