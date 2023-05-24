# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Reactions::Destroy do
  let(:user) { double(id: 27) }
  subject { described_class.new(user, 28) }

  context 'when reaction exists' do
    it 'destroys the reaction' do
      reaction_mock = double
      destroy_result = double
      allow(reaction_mock).to receive(:destroy).and_return(destroy_result)
      allow(Reaction).to receive(:find_by).with(user_id: 27, image_post_id: 28).and_return(reaction_mock)

      expect(subject.call.success).to be destroy_result
    end
  end

  context 'when reaction does not exist' do
    it 'returns failure' do
      allow(Reaction).to receive(:find_by).and_return(nil)

      expect(subject.call.failure).to eq({ status: :not_found })
    end
  end
end
