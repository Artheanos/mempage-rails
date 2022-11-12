# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Users::Update do
  let(:subject) { described_class.new(user, params) }
  let(:user) { create :user, password: 'oldPassword' }
  let(:params) { { password: 'newPassword' } }
  let(:result) { subject.call }

  context 'when params are valid' do
    it 'changes params' do
      expect(user.authenticate('oldPassword')).to be_truthy
      result
      expect(user.reload.authenticate('newPassword')).to be_truthy
      expect(user.authenticate('oldPassword')).to be false
      expect(result.success).to be true
    end
  end
end
