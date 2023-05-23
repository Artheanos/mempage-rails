# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ReactionsController, type: :controller do
  let(:user) { create(:user, email: 'email@email.com', password: 'email@email.com') }
  let(:image_post) { create(:image_post) }
  let(:json_response) { JSON.parse(response.body) }

  before { http_login user }

  describe '#upsert' do
    let(:params) do
      {
        image_post_id: image_post.id,
        reaction: :like
      }
    end
    let(:action) { post :upsert, params: }

    context 'when params are valid' do
      let(:expected_reaction) do
        {
          'image_post_id' => image_post.id,
          'reaction' => 'like',
          'user_id' => user.id
        }
      end

      context 'when reaction does not exist' do
        it 'creates reaction' do
          expect { action }.to change(Reaction, :count).from(0).to(1)
          expect(Reaction.last.attributes).to include expected_reaction
          expect(response).to have_http_status :ok
        end
      end

      context 'when reaction exists' do
        before { create :reaction, image_post:, user:, reaction: :dislike }

        it 'updates reaction' do
          expect { action }.not_to change(Reaction, :count)
          expect(Reaction.last.attributes).to include expected_reaction
          expect(response).to have_http_status :ok
        end
      end
    end

    context 'when params are invalid' do
      let(:params) { { reaction: :yes, image_post_id: 0 } }

      it 'returns unauthorized status' do
        expect { action }.not_to change(Reaction, :count)
        expect(response).to have_http_status :bad_request
        expect(json_response).to eq({
                                      'errors' => {
                                        'reaction' => ['must be one of: like, dislike'],
                                        'image_post_id' => ['not found']
                                      }
                                    })
      end
    end
  end

  describe '#destroy' do
    let(:params) { { image_post_id: image_post.id } }
    let(:action) { delete :destroy, params: }

    context 'when reaction exists' do
      before { create :reaction, image_post:, user: }

      it 'destroys the reaction' do
        expect { action }.to change(Reaction, :count).from(1).to(0)
      end
    end

    context 'when reaction does not exist' do
      it 'returns not found' do
        action
        expect(response).to have_http_status :not_found
      end
    end
  end
end
