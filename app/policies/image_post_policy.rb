# frozen_string_literal: true

class ImagePostPolicy < ApplicationPolicy
  alias create? logged_in?
  alias update? owner?
  alias destroy? owner?
end
