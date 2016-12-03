class CreateBmiInfos < ActiveRecord::Migration[5.0]
  def change
    create_table :bmi_infos do |t|
      t.decimal :bmi, precision: 10, scale: 2
      t.integer :bmi_class
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
