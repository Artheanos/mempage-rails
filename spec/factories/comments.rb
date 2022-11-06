# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    content { 'hello this is a comment' }
    image_post
    user
  end
end
