# frozen_string_literal: true

module Api
  class UserSerializer < ApplicationSerializer
    attributes :id, :email
  end
end
