# frozen_string_literal: true

module Api
  module Auth
    class TokenController < ApplicationController
      include Dry::Monads::Result::Mixin

      def create
        if current_user.present?
          render_success json: { token: current_user.generate_jwt, user: current_user }
        else
          render_failure status: :unauthorized
        end
      end
    end
  end
end
