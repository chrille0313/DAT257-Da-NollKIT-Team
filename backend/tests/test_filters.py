import unittest
from unittest.mock import patch
import api.recipes.service as service


class TestFilters(unittest.TestCase):

    def setUp(self):
        self.recipe_service = service.RecipeService()

    def test_get_ten_random_recipes(self):
        self.assertTrue(len(self.recipe_service.get_random_recipes(count=10)) == 10)

    def test_q_parameter(self):
        recipes = self.recipe_service.get_random_recipes(q='chicken', field='ingredients')
        count = 0
        for recipe in recipes:
            ingredients = recipe['recipe']['ingredients']
            print()
            for ingredient in ingredients:
                print(ingredient['food'])
                if "chicken" in ingredient['food'].lower() or "meat" in ingredient['food'].lower() or "sausage" in ingredient['food'].lower():
                    count += 1
                    break

            # ingredients = recipe['recipe']['ingredients']
            # for ingredient in ingredients:
            # self.assertTrue(ingredient["food"] == "chicken")
        self.assertTrue(count == 5)


"""
class TestFilters(unittest.TestCase):
    def setUp(self):
        self.recipe_service = service.RecipeService()

    @patch('api.recipes.service.requests.get')
    def test_get_random_recipes(self, mock_get):
        # Mock the response from the requests.get() method
        mock_response = {
            'hits': [
                {'recipe': {'label': 'Recipe 1', 'dietLabels': ['Balanced'], 'mealType': ['Lunch']}},
                {'recipe': {'label': 'Recipe 2', 'dietLabels': ['High-Fiber'], 'mealType': ['Dinner']}},
                {'recipe': {'label': 'Recipe 3', 'dietLabels': ['High-Protein'], 'mealType': ['Breakfast']}},
                {'recipe': {'label': 'Recipe 4', 'dietLabels': ['Low-Carb'], 'mealType': ['Snack']}},
                {'recipe': {'label': 'Recipe 5', 'dietLabels': ['Low-Fat'], 'mealType': ['Lunch']}},
                {'recipe': {'label': 'Recipe 6', 'dietLabels': ['Low-Sodium'], 'mealType': ['Dinner']}},
            ]
        }
        mock_get.return_value.json.return_value = mock_response

        # Call the method we want to test with filters
        recipes = self.recipe_service.get_random_recipes(diet='Low-Carb', mealType='Snack', count=3)

        # Assertions
        self.assertEqual(len(recipes), 1)
        self.assertEqual(recipes[0]['recipe']['label'], 'Recipe 4')

        # Call the method we want to test without filters
        recipes_all = self.recipe_service.get_random_recipes(count=6)

        # Assertions
        self.assertEqual(len(recipes_all), 6)
"""

if __name__ == '__main__':
    unittest.main()
