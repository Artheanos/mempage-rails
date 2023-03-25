# frozen_string_literal: true

FactoryBot.define do
  factory :image_post do
    sequence(:header) { |n| "header#{n}" }
    image do
      Rack::Test::UploadedFile.new(Dir.glob("#{Rails.root}/spec/fixtures/files/images/img_*").sample, 'image/png')
    end
    user
  end
end
