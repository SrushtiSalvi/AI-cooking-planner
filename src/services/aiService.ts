import type { Diet, Meal, MealType, PlannerInput } from "@/types";

interface AiPlanSuggestion {
  breakfast?: { name?: string };
  lunch?: { name?: string };
  dinner?: { name?: string };
}

type MealTemplate = Omit<Meal, "id" | "type"> & { name: string };

const DIET_RULES: Record<Diet, Diet[]> = {
  vegetarian: ["vegetarian"],
  vegan: ["vegan"],
  egg: ["vegetarian", "egg"],
  "non-vegetarian": ["vegetarian", "egg", "non-vegetarian"],
};

const CUISINE_PRIORITY: Record<string, number> = {
  "north-indian": 3,
  "south-indian": 3,
  italian: 2,
  mexican: 2,
  chinese: 2,
  continental: 2,
  mediterranean: 2,
  thai: 2,
};

function buildMealSet(type: MealType, templates: MealTemplate[]): Meal[] {
  return templates.flatMap((template, index) => {
    const variants = [
      { name: template.name, cost: template.cost, prepTime: template.prepTime, calories: template.calories },
      { name: `${template.name} Bowl`, cost: template.cost + 10, prepTime: template.prepTime + 3, calories: template.calories + 60 },
      { name: `${template.name} Twist`, cost: template.cost + 16, prepTime: template.prepTime + 5, calories: template.calories + 90 },
    ];

    return variants.map((variant, variantIndex) => ({
      id: `${type}-${index * 3 + variantIndex + 1}`,
      type,
      name: variant.name,
      diet: template.diet,
      ingredients: [...template.ingredients],
      cost: variant.cost,
      prepTime: variant.prepTime,
      cuisine: template.cuisine,
      difficulty: template.difficulty,
      calories: variant.calories,
      protein: template.protein,
      carbs: template.carbs,
      fat: template.fat,
    }));
  });
}

function createBreakfastMeals(): Meal[] {
  const templates: MealTemplate[] = [
    { name: "Masala Oats", diet: "vegetarian", ingredients: ["oats", "spinach", "tomato", "onion", "cumin"], cost: 70, prepTime: 12, cuisine: "north-indian", difficulty: "easy", calories: 360, protein: 16, carbs: 54, fat: 10 },
    { name: "Veggie Omelette", diet: "egg", ingredients: ["eggs", "bell pepper", "onion", "cheese", "olive oil"], cost: 90, prepTime: 15, cuisine: "continental", difficulty: "easy", calories: 410, protein: 24, carbs: 12, fat: 28 },
    { name: "Avocado Toast", diet: "vegetarian", ingredients: ["bread", "avocado", "lemon", "chili flakes", "salt"], cost: 95, prepTime: 10, cuisine: "continental", difficulty: "easy", calories: 380, protein: 11, carbs: 42, fat: 19 },
    { name: "Chia Pudding", diet: "vegan", ingredients: ["almond milk", "chia seeds", "banana", "dates", "cinnamon"], cost: 85, prepTime: 10, cuisine: "mediterranean", difficulty: "easy", calories: 330, protein: 11, carbs: 44, fat: 14 },
    { name: "Poha", diet: "vegetarian", ingredients: ["poha", "peas", "peanuts", "curry leaves", "lemon"], cost: 65, prepTime: 15, cuisine: "south-indian", difficulty: "easy", calories: 340, protein: 10, carbs: 52, fat: 12 },
    { name: "Upma", diet: "vegetarian", ingredients: ["semolina", "carrot", "peas", "mustard seeds", "coconut"], cost: 60, prepTime: 18, cuisine: "south-indian", difficulty: "easy", calories: 350, protein: 9, carbs: 58, fat: 11 },
    { name: "Smoothie Bowl", diet: "vegan", ingredients: ["banana", "berries", "soy milk", "granola", "chia seeds"], cost: 100, prepTime: 8, cuisine: "continental", difficulty: "easy", calories: 390, protein: 12, carbs: 60, fat: 13 },
    { name: "Paneer Paratha", diet: "vegetarian", ingredients: ["paneer", "wheat flour", "onion", "curd", "ghee"], cost: 120, prepTime: 20, cuisine: "north-indian", difficulty: "medium", calories: 470, protein: 22, carbs: 48, fat: 22 },
    { name: "Idli Sambar", diet: "vegetarian", ingredients: ["idli", "sambar", "coconut chutney", "mustard seeds", "corriander"], cost: 75, prepTime: 20, cuisine: "south-indian", difficulty: "easy", calories: 320, protein: 12, carbs: 58, fat: 8 },
    { name: "Fruit Yogurt Bowl", diet: "vegetarian", ingredients: ["yogurt", "berries", "banana", "nuts", "honey"], cost: 88, prepTime: 7, cuisine: "mediterranean", difficulty: "easy", calories: 300, protein: 14, carbs: 36, fat: 10 },
  ];

  return buildMealSet("breakfast", templates);
}

