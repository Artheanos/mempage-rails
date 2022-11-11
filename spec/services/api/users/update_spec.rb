# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Users::Update do
  let(:subject) { described_class.new(user, params) }
  let(:user) { create :user, password: 'oldPassword' }
  let(:params) { { password: 'newPassword' } }
  let(:result) { subject.call }

  context 'when params are valid' do
    it 'changes password' do
      expect(user.authenticate('oldPassword')).to be_truthy
      result
      expect(user.reload.authenticate('newPassword')).to be_truthy
      expect(user.authenticate('oldPassword')).to be false
      expect(result.success).to eq(true)
    end
  end

  context 'when params are invalid' do
    context 'when invalid param is passed' do
      let(:params) { { password: '12' } }

      it 'does not change password' do
        expect(user.authenticate('oldPassword')).to be_truthy
        result
        expect(user.reload.authenticate('oldPassword')).to be_truthy
        expect(result.failure).to eq({ errors: { password: ['must be longer than 3'] }, status: :bad_request })
      end
    end
  end
end
