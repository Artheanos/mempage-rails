# frozen_string_literal: true

module AuthHelper
  def http_login(user)
    request.headers.merge!(Authorization: user.generate_jwt)
  end
end