function createLunchMeals(): Meal[] {
  const templates: MealTemplate[] = [
    { name: "Quinoa Salad", diet: "vegan", ingredients: ["quinoa", "cucumber", "tomato", "olive oil", "mint"], cost: 120, prepTime: 20, cuisine: "mediterranean", difficulty: "easy", calories: 420, protein: 15, carbs: 56, fat: 14 },
    { name: "Dal Rice Bowl", diet: "vegetarian", ingredients: ["dal", "rice", "spinach", "onion", "ghee"], cost: 110, prepTime: 25, cuisine: "north-indian", difficulty: "easy", calories: 470, protein: 18, carbs: 66, fat: 15 },
    { name: "Paneer Stir Fry", diet: "vegetarian", ingredients: ["paneer", "broccoli", "soy sauce", "garlic", "ginger"], cost: 140, prepTime: 20, cuisine: "chinese", difficulty: "medium", calories: 500, protein: 25, carbs: 24, fat: 30 },
    { name: "Chicken Wrap", diet: "non-vegetarian", ingredients: ["chicken", "wrap", "lettuce", "tomato", "yogurt"], cost: 150, prepTime: 20, cuisine: "continental", difficulty: "easy", calories: 480, protein: 32, carbs: 38, fat: 20 },
    { name: "Thai Basil Noodles", diet: "vegetarian", ingredients: ["noodles", "basil", "tofu", "carrot", "soy sauce"], cost: 135, prepTime: 18, cuisine: "thai", difficulty: "medium", calories: 460, protein: 19, carbs: 62, fat: 17 },
    { name: "Chickpea Curry", diet: "vegan", ingredients: ["chickpeas", "tomato", "onion", "curry leaves", "rice"], cost: 115, prepTime: 25, cuisine: "north-indian", difficulty: "easy", calories: 450, protein: 18, carbs: 64, fat: 14 },
    { name: "Pesto Pasta", diet: "vegetarian", ingredients: ["pasta", "basil", "olive oil", "parmesan", "tomato"], cost: 130, prepTime: 18, cuisine: "italian", difficulty: "easy", calories: 500, protein: 18, carbs: 62, fat: 21 },
    { name: "Egg Fried Rice", diet: "egg", ingredients: ["rice", "eggs", "peas", "carrot", "soy sauce"], cost: 105, prepTime: 18, cuisine: "chinese", difficulty: "easy", calories: 440, protein: 19, carbs: 66, fat: 16 },
    { name: "Rajma Rice", diet: "vegetarian", ingredients: ["rajma", "rice", "onion", "tomato", "cream"], cost: 118, prepTime: 30, cuisine: "north-indian", difficulty: "easy", calories: 500, protein: 20, carbs: 71, fat: 16 },
    { name: "Mediterranean Couscous", diet: "vegetarian", ingredients: ["couscous", "cucumber", "olive oil", "feta", "tomato"], cost: 125, prepTime: 16, cuisine: "mediterranean", difficulty: "easy", calories: 430, protein: 16, carbs: 51, fat: 17 },
  ];

  return buildMealSet("lunch", templates);
}

