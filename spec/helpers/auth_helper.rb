# frozen_string_literal: true

module AuthHelper
  def http_login(user)
    request.headers.merge!(Authentication: user.generate_jwt)
  end
end
