# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  alias update? logged_in?
end
