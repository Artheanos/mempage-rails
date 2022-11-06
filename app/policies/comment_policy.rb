# frozen_string_literal: true

class CommentPolicy < ApplicationPolicy
  alias create? logged_in?
  alias destroy? owner?
end
