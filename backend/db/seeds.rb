# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Citylike.destroy_all

# u1=User.create(username: "Brandon")
# u2=User.create(username: "Sean")
# u3=User.create(username: "Tony")

# Citylike.create(city: "Raleigh,NC", user: u1)
# Citylike.create(city: "Boston,MA", user: u1);
# Citylike.create(city: "Los Angeles,CA", user: u1);