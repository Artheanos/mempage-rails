# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Hashtag do
  describe 'associations' do
    it { is_expected.to have_many(:post_hashtags) }
    it { is_expected.to have_many(:image_posts).through(:post_hashtags) }
  end

  describe 'fields' do
    it { is_expected.to have_db_column(:name).of_type(:string).with_options(null: false) }
    it_behaves_like 'it has timestamps'
  end

  describe 'validation' do
    describe 'name' do
      it { expect(described_class.new(name: nil).valid?).to be false }
      it { expect(described_class.new(name: '').valid?).to be false }
      it { expect(described_class.new(name: 'a').valid?).to be true }
    end
  end
end
