class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title,              null: false, default: ""
      t.string :content,              null: false, default: ""
      t.boolean :active,              null: false, default: true

      t.timestamps null: false
    end
  end
end
