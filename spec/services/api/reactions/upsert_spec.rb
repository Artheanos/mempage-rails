# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Reactions::Upsert do
  let(:user) { double(id: 27) }
  subject { described_class.new(user, 28, :like) }

  context 'when reaction exists' do
    it 'updates the reaction' do
      reaction_mock = double
      allow(Reaction).to receive(:find_by).with(user_id: 27, image_post_id: 28).and_return(reaction_mock)

      update_result = double
      allow(reaction_mock).to receive(:update!).with(reaction: :like).and_return(update_result)

      expect(subject.call.success).to be update_result
    end
  end

  context 'when reaction does not exist' do
    it 'creates a reaction' do
      create_result = double
      allow(Reaction).to receive(:find_by).and_return(nil)

      allow(Reaction).to receive(:create!).with({
                                                  image_post_id: 28,
                                                  reaction: :like,
                                                  user_id: 27
                                                }).and_return(create_result)

      expect(subject.call.success).to be create_result
    end
  end
end
