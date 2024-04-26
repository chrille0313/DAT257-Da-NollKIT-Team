import unittest
from api import API_BASE_ROUTE, LATEST_API_VERSION
from api import get_base_api_route
from api.recipes.service import RecipeService
from unittest.mock import patch, Mock
import api.recipes.service as service


class TestServiceFunctions(unittest.TestCase):

    def setUp(self):
        self.recipe_service = service.RecipeService()

    def test_default_params_are_added(self):
        params = {}
        self.recipe_service.populate_default_params(params)
        self.assertIn('app_id', params)
        self.assertIn('app_key', params)
        self.assertIn('random', params)

    def test_forced_params_are_not_overridden(self):
        params = {'app_id': 'existing_id', 'random': 'false'}
        self.recipe_service.populate_default_params(params)
        self.assertEqual(params['app_id'], '94cb00ae')  # Existing value should remain unchanged
        self.assertEqual(params['random'], 'true')  # Existing value should remain unchanged

    def test_configuration_settings(self):
        # Test API_BASE_ROUTE and LATEST_API_VERSION settings
        self.assertEqual(get_base_api_route(), API_BASE_ROUTE + LATEST_API_VERSION)

    def test_get_ten_random_recipes_returns_ten_recipes(self):
        self.assertTrue(len(self.recipe_service.get_random_recipes(count=10)) == 10)

    def test_q_query_returns_results_with_correct_ingredients(self):
        # Note that test is flaky, see: https://github.com/chrille0313/DishPlanner/issues/18
        recipes = self.recipe_service.get_random_recipes(q='chicken', field='ingredients')
        count = 0

        for recipe in recipes:
            ingredients = recipe['recipe']['ingredients']
            for ingredient in ingredients:
                if "chicken" in ingredient['food'].lower():
                    count += 1
                    break

        self.assertEqual(count, 5)

    def test_single_field_parameter_returns_correct_fields(self):
        recipes = self.recipe_service.get_random_recipes(field='ingredients')

        for recipe in recipes:
            self.assertIn('ingredients', recipe['recipe'])

    def test_multiple_fields_parameters_returns_correct_fields(self):
        recipes = self.recipe_service.get_random_recipes(field=['ingredients', 'ingredientLines'])

        for recipe in recipes:
            self.assertIn('ingredients', recipe['recipe'])
            self.assertIn('ingredients', recipe['recipe'])

    def test_diet_parameter_query_returns_correct_results(self):
        recipes = self.recipe_service.get_random_recipes(diet='balanced', field='dietLabels')

        for recipe in recipes:
            self.assertIn('Balanced', recipe['recipe']['dietLabels'])

    def test_health_parameter_query_returns_correct_results(self):
        recipes = self.recipe_service.get_random_recipes(health='vegan', field='healthLabels')

        for recipe in recipes:
            self.assertIn('Vegan', recipe['recipe']['healthLabels'])

    def test_cuisine_type_query_returns_correct_results(self):
        recipes = self.recipe_service.get_random_recipes(cuisineType='Asian', field='cuisineType')

        for recipe in recipes:
            self.assertIn('asian', recipe['recipe']['cuisineType'])

    def test_meal_type_query_returns_correct_results(self):
        recipes = self.recipe_service.get_random_recipes(mealType='Breakfast', field='mealType')

        for recipe in recipes:
            self.assertIn('breakfast', recipe['recipe']['mealType'])

    def test_dish_type_query_returns_correct_results(self):
        recipes = self.recipe_service.get_random_recipes(dishType='Desserts', field='dishType')

        for recipe in recipes:
            self.assertIn('desserts', recipe['recipe']['dishType'])

    def test_calories_query_returns_result_within_range(self): # TODO: searching for calories with a range doesn't work
        recipes = self.recipe_service.get_random_recipes(calories='500-1000', field='calories')

        for recipe in recipes:
            self.assertGreaterEqual(recipe['recipe']['calories'], 500)
            self.assertLessEqual(recipe['recipe']['calories'], 1000)

    def test_calories_query_returns_result_above_min(self):
        recipes = self.recipe_service.get_random_recipes(calories='500+', field='calories')

        for recipe in recipes:
            self.assertGreaterEqual(recipe['recipe']['calories'], 500)

    def test_calories_query_returns_result_below_max(self):
        recipes = self.recipe_service.get_random_recipes(calories='-1000', field='calories')

        for recipe in recipes:
            self.assertLessEqual(recipe['recipe']['calories'], 1000)

    def test_time_query_returns_result_within_range(self):
        recipes = self.recipe_service.get_random_recipes(time='40-60', field='totalTime')

        for recipe in recipes:
            self.assertGreaterEqual(recipe['recipe']['totalTime'], 40)
            self.assertLessEqual(recipe['recipe']['totalTime'], 60)

    def test_time_query_returns_result_above_min(self):
        recipes = self.recipe_service.get_random_recipes(time='60+', field='totalTime')

        for recipe in recipes:
            self.assertGreaterEqual(recipe['recipe']['totalTime'], 60)

    def test_time_query_returns_result_below_max(self):
        recipes = self.recipe_service.get_random_recipes(time='-60', field='totalTime')

        for recipe in recipes:
            self.assertLessEqual(recipe['recipe']['totalTime'], 60)

    def test_co2_emissions_class_returns_result_of_emissions_class_or_above(self):
        recipes = self.recipe_service.get_random_recipes(co2EmissionsClass='C', field='co2EmissionsClass')
        acceptable_emission_classes = ['A+', 'A', 'B', 'C']

        for recipe in recipes:
            self.assertIn(recipe['recipe']['co2EmissionsClass'], acceptable_emission_classes)

    @patch('api.recipes.service.requests.get')
    def test_get_random_recipes_integration(self, mock_get):
        # Mock the response from the external API
        mock_response = Mock()
        mock_response.json.return_value = {
            'hits': [{'recipe': 'data1'}, {'recipe': 'data2'}]
        }
        mock_get.return_value = mock_response

        recipes = self.recipe_service.get_random_recipes(count=2)

        self.assertEqual(len(recipes), 2)  # Ensure the correct number of recipes is returned
        self.assertEqual(recipes[0]['recipe'], 'data1')  # Ensure the expected recipe data is returned
        self.assertEqual(recipes[1]['recipe'], 'data2')

        # Todo: add assertion for parameters


if __name__ == '__main__':
    unittest.main()
