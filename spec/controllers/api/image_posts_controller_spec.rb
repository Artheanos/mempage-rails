# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ImagePostsController, type: :controller do
  let(:author) { create(:user) }
  let(:client) { author }
  let(:image_post) { create(:image_post, user: author) }
  let(:image_post_id) { image_post.id }
  let(:json_response) do
    action
    JSON.parse(response.body)
  end
  let(:json_results) { json_response['results'] }

  before { http_login(client) if client }

  describe '#create' do
    let(:create_params) do
      {
        header: 'hello world',
        image_file: Rack::Test::UploadedFile.new(file_fixture('images/img_1.jpg'), 'image/png')
      }
    end

    it 'creates image_post' do
      post :create, params: create_params
      expect(ImagePost.first.as_json).to include('header' => 'hello world')
    end
  end

  describe '#update' do
    let(:image_post_author) { author }
    let!(:image_post) { create(:image_post, user: image_post_author, header: 'aaa') }

    let(:new_header) { 'newHeader' }
    let(:update_params) { { id: image_post.id, header: new_header } }

    describe 'when client is the author' do
      it 'updates image_post' do
        post :update, params: update_params

        expect(response).to have_http_status :ok
        expect(image_post.reload.header).to eq 'newHeader'
      end
    end

    describe 'when the client is not the author' do
      let(:client) { create(:user) }

      it 'does not update image_post' do
        post :update, params: update_params

        expect(response).to have_http_status :unauthorized
        expect(image_post.reload.header).to eq 'aaa'
      end
    end

    describe 'when the params are invalid' do
      let(:new_header) { '' }

      it 'does not update image_post' do
        post :update, params: update_params

        expect(response).to have_http_status :unprocessable_entity
        expect(image_post.reload.header).to eq 'aaa'
      end
    end
  end

  describe '#index' do
    let(:index_params) { {} }
    let(:action) do
      get :index, params: index_params
    end

    context 'when you dont pass any params' do
      let(:client) { create(:user, email: 'user@2.com') }

      def create_image_post(header, user)
        post = create(:image_post, header:, user:)
        3.times { create(:comment, image_post: post) }
        3.times { create(:reaction, image_post: post, reaction: :like) }
        2.times { create(:reaction, image_post: post, reaction: :dislike) }
      end

      it 'lists image_posts in reverse order' do
        user = create(:user, email: 'user@0.com')
        create_image_post 'header0', user
        create_image_post 'header0', client
        create(:image_post, header: 'header2', user: client, reactions_attributes: [{ user: client, reaction: :like }])

        expect(json_response.keys).to eq %w[results count]

        expect(json_results.first).to include({
                                                'comment_count' => 0,
                                                'current_user_reaction' => 'like',
                                                'dislikes' => 0,
                                                'header' => 'header2',
                                                'likes' => 1,
                                                'user' => { 'email' => 'user@2.com', 'id' => client.id }
                                              })

        expect(json_results.last).to include({
                                               'comment_count' => 3,
                                               'current_user_reaction' => nil,
                                               'dislikes' => 2,
                                               'header' => 'header0',
                                               'likes' => 3,
                                               'user' => { 'email' => 'user@0.com', 'id' => user.id }
                                             })
      end

      it 'returns comment count' do
        create(:comment, image_post:)
        create(:comment, image_post:)

        expect(json_results.first['comment_count']).to eq 2
      end
    end

    context 'when you pass page number' do
      let(:index_params) { { page: 2 } }

      it 'returns proper posts' do
        10.times { |i| create(:image_post, header: "header#{i}") }
        expect(json_results.last['header']).to eq 'header0'
        expect(json_results.first['header']).to eq 'header4'
      end
    end
  end

  describe '#show' do
    let(:action) { get :show, params: { id: image_post_id } }
    before do
      create :comment, image_post:, content: '1', created_at: 1.day.ago
      create :comment, image_post:, content: '2', created_at: 3.days.ago
      create :comment, image_post:, content: '3', created_at: 2.days.ago
    end

    context 'when params are valid' do
      it 'returns the image_post' do
        expect(json_response['comments'].map { |comment| comment['content'] }).to eq %w[1 3 2]
      end
    end

    context 'when params are invalid' do
      let(:image_post_id) { image_post.id + 1 }

      it 'does not return the image_post' do
        expect(json_response).to eq({})
      end

      it 'returns not_found status' do
        json_response
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe '#destroy' do
    let(:action) { delete :destroy, params: { id: image_post_id } }
    before { image_post }

    context 'when params are valid' do
      before { http_login(author) }

      it 'deletes the image_post' do
        expect { action }.to change(ImagePost, :count).by(-1)
      end
    end

    context 'when action user is not the author' do
      let(:user) { create(:user) }
      before { http_login(user) }

      it 'does not delete the image_post' do
        expect { action }.not_to change(ImagePost, :count)
      end

      it 'returns unauthorized status' do
        action
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when params are invalid' do
      let(:image_post_id) { image_post.id + 1 }
      before { http_login(author) }

      it 'does not delete the image_post' do
        expect { action }.not_to change(ImagePost, :count)
      end
    end
  end
end
