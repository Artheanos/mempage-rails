# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  validates :email, uniqueness: true

  has_many :image_posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  def generate_jwt
    Api::Auth::JsonWebToken.encode(user_id: id)
  end

  def self.find_by_credentials(email, password)
    user = find_by_email(email)
    user if user&.authenticate(password)
  end
end
