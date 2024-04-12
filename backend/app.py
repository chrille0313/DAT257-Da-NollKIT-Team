from flask import Flask
from api.recipes.routes import recipe_routes

app = Flask(__name__)
app.register_blueprint(recipe_routes)

if __name__ == '__main__':
    app.run(debug=True)  # TODO: Don't use debug in production
