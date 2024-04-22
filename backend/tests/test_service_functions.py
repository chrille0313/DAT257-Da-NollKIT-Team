import unittest
from api import get_base_api_route
from api.recipes.service import populate_default_params
from unittest.mock import patch, Mock
from api.recipes.service import RecipeService


class TestServiceFunctions(unittest.TestCase):

    def test_populate_default_params(self):
        # Test case 1: Check default parameters are added
        params = {}
        populate_default_params(params)
        self.assertIn('app_id', params)
        self.assertIn('app_key', params)
        self.assertIn('random', params)
        self.assertEqual(params['random'], 'true')

        # Test case 2: Check app_id and random not overridden
        params = {'app_id': 'existing_id', 'random': 'false'}
        populate_default_params(params)
        self.assertEqual(params['app_id'], '94cb00ae')  # Existing value should remain unchanged
        self.assertEqual(params['random'], 'true')  # Existing value should remain unchanged

    def test_configuration_settings(self):
        # Test API_BASE_ROUTE and LATEST_API_VERSION settings
        self.assertEqual(get_base_api_route(), '/api/v1')

    @patch('api.recipes.service.requests.get')
    def test_get_random_recipes_integration(self, mock_get):
        # Mock the response from the external API
        mock_response = Mock()
        mock_response.json.return_value = {
            'hits': [{'recipe': 'data1'}, {'recipe': 'data2'}]
        }
        mock_get.return_value = mock_response

        recipe_service = RecipeService()

        recipes = recipe_service.get_random_recipes(count=2)

        self.assertEqual(len(recipes), 2)  # Ensure the correct number of recipes is returned
        self.assertEqual(recipes[0]['recipe'], 'data1')  # Ensure the expected recipe data is returned
        self.assertEqual(recipes[1]['recipe'], 'data2')

        # Todo: add assertion for parameters


if __name__ == '__main__':
    unittest.main()
