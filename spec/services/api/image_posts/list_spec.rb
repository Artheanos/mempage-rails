# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ImagePosts::List do
  let(:user) { double }
  let(:page) { 2 }
  subject { described_class.new(user, page) }

  it 'returns valid serializer' do
    query_mock = double
    allow(ImagePost).to receive(:page).with(2).and_return(query_mock)
    allow(query_mock).to receive_message_chain(:includes, :order).and_return([])
    allow(query_mock).to receive_message_chain(:left_joins, :where, :group, :count).and_return(5)
    allow(query_mock).to receive_message_chain(:left_joins, :group, :count).and_return(6)
    allow(query_mock).to receive_message_chain(:left_joins, :where, :pluck, :to_h).and_return(7)

    result_mock = {}
    allow(ActiveModel::Serializer::CollectionSerializer).to receive(:new).with(
      [],
      serializer: Api::ImagePostSerializer,
      comment_counts: 6,
      current_user: user,
      client_reactions: 7,
      dislike_counts: 5,
      like_counts: 5,
    ).and_return(result_mock)

    result = subject.call.success[:json]
    expect(result).to eq({
                           results: result_mock,
                           count: 0
                         })
  end
end
