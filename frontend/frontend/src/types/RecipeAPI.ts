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
