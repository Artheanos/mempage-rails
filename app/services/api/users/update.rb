# frozen_string_literal: true

module Api
  module Users
    class Update < ApplicationService
      def initialize(user, params)
        @user = user
        @params = validate_params(UpdateContract, params)
      end

      def execute
        @user.update(@params)
      end
    end
  end
end
