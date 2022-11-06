# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::LoginController, type: :controller do
  describe '#create' do
    let(:user) { create(:user, email: 'email@email.com', password: 'email@email.com') }
    let(:login_params) { { email: user.email, password: user.password } }
    let(:action) { post :create, params: login_params }
    let(:json_response) do
      JSON.parse(response.body)
    end

    before { action }

    context 'when params are valid' do
      it 'returns user_id' do
        user_id = json_response['user_id']
        expect(user_id).to eq user.id
      end

      it 'returns valid token' do
        token = json_response['token']
        credentials = Api::Auth::JsonWebToken.decode(token)
        expect(credentials[:user_id]).to eq user.id
      end
    end

    context 'when params are invalid' do
      let(:login_params) { { email: user.email, password: "#{user.password}123" } }

      it 'returns unauthorized status' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
