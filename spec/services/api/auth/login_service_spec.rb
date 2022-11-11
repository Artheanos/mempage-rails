# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::LoginService do
  let(:subject) { described_class.new(user.email, login_password) }
  let(:login_password) { user.password }
  let(:user) { create(:user) }

  context 'when params are valid' do
    it 'returns the proper params' do
      allow_any_instance_of(Api::Auth::AssignToken).to receive(:call).and_return('token123')

      expect(subject.call.success[:json]).to eq({ token: 'token123', user_id: user.id })
    end
  end

  context 'when params are invalid' do
    let(:login_password) { "#{user.password}123" }

    it 'returns proper values' do
      expect(subject.call.failure).to eq({ errors: {}, status: :unauthorized })
    end
  end
end
