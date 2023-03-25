# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Reaction do
  describe 'associations' do
    it { is_expected.to belong_to(:image_post) }
    it { is_expected.to belong_to(:user) }
  end

  describe 'fields' do
    it { is_expected.to have_db_column(:reaction).of_type(:integer).with_options(null: false) }
    it { is_expected.to have_db_column(:image_post_id).of_type(:integer).with_options(null: false) }
    it { is_expected.to have_db_column(:user_id).of_type(:integer).with_options(null: false) }
    it_behaves_like 'it has timestamps'

    it { is_expected.to have_db_index(%i[user_id image_post_id reaction]) }
  end

  describe 'validations' do
    describe 'uniqueness' do
      describe 'user reacts twice to the same post' do
        let(:user) { create(:user) }
        let(:image_post) { create(:image_post) }
        let(:reaction) { 0 }
        subject { described_class.new(user: user, image_post: image_post, reaction: reaction_2) }

        before { create(:reaction, user: user, image_post: image_post, reaction: reaction) }

        describe 'with the same reaction' do
          let(:reaction_2) { reaction }

          it { expect { subject.save }.to raise_error ActiveRecord::RecordNotUnique }
        end

        describe 'with different reactions' do
          let(:reaction_2) { 1 }
          it { expect(subject.save).to be true }
        end
      end
    end
  end
end
