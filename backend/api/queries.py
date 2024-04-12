import requests

request_get = requests.get('https://api.edamam.com/api/recipes/v2?type=any&q=salt&app_id=94cb00ae&app_key=8dfe8940a9a85b83edfa9e7b97f4e5b0&mealType=Dinner&dishType=Main%20course&random=true&field=label&field=calories&field=image&field=co2EmissionsClass&field=yield', auth=('user', 'pass'))
request_data = request_get.json()['hits']
for x in range(5):
    print(f"Result: {x+1}")
    print(request_data[x]["recipe"]["label"])
    #print(request_data[x]["recipe"]["image"])
    print(f"{request_data[x]["recipe"]["yield"]} Portions")
    print(f"{request_data[x]["recipe"]["calories"]} Calories")
    print(f"{request_data[x]["recipe"]["co2EmissionsClass"]} CO2 Emissions class (A-G)")
    print()