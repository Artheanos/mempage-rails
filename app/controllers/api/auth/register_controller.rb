# frozen_string_literal: true

module Api
  module Auth
    class RegisterController < ApplicationController
      def create
        params = validate_params RegisterContract
        RegisterService.new(params).call { |result| render_result(result) }
      end
    end
  end
end
