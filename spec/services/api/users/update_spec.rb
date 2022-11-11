# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Users::Update do
  let(:subject) { described_class.new(user, params) }
  let(:user) { create :user, email: 'prev@email.com' }
  let(:params) { { email: 'new@email.com' } }

  before do
    create :user, email: 'email@taken.com'
  end

  context 'when params are valid' do
    it { expect { subject.call }.to change { user.reload.email }.from('prev@email.com').to('new@email.com') }

    it 'returns' do
      expect(subject.call.success).to eq(Dry::Monads::Unit)
    end
  end

  context 'when params are invalid' do
    let(:params) { { email: 'email@taken.com' } }

    it { expect { subject.call }.not_to(change { user.reload.email }) }

    it 'returns' do
      pp subject.call.failure
    end
  end
end
