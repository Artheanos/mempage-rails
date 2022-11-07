# frozen_string_literal: true

def random_image
  Rack::Test::UploadedFile.new(Dir.glob("#{Rails.root}/spec/fixtures/files/images/img_*").sample, 'image/png')
end

random_users = 3.times.map do
  email = Faker::Internet.email
  User.create(email: email, password: email)
end

random_posts = 3.times.map do
  ImagePost.create(header: Faker::Movies::StarWars.planet, image: random_image, user: random_users.sample)
end

random_posts.each do |post|
  3.times do
    Comment.create(content: Faker::Movies::StarWars.quote, image_post: post, user: random_users.sample)
  end
end

User.create(email: 'user1@user.com', password: 'user1@user.com')
User.create(email: 'user2@user.com', password: 'user2@user.com')

5.times { Hashtag.create(name: Faker::Adjective.positive) }
