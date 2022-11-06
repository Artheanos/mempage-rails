# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Auth::JsonWebToken do
  let(:user) { create(:user) }

  it 'decodes encoded credentials' do
    token = described_class.encode(user_id: user.id)
    user_id = described_class.decode(token)[:user_id]
    expect(User.find(user_id).email).to eq user.email
  end
end