function createDinnerMeals(): Meal[] {
  const templates: MealTemplate[] = [
    { name: "Vegetable Biryani", diet: "vegetarian", ingredients: ["rice", "potato", "peas", "onion", "cashews"], cost: 150, prepTime: 35, cuisine: "north-indian", difficulty: "medium", calories: 560, protein: 17, carbs: 84, fat: 18 },
    { name: "Tofu Curry", diet: "vegan", ingredients: ["tofu", "tomato", "coconut milk", "spinach", "rice"], cost: 160, prepTime: 28, cuisine: "thai", difficulty: "medium", calories: 520, protein: 23, carbs: 48, fat: 28 },
    { name: "Lentil Pasta", diet: "vegan", ingredients: ["lentils", "pasta", "tomato", "garlic", "basil"], cost: 145, prepTime: 22, cuisine: "italian", difficulty: "easy", calories: 480, protein: 24, carbs: 67, fat: 14 },
    { name: "Butter Chicken", diet: "non-vegetarian", ingredients: ["chicken", "tomato", "butter", "cream", "rice"], cost: 190, prepTime: 35, cuisine: "north-indian", difficulty: "medium", calories: 610, protein: 35, carbs: 56, fat: 29 },
    { name: "Mushroom Risotto", diet: "vegetarian", ingredients: ["rice", "mushroom", "parmesan", "onion", "butter"], cost: 170, prepTime: 34, cuisine: "italian", difficulty: "medium", calories: 540, protein: 20, carbs: 70, fat: 21 },
    { name: "Fish Tacos", diet: "non-vegetarian", ingredients: ["fish", "tortilla", "slaw", "lime", "yogurt"], cost: 180, prepTime: 24, cuisine: "mexican", difficulty: "medium", calories: 520, protein: 32, carbs: 48, fat: 19 },
    { name: "Palak Paneer", diet: "vegetarian", ingredients: ["paneer", "spinach", "tomato", "cream", "rice"], cost: 165, prepTime: 30, cuisine: "north-indian", difficulty: "medium", calories: 560, protein: 24, carbs: 40, fat: 32 },
    { name: "Soba Noodle Stir Fry", diet: "vegetarian", ingredients: ["soba", "tofu", "mushroom", "soy sauce", "sesame"], cost: 155, prepTime: 22, cuisine: "chinese", difficulty: "easy", calories: 500, protein: 20, carbs: 64, fat: 17 },
    { name: "Egg Curry", diet: "egg", ingredients: ["eggs", "tomato", "onion", "coriander", "rice"], cost: 145, prepTime: 25, cuisine: "south-indian", difficulty: "easy", calories: 490, protein: 23, carbs: 42, fat: 24 },
    { name: "Greek Stuffed Peppers", diet: "vegetarian", ingredients: ["bell pepper", "rice", "feta", "tomato", "olive oil"], cost: 158, prepTime: 28, cuisine: "mediterranean", difficulty: "medium", calories: 510, protein: 18, carbs: 58, fat: 20 },
  ];

  return buildMealSet("dinner", templates);
}

