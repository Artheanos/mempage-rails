class OldMigrations < ActiveRecord::Migration[7.0]
  def change
    create_table :image_posts do |t|
      t.string :header

      t.timestamps
    end

    create_table :comments do |t|
      t.string :content
      t.references :image_post, null: false, foreign_key: true

      t.timestamps
    end

    create_table :users do |t|
      t.string :email
      t.string :password_digest

      t.timestamps
    end

    add_reference :image_posts, :user, null: false, foreign_key: true

    add_reference :comments, :user, null: false, foreign_key: true

    add_index :users, :email, unique: true

    create_table :hashtags do |t|
      t.string :name, unique: true

      t.timestamps
    end

    create_table :post_hashtags do |t|
      t.references :image_post, null: false, foreign_key: true
      t.references :hashtag, null: false, foreign_key: true
      t.index [:image_post_id, :hashtag_id], unique: true

      t.timestamps
    end
  end
end
