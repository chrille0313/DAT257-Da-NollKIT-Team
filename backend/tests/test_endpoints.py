import unittest
from unittest.mock import patch
from flask import Flask
from api.recipes.routes import recipe_routes


class TestRecipeAPI(unittest.TestCase):

    # See https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    def setUp(self):
        app = Flask(__name__)
        app.register_blueprint(recipe_routes)
        self.app = app.test_client()

    @patch('api.recipes.service.RecipeService.get_random_recipes')
    def test_get_random_recipes_endpoint(self, mock_get_random_recipes):
        mock_get_random_recipes.return_value = [{'recipe': 'data'}]

        response = self.app.get('/api/v1/recipes')
        data = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertIn('recipe', data[0])

    def test_invalid_route(self):
        response = self.app.get('/InvalidRoute')
        self.assertEqual(response.status_code, 404)

    def test_invalid_method(self):
        response = self.app.post('/api/v1/recipes')
        self.assertEqual(response.status_code, 405)