const BREAKFAST_MEALS = createBreakfastMeals();
const LUNCH_MEALS = createLunchMeals();
const DINNER_MEALS = createDinnerMeals();

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function scoreMeal(meal: Meal, input: PlannerInput): number {
  let score = 0;
  const allowedDiets = DIET_RULES[input.diet];

  if (allowedDiets.includes(meal.diet)) {
    score += 40;
  }

  if (input.cuisine !== "any" && meal.cuisine === input.cuisine) {
    score += 20;
  }

  if (CUISINE_PRIORITY[meal.cuisine]) {
    score += CUISINE_PRIORITY[meal.cuisine];
  }

  if (meal.prepTime <= input.cookingTime) {
    score += 18;
  } else {
    score -= Math.max(0, meal.prepTime - input.cookingTime) * 0.4;
  }

  if (input.mealPreference === "light" && meal.calories < 430) {
    score += 12;
  }
  if (input.mealPreference === "medium" && meal.calories >= 350 && meal.calories <= 520) {
    score += 12;
  }
  if (input.mealPreference === "heavy" && meal.calories > 500) {
    score += 12;
  }

  if (input.availableIngredients.length > 0) {
    const available = input.availableIngredients.map(normalize);
    const ingredientMatches = meal.ingredients.filter((ingredient) => available.includes(normalize(ingredient))).length;
    score += ingredientMatches * 8;
  }

  if (input.allergies.length > 0) {
    const allergyText = input.allergies.map(normalize).join(" ");
    const containsAllergy = meal.ingredients.some((ingredient) => normalize(ingredient).includes(allergyText));
    if (containsAllergy) {
      score -= 30;
    }
  }

  const budgetPerPerson = input.budget / Math.max(1, input.people);
  if (meal.cost <= budgetPerPerson * 0.85) {
    score += 14;
  } else if (meal.cost <= budgetPerPerson) {
    score += 8;
  } else {
    score -= 6;
  }

  return score;
}

function pickMeal(type: MealType, input: PlannerInput): Meal {
  const dataset = type === "breakfast" ? BREAKFAST_MEALS : type === "lunch" ? LUNCH_MEALS : DINNER_MEALS;
  const filtered = dataset.filter((meal) => {
    const allowed = DIET_RULES[input.diet];
    if (!allowed.includes(meal.diet)) {
      return false;
    }

    const allergyText = input.allergies.map(normalize).join(" ");
    if (allergyText && meal.ingredients.some((ingredient) => normalize(ingredient).includes(allergyText))) {
      return false;
    }

    return meal.prepTime <= input.cookingTime + 8;
  });

  if (!filtered.length) {
    return dataset[0];
  }

  return filtered.sort((a, b) => scoreMeal(b, input) - scoreMeal(a, input))[0];
}

function buildOpenAiPrompt(input: PlannerInput) {
  return JSON.stringify({
    diet: input.diet,
    budget: input.budget,
    people: input.people,
    cookingTime: input.cookingTime,
    mealPreference: input.mealPreference,
    availableIngredients: input.availableIngredients,
    allergies: input.allergies,
    cuisine: input.cuisine,
  });
}

async function tryGenerateWithOpenAi(input: PlannerInput): Promise<AiPlanSuggestion | null> {
  const key = globalThis.localStorage?.getItem("ai-cooking-todo:ai-config") ?? null;
  if (!key) {
    return null;
  }

  try {
    const config = JSON.parse(key) as { apiKey?: string; model?: string };
    if (!config.apiKey) {
      return null;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model ?? "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a concise cooking planner. Return JSON with breakfast, lunch, dinner objects each containing a single name string.",
          },
          {
            role: "user",
            content: `Create a quick meal plan for the following preferences: ${buildOpenAiPrompt(input)}`,
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = payload.choices?.[0]?.message?.content ?? "";
    const cleaned = content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned) as AiPlanSuggestion;
    return parsed;
  } catch {
    return null;
  }
}

function findMealByName(name: string, type: MealType): Meal | null {
  const dataset = type === "breakfast" ? BREAKFAST_MEALS : type === "lunch" ? LUNCH_MEALS : DINNER_MEALS;
  const normalizedName = normalize(name);
  return dataset.find((meal) => normalize(meal.name).includes(normalizedName)) ?? null;
}

export function generateMealsSync(input: PlannerInput): { breakfast: Meal; lunch: Meal; dinner: Meal } {
  return {
    breakfast: pickMeal("breakfast", input),
    lunch: pickMeal("lunch", input),
    dinner: pickMeal("dinner", input),
  };
}

