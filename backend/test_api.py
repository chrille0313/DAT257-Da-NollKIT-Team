import unittest

from api.recipes.service import RecipeService

class TestRecipeService(unittest.TestCase):
    def setUp(self):
        self.recipe_service = RecipeService()



if __name__ == '__main__':
    unittest.main()
