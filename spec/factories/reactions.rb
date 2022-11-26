# frozen_string_literal: true

FactoryBot.define do
  factory :reaction do
    user
    image_post
    reaction { :like }
  end
end