export async function generateMeals(input: PlannerInput): Promise<{ breakfast: Meal; lunch: Meal; dinner: Meal }> {
  const aiSuggestion = await tryGenerateWithOpenAi(input);
  const syncMeals = generateMealsSync(input);

  if (!aiSuggestion) {
    return syncMeals;
  }

  return {
    breakfast: aiSuggestion.breakfast?.name ? findMealByName(aiSuggestion.breakfast.name, "breakfast") ?? syncMeals.breakfast : syncMeals.breakfast,
    lunch: aiSuggestion.lunch?.name ? findMealByName(aiSuggestion.lunch.name, "lunch") ?? syncMeals.lunch : syncMeals.lunch,
    dinner: aiSuggestion.dinner?.name ? findMealByName(aiSuggestion.dinner.name, "dinner") ?? syncMeals.dinner : syncMeals.dinner,
  };
}

export function generateGroceries(meals: { breakfast: Meal; lunch: Meal; dinner: Meal }) {
  const merged = new Set<string>();
  const allIngredients = [meals.breakfast, meals.lunch, meals.dinner].flatMap((meal) => meal.ingredients);

  allIngredients.forEach((ingredient) => merged.add(ingredient));

  return Array.from(merged).map((ingredient, index) => ({
    id: `grocery-${index + 1}`,
    name: ingredient,
    checked: false,
  }));
}

export function calculateBudget(meals: { breakfast: Meal; lunch: Meal; dinner: Meal }, input: PlannerInput) {
  const totalCost = (meals.breakfast.cost + meals.lunch.cost + meals.dinner.cost) * input.people;
  const withinBudget = totalCost <= input.budget;
  const difference = input.budget - totalCost;

  return {
    totalCost,
    budget: input.budget,
    withinBudget,
    difference,
    cheaperAlternatives: withinBudget
      ? ["Your meal plan fits the current budget comfortably."]
      : ["Try a lighter breakfast", "Swap paneer for tofu", "Pick a one-pot lunch option"],
  };
}

export function generateTasks(meals: { breakfast: Meal; lunch: Meal; dinner: Meal }) {
  return [
    { id: "task-1", label: "Wash vegetables and fresh herbs", done: false },
    { id: "task-2", label: `Prep ${meals.breakfast.name} ingredients`, done: false },
    { id: "task-3", label: `Cook ${meals.lunch.name}`, done: false },
    { id: "task-4", label: `Finish ${meals.dinner.name} for dinner`, done: false },
    { id: "task-5", label: "Set the table and store leftovers", done: false },
  ];
}

export function generateSubstitutions(meals: { breakfast: Meal; lunch: Meal; dinner: Meal }) {
  const substitutions = [
    { ingredient: "paneer", alternative: "tofu", reason: "A lighter vegetarian protein swap." },
    { ingredient: "milk", alternative: "soy milk", reason: "Great for a dairy-free alternative." },
    { ingredient: "butter", alternative: "olive oil", reason: "A lighter cooking fat." },
    { ingredient: "rice", alternative: "quinoa", reason: "Adds more protein and fiber." },
    { ingredient: "cream", alternative: "cashew cream", reason: "A dairy-free creamy finish." },
    { ingredient: "eggs", alternative: "tofu scramble", reason: "A plant-based option." },
    { ingredient: "yogurt", alternative: "coconut yogurt", reason: "A dairy-free alternative." },
    { ingredient: "chicken", alternative: "tofu", reason: "A lighter protein swap." },
  ];

  const used = new Set<string>();

  return meals.breakfast.ingredients
    .concat(meals.lunch.ingredients, meals.dinner.ingredients)
    .flatMap((ingredient) => {
      const match = substitutions.find((item) => normalize(item.ingredient) === normalize(ingredient));
      if (!match || used.has(match.ingredient)) {
        return [];
      }
      used.add(match.ingredient);
      return [{ ingredient: match.ingredient, alternative: match.alternative, reason: match.reason }];
    });
}

export function getMealDataset() {
  return {
    breakfast: BREAKFAST_MEALS,
    lunch: LUNCH_MEALS,
    dinner: DINNER_MEALS,
  };
}
