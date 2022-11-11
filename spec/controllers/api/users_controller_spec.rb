# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  let(:user) { create(:user) }
  let(:user_id) { user.id }
  let(:json_response) do
    action
    JSON.parse(response.body)
  end

  describe '#show' do
    let(:action) { get :show, params: { id: user_id } }

    context 'when params are valid' do
      it 'returns the user with proper values' do
        3.times { create(:image_post, user: user) }
        4.times { create(:comment, user: user) }
        expect(json_response).to include(
          'email' => user.email,
          'comment_count' => 4,
          'post_count' => 3
        )
      end

      it 'returns ok status' do
        action
        expect(response).to have_http_status :ok
      end
    end

    context 'when user doesnt exist' do
      let(:user_id) { user.id + 1 }

      it 'doesnt return data' do
        expect(json_response).to eq({})
      end

      it 'returns not found status' do
        action
        expect(response).to have_http_status :not_found
      end
    end
  end

  describe '#update' do
    let(:action) { put :update, params: { id: '0', user: { password: password } } }

    before { http_login(user) }

    context 'when params are valid' do
      let(:password) { 'newPassword' }

      it 'returns empty response' do
        expect(json_response).to eq({})
        expect(response).to have_http_status :ok
        expect(user.reload.authenticate('newPassword')).to be_truthy
      end
    end
  end
end
