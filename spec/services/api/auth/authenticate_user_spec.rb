# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::AuthenticateUser do
  let(:subject) { described_class.new(headers) }
  let(:user) { create(:user) }
  let(:headers) do
    { 'Authentication' => Api::Auth::JsonWebToken.encode({ user_id: user.id }) }
  end

  context 'when params are valid' do
    it 'returns the user' do
      expect(subject.call.id).to eq user.id
    end
  end

  context 'when params are invalid' do
    let(:headers) { {} }
    it 'returns nil' do
      expect(subject.call).to be_nil
    end
  end
end
