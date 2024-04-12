import requests


class RecipeService:

    def get_random_recipes(self, count=5):
        url = 'https://api.edamam.com/api/recipes/v2'

        params = {
            'app_id': '94cb00ae',
            'app_key': '8dfe8940a9a85b83edfa9e7b97f4e5b0',
            'type': 'any',
            'q': 'salt',
            'mealType': 'Dinner',
            'dishType': 'Main course',
            'random': 'true',
            'field': ['label', 'calories', 'image', 'co2EmissionsClass', 'yield'] # , 'image'
        }

        response = requests.get(url, params=params)

        data = response.json()
        recipes = data['hits']

        return recipes[:count]
