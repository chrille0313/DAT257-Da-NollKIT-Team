import { sortOptionByLabel } from "../utils"

type Imagesize = {
  height: number
  url: string
  width: number
}

type Image = {
  REGULAR: Imagesize
  SMALL: Imagesize
  THUMBNAIL: Imagesize
}

type Ingredient = {
  food: string
  foodCategory: string,
  foodId: string
  image: string
  measure: string
  quantity: number
  text: string
  weight: number
}

export type Recipe = {
  calories: number
  co2EmissionsClass: string
  totalCO2Emissions: number
  image: string
  images: Image
  ingredients: Ingredient[]
  label: string
  shareAs: string
  source: string
  totalTime: number
  yield: number
}

type RecipeResponse = {
  _links: {
    self: {
      href: string
      title: string
    }
  },
  recipe: Recipe
}

export type RecipeAPIResponse = RecipeResponse[];

export const RecipeFilters = {
  diet: {
    label: 'Diet',
    options: [
      { value: 'balanced', label: 'Balanced' },
      { value: 'high-fiber', label: 'High Fiber' },
      { value: 'high-protein', label: 'High Protein' },
      { value: 'low-carb', label: 'Low Carb' },
      { value: 'low-fat', label: 'Low Fat' },
      { value: 'low-sodium', label: 'Low Sodium' }
    ].sort(sortOptionByLabel)
  },
  health: {
    label: 'Health',
    options: [
      { value: 'dairy-free', label: 'Dairy Free' },
      { value: 'egg-free', label: 'Egg Free' },
      { value: 'fish-free', label: 'Fish Free' },
      { value: 'gluten-free', label: 'Gluten Free' },
      { value: 'kosher', label: 'Kosher' },
      { value: 'low-sugar', label: 'Low Sugar' },
      { value: 'mollusk-free', label: 'Mollusk Free' },
      { value: 'peanut-free', label: 'Peanut Free' },
      { value: 'pescatarian', label: 'Pescatarian' },
      { value: 'pork-free', label: 'Pork Free' },
      { value: 'red-meat-free', label: 'Red Meat Free' },
      { value: 'shellfish-free', label: 'Shellfish Free' },
      { value: 'soy-free', label: 'Soy Free' },
      { value: 'tree-nut-free', label: 'Tree Nut Free' },
      { value: 'vegan', label: 'Vegan' },
      { value: 'vegetarian', label: 'Vegetarian' },
      { value: 'wheat-free', label: 'Wheat Free' }
    ].sort(sortOptionByLabel)
  },
  cuisine: {
    label: 'Cuisine',
    options: [
      { value: 'american', label: 'American' },
      { value: 'asian', label: 'Asian' },
      { value: 'british', label: 'British' },
      { value: 'caribbean', label: 'Caribbean' },
      { value: 'central-europe', label: 'Central Europe' },
      { value: 'chinese', label: 'Chinese'},
      { value: 'eastern-europe', label: 'Eastern Europe' },
      { value: 'french', label: 'French' },
      { value: 'indian', label: 'Indian' },
      { value: 'italian', label: 'Italian' },
      { value: 'japanese', label: 'Japanese' },
      { value: 'kosher', label: 'Kosher' },
      { value: 'mediterranean', label: 'Mediterranean' },
      { value: 'mexican', label: 'Mexican' },
      { value: 'middle-eastern', label: 'Middle Eastern' },
      { value: 'nordic', label: 'Nordic' },
      { value: 'south-american', label: 'South American' },
      { value: 'south-east-asian', label: 'South East Asian' }
    ].sort(sortOptionByLabel)
  },
  mealType: {
    label: 'Meal Type',
    options: [
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'dinner', label: 'Dinner' },
      { value: 'lunch', label: 'Lunch' }
    ].sort(sortOptionByLabel)
  }
}

export type RecipeFilterName = keyof typeof RecipeFilters;