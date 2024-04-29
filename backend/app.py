from flask import Flask
from api.recipes.routes import recipe_routes
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app) # FIXME solve cors error without cross-origin
app.config['CORS_HEADERS'] = 'Content-Type'
app.register_blueprint(recipe_routes)


if __name__ == '__main__':
    app.run(debug=True)  # TODO: Don't use debug in production
