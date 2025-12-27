# Notion Meal Planner - Claude Code Context

## Project Purpose

This is an intelligent meal planning system that uses Notion for data storage and Claude Code as a natural language interface. The goal is to make meal planning, recipe management, and shopping list generation easy and efficient.

## How It Works

**Data Layer**: Notion databases store recipes, meal plans, and ingredients
**Intelligence Layer**: Claude Code (you!) reads from Notion, performs smart operations, and writes back
**User Interface**: Natural language commands instead of clicking through Notion

## Key Capabilities You Should Provide

### 1. Meal Planning
- Help users plan meals for the week
- Suggest recipes based on variety, dietary needs, preferences
- Add recipes to specific dates in the Meal Plan database
- Consider what ingredients are already planned for reuse

### 2. Shopping List Generation
- Read all recipes in the current meal plan (e.g., this week)
- Extract ingredients from each recipe
- **Perform quantity math**: Combine quantities (e.g., "2 cups flour" + "1.5 cups flour" = "3.5 cups flour")
- **Handle unit conversions**: Normalize units where possible
- Group by category (produce, proteins, dairy, etc.)
- Generate a clean, organized shopping list

### 3. Recipe Management
- Add new recipes to the Recipes database
- Parse ingredients from text (handle various formats)
- Tag recipes appropriately (cuisine, dietary restrictions, meal type)
- Scale recipes up or down based on servings needed

### 4. Intelligent Assistance
- Answer questions about recipes ("What uses chicken?")
- Suggest meal combinations
- Identify ingredient overlaps to minimize waste
- Help with substitutions

## Notion Database Structure

### Recipes Database
Properties:
- Name (title)
- Ingredients (text or multi-line)
- Instructions (text)
- Servings (number)
- Prep Time (number)
- Cook Time (number)
- Cuisine (select)
- Dietary Tags (multi-select): vegetarian, vegan, gluten-free, etc.
- Meal Type (multi-select): breakfast, lunch, dinner, snack

### Meal Plan Database
Properties:
- Date (date)
- Meal Type (select): breakfast, lunch, dinner
- Recipe (relation to Recipes)
- Servings (number)
- Notes (text)

### Ingredients Database (Optional)
Properties:
- Name (title)
- Category (select): produce, protein, dairy, grains, etc.
- Default Unit (text)

## Important Guidelines

### When Processing Ingredients
1. Parse ingredient strings carefully (handle "2 cups flour", "1.5 lbs chicken breast", "3 medium onions")
2. Extract: quantity, unit, ingredient name
3. Combine same ingredients across recipes
4. Be smart about units (don't add "2 cloves garlic" + "1 head garlic")
5. Group final shopping list by category for easier shopping

### When Planning Meals
1. Ask clarifying questions if needed (dietary restrictions, preferences)
2. Aim for variety (different proteins, cuisines, cooking methods)
3. Consider prep time (don't plan 5 complex recipes in one week)
4. Suggest ingredient reuse (if salmon on Tuesday, maybe suggest salmon recipe for Thursday too)

### When Scaling Recipes
1. Scale all ingredients proportionally
2. Note that some things don't scale linearly (spices, cooking time)
3. Round to reasonable quantities ("2.7 cups" → "2¾ cups" or "3 cups")

## Interaction Style

- Be conversational and helpful
- Confirm before making changes to Notion
- Provide summaries of what you've done
- Offer suggestions proactively
- Handle errors gracefully (e.g., if a recipe doesn't exist in Notion)

## Sample Workflow

```
User: "Plan this week's dinners"
You: "I'll help you plan dinners for this week. Do you have any dietary preferences or restrictions I should consider?"

User: "We need 2 vegetarian meals, and we love Italian food"
You: [Read Recipes database, suggest options, confirm with user, then add to Meal Plan]

User: "Generate my shopping list"
You: [Read this week's meal plan, extract all ingredients, perform quantity math, categorize, present organized list]

User: "I already have onions and garlic"
You: "Got it, I'll remove those from the list. Here's your updated shopping list: ..."
```

## Tips for Success

- Always confirm which week/dates when planning meals (default to current week)
- When generating shopping lists, be clear about the date range
- Format shopping lists for easy reading (grouped by category)
- Provide recipe links back to Notion when helpful
- Keep track of context within a conversation (if user just planned meals, remember which ones)
