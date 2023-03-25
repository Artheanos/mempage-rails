class DisableNullForCommentContent < ActiveRecord::Migration[7.0]
  def change
    change_column(:comments, :content, :string, null: false)
    change_column(:hashtags, :name, :string, null: false)
    change_column(:image_posts, :header, :string, null: false)
    change_column(:users, :email, :string, null: false)
    change_column(:users, :password_digest, :string, null: false)
  end
end
