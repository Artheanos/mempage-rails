# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Comments::Create do
  let(:user) { 'user1' }
  let(:params) { { a: 1, b: 2 } }
  let(:result) { {} }
  subject { described_class.new(user, params) }

  it 'calls comments create with proper parameters' do
    allow(Comment).to receive(:create).with({ a: 1, b: 2, user: 'user1' }).and_return(result)
    expect(subject.call).to eq Dry::Monads::Success(result)
  end
end
