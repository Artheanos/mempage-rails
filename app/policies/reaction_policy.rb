# frozen_string_literal: true

class ReactionPolicy < ApplicationPolicy
  alias upsert? logged_in?
  alias destroy? logged_in?
end
