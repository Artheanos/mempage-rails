# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::Comments::CreateContract do
  subject(:contract) { described_class.new(current_user: create(:user)) }
  let(:content) { 'comment content' }
  let(:image_post) { create(:image_post) }
  let(:image_post_id) { image_post.id }
  let(:params) do
    {
      content:,
      image_post_id:
    }
  end
  let(:result) { contract.call(params) }

  context 'when valid' do
    it { expect(result).to be_success }
  end

  context 'when invalid' do
    context 'when content is invalid' do
      let(:content) { '' }

      it do
        expect(result).to be_failure
        expect(result.errors.to_h).to eq({ content: ['must be filled'] })
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
