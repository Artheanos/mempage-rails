# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::RegisterController, type: :controller do
  describe '#create' do
    let(:register_params) { { email: 'email@email.com', password: 'email@email.com' } }
    let(:action) { post :create, params: register_params }
    let(:json_response) do
      JSON.parse(response.body)
    end

    context 'when params are valid' do
      before { action }

      it 'returns valid data' do
        token = json_response['token']
        expect(Api::Auth::JsonWebToken.decode(token)[:user_id]).to eq User.first.id
        expect(json_response['user']).to include({
                                                   'email' => 'email@email.com'
                                                 })
      end

      it 'creates the new user' do
        expect(User.count).to eq 1
      end
    end

    context 'when user already exists' do
      before do
        create(:user, email: register_params[:email])
      end

      it 'does not create the user' do
        expect { action }.not_to change(User, :count)
      end

      it 'returns unauthorized status' do
        action
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
end
