# Notion Database Schemas

This document describes the structure of the Notion databases used in the meal planner system.

## Database Overview

The system uses three interconnected databases:
1. **Recipes** - Your recipe library
2. **Meal Plan** - Calendar of planned meals
3. **Ingredients** (Optional) - Ingredient reference for better categorization

## 1. Recipes Database

### Purpose
Stores all your recipes with ingredients, instructions, and metadata.

### Properties

| Property Name | Type | Description | Required |
|--------------|------|-------------|----------|
| Name | Title | Recipe name | Yes |
| Ingredients | Text | List of ingredients with quantities | Yes |
| Instructions | Text | Step-by-step cooking instructions | Yes |
| Servings | Number | Number of servings this recipe makes | Yes |
| Prep Time | Number | Preparation time in minutes | No |
| Cook Time | Number | Cooking time in minutes | No |
| Total Time | Formula | Auto-calculated: Prep Time + Cook Time | No |
| Cuisine | Select | Cuisine type (Italian, Mexican, Asian, etc.) | No |
| Dietary Tags | Multi-select | vegetarian, vegan, gluten-free, dairy-free, etc. | No |
| Meal Type | Multi-select | breakfast, lunch, dinner, snack, dessert | No |
| Difficulty | Select | Easy, Medium, Hard | No |
| Rating | Select | ⭐ to ⭐⭐⭐⭐⭐ | No |
| Source | URL | Link to original recipe if applicable | No |
| Notes | Text | Personal notes, modifications, tips | No |
| Created | Created time | Auto-generated | No |
| Last Modified | Last edited time | Auto-generated | No |

### Ingredient Format

Ingredients should be stored as a structured list, one per line:
```
2 cups all-purpose flour
1.5 lbs chicken breast, cubed
3 medium onions, diced
2 cloves garlic, minced
1 tsp salt
1/2 tsp black pepper
```

This format allows Claude Code to:
- Parse quantities and units
- Aggregate across multiple recipes
- Scale recipes accurately

### Example Recipe Entry

**Name:** Classic Spaghetti Carbonara

**Ingredients:**
```
1 lb spaghetti
6 oz pancetta, diced
4 large eggs
1 cup Parmesan cheese, grated
2 cloves garlic, minced
Salt and black pepper to taste
```

**Instructions:**
```
1. Cook spaghetti according to package directions
2. While pasta cooks, fry pancetta until crispy
3. Beat eggs with Parmesan in a bowl
4. Drain pasta, reserving 1 cup pasta water
5. Toss hot pasta with pancetta
6. Remove from heat, quickly stir in egg mixture
7. Add pasta water to reach desired consistency
8. Season with salt and pepper
```

**Servings:** 4
**Prep Time:** 10
**Cook Time:** 20
**Cuisine:** Italian
**Dietary Tags:** (none)
**Meal Type:** dinner

---

## 2. Meal Plan Database

### Purpose
Calendar-based tracking of which recipes you'll cook on which days.

### Properties

| Property Name | Type | Description | Required |
|--------------|------|-------------|----------|
| Name | Title | Auto-generated or custom name | Yes |
| Date | Date | When you'll cook this meal | Yes |
| Meal Type | Select | breakfast, lunch, dinner, snack | Yes |
| Recipe | Relation | Link to recipe in Recipes database | Yes |
| Servings | Number | How many servings to make | Yes |
| Status | Select | Planned, Cooked, Skipped | No |
| Notes | Text | Special notes for this meal instance | No |
| Recipe Name | Rollup | Shows recipe name from relation | No |
| Ingredients | Rollup | Shows ingredients from related recipe | No |

### Views to Create

**Calendar View**:
- Group by: Week
- Show: Date, Recipe Name, Meal Type
- Perfect for visualizing your weekly meal plan

**This Week**:
- Filter: Date is this week
- Sort: Date ascending
- Use this view to see current week's plan

**Shopping List Prep**:
- Filter: Date is this week AND Status is "Planned"
- Properties shown: Recipe Name, Ingredients (rollup)
- Use this to manually review before generating shopping list

### Example Meal Plan Entry

**Name:** Tuesday Dinner - Carbonara
**Date:** 2025-12-28
**Meal Type:** dinner
**Recipe:** → Classic Spaghetti Carbonara
**Servings:** 4
**Status:** Planned

---

## 3. Ingredients Database (Optional)

### Purpose
Reference database for categorizing and standardizing ingredients. This is optional but helpful for better shopping list organization.

### Properties

| Property Name | Type | Description | Required |
|--------------|------|-------------|----------|
| Name | Title | Ingredient name | Yes |
| Category | Select | Produce, Protein, Dairy, Grains, Spices, etc. | Yes |
| Default Unit | Text | Common unit (cup, lb, oz, etc.) | No |
| Shelf Life | Number | Days until expiration (optional) | No |
| Storage | Select | Pantry, Refrigerator, Freezer | No |
| Substitutes | Text | Possible substitutions | No |

### Categories Suggested

- Produce
- Proteins
- Dairy
- Grains & Pasta
- Canned & Jarred
- Spices & Seasonings
- Baking
- Frozen
- Beverages
- Condiments
- Other

---

## Database Relations

### Recipes → Meal Plan
- **Type:** Two-way relation
- **Recipes side:** "Used in Meal Plans" (shows where recipe is planned)
- **Meal Plan side:** "Recipe" (links to the recipe)

This relation allows you to:
- See all future/past uses of a recipe
- Quickly add recipes to meal plan
- Pull ingredient lists into meal plan

---

## Setting Up Your Databases

### Step 1: Create Recipes Database
1. In Notion, create a new database
2. Name it "Recipes"
3. Add all properties listed above
4. Configure select/multi-select options
5. Add a few sample recipes to test

### Step 2: Create Meal Plan Database
1. Create a new database
2. Name it "Meal Plan"
3. Add all properties listed above
4. Create relation to Recipes database
5. Set up rollup properties to show recipe details
6. Create Calendar view

### Step 3: (Optional) Create Ingredients Database
1. Create a new database
2. Name it "Ingredients"
3. Add properties listed above
4. Populate with common ingredients you use

### Step 4: Share Databases with Integration
1. Go to each database
2. Click "Share" in the top right
3. Add your Notion integration
4. Grant access

---

## Tips for Maintenance

1. **Consistent Formatting:** Keep ingredient formats consistent for better parsing
2. **Categorization:** Tag recipes thoroughly for better filtering
3. **Regular Updates:** Update ratings and notes after cooking
4. **Archive Old Plans:** Archive meal plans older than 3 months
5. **Ingredient Standards:** Use common units and standard ingredient names

---

## Advanced Features

### Formula Properties

**Total Time** (in Recipes):
```
prop("Prep Time") + prop("Cook Time")
```

**Status Color** (in Meal Plan):
```
if(prop("Status") == "Cooked", "🟢", if(prop("Status") == "Planned", "🟡", "🔴"))
```

### Rollup Properties

**Ingredient List** (in Meal Plan):
- Relation: Recipe
- Property: Ingredients
- Calculate: Show original

This allows you to see all ingredients for planned meals in one place.

---

## Future Enhancements

Consider adding these properties as your system evolves:
- **Cost per serving** (in Recipes)
- **Leftovers** (in Meal Plan) - to track what you have
- **Nutritional info** (in Recipes) - calories, protein, etc.
- **Photos** (in Recipes) - upload photos of finished dishes
- **Seasonal tags** (in Recipes) - spring, summer, fall, winter
