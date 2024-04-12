from flask import Blueprint, jsonify

recipe_routes = Blueprint('recipe_routes', __name__)


@recipe_routes.route('/')
def get_data():
    data = [{
        'name': 'Din mamma',
        'age': 'Fucking asgammal',
        'weight': '13 ton'
    }] * 5

    return jsonify(data)
