# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::RegisterService do
  let(:subject) { described_class.new(params) }
  let(:params) { { email: 'jan@jan.pl', password: 'Password123' } }

  context 'when params are valid' do
    it 'creates a new user' do
      expect { subject.call }.to change(User, :count).by 1
      expect(User.first.email).to eq params[:email]
    end
  end

  context 'when email already exists' do
    before { create(:user, email: params[:email]) }

    it 'does not create a new user' do
      expect { subject.call }.not_to change(User, :count)
    end

    it 'returns a proper error' do
      subject.call do |result|
        result.failure do |data|
          expect(data).to eq(errors: { email: 'User already exists' })
        end
        result.success do |_data|
          raise 'err'
        end
      end
    end
  end
end
