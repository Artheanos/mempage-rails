# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CommentsController, type: :controller do
  let(:author) { create(:user) }
  let(:action_user) { author }
  let(:image_post) { create(:image_post) }
  let(:image_post_id) { image_post.id }

  let(:comment_params) do
    { comment: { content: 'hello world', image_post_id: image_post_id } }
  end

  describe '#create' do
    let(:action) { post :create, params: comment_params }

    context 'when params are valid' do
      it 'creates a comment with proper params' do
        http_login(action_user)
        action
        expect(Comment.first.as_json).to include('content' => 'hello world')
      end
    end

    context 'when user is not logged in' do
      it 'does not create a comment' do
        expect { action }.not_to change(Comment, :count)
      end
    end

    context 'when params are invalid' do
      let(:image_post_id) { image_post.id + 1 }

      it 'does not create a comment' do
        http_login(action_user)
        expect { action }.not_to change(Comment, :count)
      end
    end
  end

  describe '#destroy' do
    let(:comment) { create(:comment, user: author) }
    let(:comment_id) { comment.id }
    let(:action) { delete :destroy, params: { id: comment_id } }
    before { http_login(action_user) }

    context 'when params are valid' do
      it 'deletes a comment' do
        comment
        expect { action }.to change(Comment, :count).by(-1)
      end
    end

    context 'when action user is not the author' do
      let(:action_user) { create(:user) }
      it 'does not delete the comment' do
        comment
        expect { action }.not_to change(Comment, :count)
      end
    end

    context 'when params are invalid' do
      let(:comment_id) { comment.id + 1 }

      it 'does not delete the comment' do
        comment
        expect { action }.not_to change(Comment, :count)
      end
    end
  end
end
