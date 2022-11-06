# frozen_string_literal: true

module Api
  class SingleImagePostSerializer < ImagePostSerializer
    has_many :comments
  end
end
