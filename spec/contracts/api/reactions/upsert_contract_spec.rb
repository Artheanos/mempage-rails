# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Reactions::UpsertContract do
  subject(:contract) { described_class.new(current_user: create(:user)) }
  let(:reaction) { 'like' }
  let(:image_post) { create(:image_post) }
  let(:image_post_id) { image_post.id }
  let(:params) do
    {
      reaction:,
      image_post_id:
    }
  end
  let(:result) { contract.call(params) }

  context 'when valid' do
    it { expect(result).to be_success }
  end

  context 'when invalid' do
    context 'when reaction is invalid' do
      let(:reaction) { 'idk' }

      it do
        expect(result).to be_failure
        expect(result.errors.to_h).to eq({ reaction: ['must be one of: like, dislike'] })
      end
    end

    context 'when image_post_id is invalid' do
      let(:image_post_id) { 1 }

      it do
        expect(result).to be_failure
        expect(result.errors.to_h).to eq({ image_post_id: ['not found'] })
      end
    end
  end
end
