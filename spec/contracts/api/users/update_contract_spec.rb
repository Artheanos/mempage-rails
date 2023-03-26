# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Users::UpdateContract do
  subject(:contract) { described_class.new(current_user: create(:user)) }
  let(:password) { 'password' }
  let(:params) { { password: password } }
  let(:result) { contract.call(params) }

  context 'when valid' do
    it { expect(result).to be_success }
  end

  context 'when invalid' do
    context 'when password is invalid' do
      context 'when password is blank' do
        let(:password) { '' }

        it do
          expect(result).to be_failure
          expect(result.errors.to_h).to eq({ password: ['must be filled'] })
        end
      end

      context 'when password is too short' do
        let(:password) { 'abc' }

        it do
          expect(result).to be_failure
          expect(result.errors.to_h).to eq({ password: ['too short'] })
        end
      end
    end
  end
end
