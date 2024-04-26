import requests
from random import choice

class RecipeService:

    def get_random_recipes(self, **params):
        # List of all parameters:
        # type: public | user | any [Should always be public or any]
        # beta: true | false [Should always be false]
        # q: query
        # app_id: 94cb00ae [Will always be the same]
        # app_key: 8dfe8940a9a85b83edfa9e7b97f4e5b0 [Will always be the same]
        # diet: balanced | high-fiber | high-protein | low-carb | low-fat | low-sodium
        # health: alcohol-cocktail | alcohol-free | celery-free | crustacean-free | dairy-free | DASH | egg-free | fish-free | fodmap-free | gluten-free | immuno-supportive | keto-friendly | kidney-friendly | kosher | low-fat-abs | low-potassium | low-sugar | lupine-free | Mediterranean | mollusk-free | mustard-free | no-oils-added | paleo | peanut-free | pescetarian | pork-free | red-meat-free | sesame-free | shellfish-free | soy-free | sugar-concious | sulfite-free | tree-nut-free | vegan | vegetarian | wheat-free
        # cuisineType: American | Asian | British | Caribbean | Central Europe | Chinese | Eastern Europe | French | Indian | Italian | Japanese | Kosher | Mediterranean | Mexican | Middle Eastern | Nordic | South American | South East Asian
        # mealType: Breakfast | Dinner | Lunch | Snack | Teatime
        # dishType: Biscuits and Cookies | Bread | Cereals | Condiments and sauces | Desserts | Main course | Pancake | Preps | Preserve | Salad | Sandwich | Side dish | Soup | Starter | Sweets
        # calories: 
        # time:
        # excluded: 
        # random: returns 20 random recipes 
        # field: 
        # co2EmissionClass: A-G
        
        populate_default_params(params)

        url = 'https://api.edamam.com/api/recipes/v2'
        response = requests.get(url, params=params)

        data = response.json()
        recipes = data['hits']
        return recipes[:int(params['count'])]

def populate_default_params(params):
    params['app_id'] = '94cb00ae'  # FIXME: regenerate and use environment variable
    params['app_key'] = '8dfe8940a9a85b83edfa9e7b97f4e5b0'  # FIXME: regenerate and use environment variable
    params['random'] = 'true'

    params['field'] = set(params.get('field', '')) | {'label', 'calories', 'image','images', 'co2EmissionsClass', 'yield', 'ingredients', 'totalTime', 'source', 'shareAs'}
    params['count'] = params.get('count', 5)
    params['mealType'] = params.get('mealType', choice(['breakfast', 'dinner', 'lunch']))
    params['type'] = params.get('type', 'public')