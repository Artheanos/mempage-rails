# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PostHashtag do
  describe 'associations' do
    it { is_expected.to belong_to(:image_post) }
    it { is_expected.to belong_to(:hashtag) }
  end

  describe 'fields' do
    it { is_expected.to have_db_column(:image_post_id).of_type(:integer).with_options(null: false) }
    it { is_expected.to have_db_column(:hashtag_id).of_type(:integer).with_options(null: false) }
    it_behaves_like 'it has timestamps'
  end

  describe 'validation' do
    let(:hashtag) { create(:hashtag) }
    let(:image_post) { create(:image_post) }
    let(:post_hashtag_2) { described_class.new(hashtag:, image_post:) }

    describe 'image_post_id' do
      before { post_hashtag_1.save }

      describe 'when post hashtag with the same image_post_id and hashtag_id does not exist' do
        let(:post_hashtag_1) { described_class.new(hashtag: create(:hashtag), image_post: create(:image_post)) }

        it { expect(post_hashtag_2.valid?).to be true }
      end

      describe 'when post hashtag with the same image_post_id and hashtag_id exists' do
        let(:post_hashtag_1) { described_class.new(hashtag:, image_post:) }

        it { expect(post_hashtag_2.valid?).to be false }
      end
    end
  end
end
