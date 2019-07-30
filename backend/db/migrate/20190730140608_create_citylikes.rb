class CreateCitylikes < ActiveRecord::Migration[5.2]
  def change
    create_table :citylikes do |t|
      t.string :city
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
