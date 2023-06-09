# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::TokenController, type: :controller do
  describe '#create' do
    let(:user) { create(:user, email: 'email@email.com', password: 'email@email.com') }
    let(:action) { post :create }
    let(:json_response) { JSON.parse(response.body) }

    context 'when params are valid' do
      before do
        http_login user
        action
      end

      it 'returns valid data' do
        token = json_response['token']
        expect(Api::Auth::JsonWebToken.decode(token)[:user_id]).to eq user.id
        expect(json_response['user']).to include({
                                                   'email' => 'email@email.com'
                                                 })
      end
    end

    context 'when params are invalid' do
      before { action }

      it 'returns unauthorized status' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
