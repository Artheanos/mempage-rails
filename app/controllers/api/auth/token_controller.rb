# frozen_string_literal: true

module Api
  module Auth
    class TokenController < ApplicationController
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
