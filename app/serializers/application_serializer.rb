# frozen_string_literal: true

class ApplicationSerializer < ActiveModel::Serializer
  include Rails

  # def self.all_attributes
  #   def attributes
  #     object.attributes.symbolize_keys
  #   end
  # end
end
