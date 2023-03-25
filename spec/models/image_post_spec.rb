# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImagePost do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }

    it { is_expected.to have_many(:comments).dependent(:destroy) }
    it { is_expected.to have_many(:hashtags).through(:post_hashtags) }
    it { is_expected.to have_many(:post_hashtags).dependent(:destroy) }
    it { is_expected.to have_many(:reactions).dependent(:destroy) }
    it { is_expected.to have_one_attached(:image) }
  end

  describe 'fields' do
    it { is_expected.to have_db_column(:header).of_type(:string).with_options(null: false) }
    it { is_expected.to have_db_column(:created_at).of_type(:datetime).with_options(null: false) }
    it { is_expected.to have_db_column(:updated_at).of_type(:datetime).with_options(null: false) }
    it { is_expected.to have_db_column(:user_id).of_type(:integer).with_options(null: false) }
  end
end
