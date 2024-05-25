import unittest

from api import API_BASE_ROUTE, LATEST_API_VERSION
from api import get_base_api_route
from api.recipes.service import RecipeService
from unittest.mock import patch, Mock


class TestServiceFunctions(unittest.TestCase):

    def setUp(self):
        self.recipe_service = RecipeService()

    def test_default_params_are_added(self):
        params = {}
        self.recipe_service.populate_default_params(params)
        self.assertIn('app_id', params)
        self.assertIn('app_key', params)
        self.assertIn('random', params)

    def test_forced_params_are_not_overridden(self):
        params = {'app_id': 'existing_id', 'random': 'false'}
        self.recipe_service.populate_default_params(params)
        self.assertEqual(params['app_id'], '94cb00ae')
        self.assertEqual(params['random'], 'true')

    def test_configuration_settings(self):
        self.assertEqual(get_base_api_route(), API_BASE_ROUTE + LATEST_API_VERSION)

    def test_get_ten_random_recipes_returns_ten_recipes(self):
        self.assertTrue(len(self.recipe_service.get_random_recipes(count=10)) == 10)

    def test_q_query_returns_results_with_correct_ingredients(self):
        # Note that test is flaky, see: https://github.com/chrille0313/DishPlanner/issues/18
        query_ingredient = 'chicken'
        recipes = self.recipe_service.get_random_recipes(q=query_ingredient, field='ingredients')
        recipes_with_ingredient_count = 0

        for recipe in recipes:
            ingredients = recipe['recipe']['ingredients']

            for ingredient in ingredients:
                if query_ingredient in ingredient['food'].lower():
                    recipes_with_ingredient_count += 1
                    break

        self.assertEqual(recipes_with_ingredient_count, 5)

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

    def test_calories_query_returns_result_below_max(self):
        calorie_max = 1000
        recipes = self.recipe_service.get_random_recipes(calories=calorie_max, field='calories')

        for recipe in recipes:
            recipe_calories = recipe['recipe']['calories']
            recipe_portions = recipe['recipe']['yield']
            recipe_calories_per_portion = recipe_calories / recipe_portions
            self.assertLessEqual(recipe_calories_per_portion, calorie_max)

    def test_calories_query_returns_result_above_min(self):
        calorie_min = 500
        calorie_query = f'{calorie_min}+'
        recipes = self.recipe_service.get_random_recipes(calories=calorie_query, field='calories')

        for recipe in recipes:
            recipe_calories = recipe['recipe']['calories']
            recipe_portions = recipe['recipe']['yield']
            recipe_calories_per_portion = recipe_calories / recipe_portions
            self.assertGreaterEqual(recipe_calories_per_portion, calorie_min)

    def test_calories_query_returns_result_between_range(self):
        calorie_min = 40
        calorie_max = 60
        calorie_query = f'{calorie_min}-{calorie_max}'
        recipes = self.recipe_service.get_random_recipes(calories=calorie_query, field='calories')

        for recipe in recipes:
            recipe_calories = recipe['recipe']['calories']
            recipe_portions = recipe['recipe']['yield']
            recipe_calories_per_portion = recipe_calories / recipe_portions

            self.assertGreaterEqual(recipe_calories_per_portion, calorie_min)
            self.assertLessEqual(recipe_calories_per_portion, calorie_max)

    def test_time_query_returns_result_within_range(self):
        min_time = 40
        max_time = 60
        time_query = f'{min_time}-{max_time}'
        recipes = self.recipe_service.get_random_recipes(time=time_query, field='totalTime')

        for recipe in recipes:
            total_time = recipe['recipe']['totalTime']
            self.assertGreaterEqual(total_time, min_time)
            self.assertLessEqual(total_time, max_time)

    def test_time_query_returns_result_above_min(self):
        min_time = 60
        time_query = f'{min_time}+'
        recipes = self.recipe_service.get_random_recipes(time=time_query, field='totalTime')

        for recipe in recipes:
            self.assertGreaterEqual(recipe['recipe']['totalTime'], min_time)

    def test_time_query_returns_result_below_max(self):
        max_time = 30
        recipes = self.recipe_service.get_random_recipes(time=max_time, field='totalTime')

        for recipe in recipes:
            self.assertLessEqual(recipe['recipe']['totalTime'], max_time)

    def test_co2_emissions_class_returns_result_of_emissions_class_or_above(self):
        recipes = self.recipe_service.get_random_recipes(co2EmissionsClass='C', field='co2EmissionsClass')
        acceptable_emission_classes = {'A+', 'A', 'B', 'C'}

        for recipe in recipes:
            self.assertIn(recipe['recipe']['co2EmissionsClass'], acceptable_emission_classes)

    @patch('api.recipes.service.requests.get')
    def test_get_random_recipes_integration(self, mock_get):
        mock_response = Mock()
        mock_response.json.return_value = {
            'hits': [{'recipe': 'data1'}, {'recipe': 'data2'}]
        }
        mock_get.return_value = mock_response

        recipes = self.recipe_service.get_random_recipes(count=2)

        self.assertEqual(len(recipes), 2)
        self.assertEqual(recipes[0]['recipe'], 'data1')
        self.assertEqual(recipes[1]['recipe'], 'data2')

        # Todo: add assertion for parameters


if __name__ == '__main__':
    unittest.main()
