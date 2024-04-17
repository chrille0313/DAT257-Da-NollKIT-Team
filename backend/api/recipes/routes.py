from flask import Blueprint, jsonify
from api import get_base_api_route
from api.recipes.service import RecipeService  # TODO: Fix better relative import

recipe_routes = Blueprint('recipe_routes', __name__)
recipe_service = RecipeService()


@recipe_routes.route(f"{get_base_api_route()}/recipes")
def get():
    return jsonify(recipe_service.get_random_recipes())
