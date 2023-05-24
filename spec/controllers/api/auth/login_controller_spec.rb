# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::LoginController, type: :controller do
  describe '#create' do
    let(:user) { create(:user, email: 'email@email.com', password: 'email@email.com') }
    let(:login_params) { { email: user.email, password: user.password } }
    let(:action) { post :create, params: login_params }
    let(:json_response) { JSON.parse(response.body) }

    before { action }

    context 'when params are valid' do
      it 'returns valid data' do
        token = json_response['token']
        expect(Api::Auth::JsonWebToken.decode(token)[:user_id]).to eq user.id
        expect(json_response['user']).to include({
                                                   'email' => 'email@email.com'
                                                 })
      end
    end

    context 'when params are invalid' do
      let(:login_params) { { email: user.email, password: "#{user.password}123" } }

      it 'returns unauthorized status' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns errors' do
        expect(json_response).to eq({
                                      'errors' => { 'email' => ['Invalid credentials'] }
                                    })
      end
    end
  end
end
