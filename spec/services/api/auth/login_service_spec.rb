# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::LoginService do
  let(:subject) { described_class.new(user.email, login_password) }
  let(:login_password) { user.password }
  let(:user) { create(:user) }

  context 'when params are valid' do
    it 'returns the proper params' do
      subject.call do |result|
        result.success do |data|
          expect(data[:json]).to include(:token)
          expect(data[:json]).to include(user_id: user.id)
        end
        result.failure do
          raise 'I failed :('
        end
      end
    end
  end

  context 'when params are invalid' do
    let(:login_password) { "#{user.password}123" }

    it 'returns proper values' do
      subject.call do |result|
        result.success do
          raise 'I succeeded :o'
        end
        result.failure do |data|
          expect(data[:status]).to be :unauthorized
        end
      end
    end
  end
end
