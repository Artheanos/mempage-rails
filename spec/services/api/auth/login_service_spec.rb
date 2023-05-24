# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::LoginService do
  let(:subject) { described_class.new({ email: user.email, password: login_password }) }
  let(:login_password) { user.password }
  let(:user) { create(:user) }

  context 'when params are valid' do
    it 'returns the proper params' do
      allow(Api::Auth::JsonWebToken).to receive(:encode).and_return('token123')

      expect(subject.call.success[:json]).to eq({ token: 'token123', user: })
    end
  end

  context 'when params are invalid' do
    let(:login_password) { "#{user.password}123" }

    it 'returns proper values' do
      expect(subject.call.failure).to eq({ status: :unauthorized })
    end
  end
end
