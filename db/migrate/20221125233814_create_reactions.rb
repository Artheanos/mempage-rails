class CreateReactions < ActiveRecord::Migration[7.0]
  def change
    create_table :reactions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :image_post, null: false, foreign_key: true
      t.integer :reaction, null: false

      t.timestamps
      t.index [:user_id, :image_post_id, :reaction], unique: true
    end
  end
end
