# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::RegisterContract do
  subject(:contract) { described_class.new(current_user:) }
  let(:current_user) { create(:user) }
  let(:email) { 'user@email.com' }
  let(:password) { 'user' }
  let(:params) do
    {
      email:,
      password:
    }
  end
  let(:result) { contract.call(params) }

  context 'when valid' do
    it { expect(result).to be_success }
  end

  context 'when invalid' do
    context 'when email is invalid' do
      let(:email) { 'user' }

      it do
        expect(result).to be_failure
        expect(result.errors.to_h).to eq({ email: ['not a valid email format'] })
      end
    end

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
