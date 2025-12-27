# Usage Guide

This guide provides detailed examples of how to use the Notion Meal Planner with Claude Code.

## Getting Started

Start Claude Code in your project directory:
```bash
cd notion-meal-planner
claude
```

Claude Code will automatically load the context from `CLAUDE.md` and understand how to work with your meal planning system.

---

## Common Tasks

### 1. Viewing Your Recipes

**List all recipes:**
```
> List all my recipes
> Show me all recipes in my Notion database
```

**Filter recipes:**
```
> Show me all vegetarian recipes
> What Italian recipes do I have?
> List recipes that take less than 30 minutes
> Show me dinner recipes
```

**Search for specific ingredients:**
```
> What recipes use chicken breast?
> Do I have any recipes with salmon?
> Show recipes that use pasta
```

---

### 2. Planning Meals

**Plan a single meal:**
```
> Add Spaghetti Carbonara to my meal plan for tomorrow at dinner
> Plan chicken stir-fry for Friday dinner
> Schedule breakfast burrito for Monday morning
```

**Plan multiple meals:**
```
> Plan dinners for this week
> Help me plan next week's lunches
> I need 5 dinner ideas for this week
```

**Plan with preferences:**
```
> Plan this week's dinners - I want 2 vegetarian meals and variety in cuisines
> Plan meals for next week using recipes that take less than 45 minutes
> Schedule quick breakfasts for weekdays
```

**Get suggestions:**
```
> What should I cook for dinner tonight?
> Suggest a vegetarian meal for Wednesday
> I have chicken breast - what can I make?
```

---

### 3. Viewing Your Meal Plan

**See current plan:**
```
> What's planned for this week?
> Show me my meal plan for next week
> What am I cooking today?
> What's for dinner tomorrow?
```

**Check specific days:**
```
> What meals are planned for Monday?
> Show me this weekend's meal plan
> What dinners are planned this week?
```

---

### 4. Generating Shopping Lists

**Basic shopping list:**
```
> Generate a shopping list for this week
> Create my shopping list for next week's meals
> What ingredients do I need for this week?
```

**Custom date ranges:**
```
> Shopping list for Monday through Wednesday
> What do I need to buy for the weekend meals?
> Generate a shopping list for the next 3 days
```

**Remove items you have:**
```
> Generate a shopping list for this week
[Claude shows list]
> I already have onions, garlic, and olive oil - remove those
[Claude shows updated list]
```

**Categorized lists:**
```
> Generate a shopping list grouped by store section
> Create a shopping list organized by category
```

---

### 5. Adding Recipes

**Add a simple recipe:**
```
> Add a recipe for chicken tacos
[Claude will ask for ingredients and instructions]
```

**Add with full details:**
```
> Add this recipe:
Name: Classic Margherita Pizza
Ingredients:
- 1 lb pizza dough
- 1 cup tomato sauce
- 8 oz fresh mozzarella
- Fresh basil leaves
- 2 tbsp olive oil
- Salt to taste

Instructions:
1. Preheat oven to 475°F
2. Roll out dough on floured surface
3. Spread tomato sauce evenly
4. Add torn mozzarella pieces
5. Drizzle with olive oil
6. Bake for 12-15 minutes until crust is golden
7. Top with fresh basil

Servings: 4
Cuisine: Italian
Meal Type: Dinner
```

**Quick add from URL:**
```
> Add this recipe from [URL]
[Claude will extract and format the recipe]
```

---

### 6. Scaling Recipes

**Scale up:**
```
> I need the lasagna recipe for 8 people instead of 4
> Double the chocolate chip cookie recipe
> Scale the curry recipe to serve 6
```

**Scale down:**
```
> Adjust the soup recipe for 2 servings instead of 6
> Halve the pancake recipe
```

---

### 7. Modifying the Meal Plan

**Change a meal:**
```
> Replace Wednesday's dinner with pasta primavera
> Change tomorrow's lunch to something vegetarian
> Swap Thursday dinner for a quick recipe
```

**Add notes:**
```
> Add a note to Monday's dinner: "Make extra for leftovers"
> Note that we're eating out on Friday
```

**Mark as cooked:**
```
> Mark today's dinner as cooked
> Update status for yesterday's meals to cooked
```

---

## Advanced Usage

### Meal Planning Strategies

**Theme nights:**
```
> Plan this week with Taco Tuesday, Pasta Thursday, and Pizza Friday
> Create a week with Italian Monday, Asian Wednesday, and Mexican Friday
```

**Batch cooking:**
```
> Plan meals this week that I can make large batches of
> Suggest recipes good for meal prep
> What recipes make good leftovers?
```

**Use what you have:**
```
> I have chicken, broccoli, and rice - plan a few meals around these
> Plan this week using recipes that share ingredients to minimize waste
```

**Special occasions:**
```
> Plan a special dinner for Saturday - something impressive but not too hard
> Suggest an elegant vegetarian meal for guests
```

---

### Shopping List Optimization

**Smart shopping:**
```
> Generate a shopping list and highlight ingredients used in multiple recipes
> Create a shopping list showing which recipe each ingredient is for
> What ingredients appear in more than one meal this week?
```

**Budget conscious:**
```
> Show me which ingredients are the most expensive on my list
> Can you suggest cheaper alternatives for [ingredient]?
```

**Meal prep planning:**
```
> Which recipes can I prep on Sunday for the week?
> Create a prep schedule for this week's meals
```

---

### Recipe Management

**Update recipes:**
```
> Update the pasta carbonara recipe - change servings to 6
> Add "quick and easy" tag to the stir-fry recipe
> Update chicken tacos instructions - step 3 should say "cook for 15 minutes"
```

**Find similar recipes:**
```
> Find recipes similar to chicken parmesan
> What other pasta dishes do I have?
> Show me more recipes like this one
```

**Recipe analytics:**
```
> What are my most-used recipes?
> Which cuisines do I cook most often?
> How many vegetarian recipes do I have?
```

---

## Example Workflows

### Weekly Meal Planning Routine

**Sunday afternoon:**
```
You: Plan dinners for this week - I want variety and at least 2 vegetarian meals

Claude: I'll help you plan this week's dinners. Let me check your recipes...
[Shows suggestions]
How does this look:
- Monday: Chicken Stir-Fry
- Tuesday: Vegetarian Chili
- Wednesday: Salmon with Roasted Vegetables
- Thursday: Pasta Primavera (vegetarian)
- Friday: Homemade Pizza
- Saturday: Beef Tacos
- Sunday: Leftover night

You: Perfect! Add those to my meal plan

Claude: [Adds all meals to Notion Meal Plan]
Done! I've added all 6 dinners to your meal plan for this week.

You: Generate my shopping list

Claude: [Reads all planned meals, aggregates ingredients]
Here's your shopping list for the week, organized by category:

**Produce:**
- Bell peppers: 4 (red, yellow, green, orange)
- Broccoli: 1 head
- Tomatoes: 8 medium
- Onions: 5 medium
- Garlic: 1 head
...

You: I have onions and garlic, remove those

Claude: [Updates list]
Updated shopping list (removed onions and garlic):
...
```

---

### Quick Daily Use

**Morning planning:**
```
> What's for dinner tonight?
[Claude shows planned meal]

> What time should I start prep if we want to eat at 6?
[Claude calculates based on prep and cook time]
```

**Last-minute changes:**
```
> We're too tired to cook the planned meal - suggest something quick
[Claude suggests recipes under 30 minutes]

> Replace tonight with the quick pasta recipe
[Claude updates meal plan]
```

---

### Recipe Collection Building

**Trying new recipes:**
```
> I found a great recipe online [paste URL]
[Claude extracts and adds to Notion]

> After cooking: This was great! Update the rating to 5 stars and add a note that we doubled the garlic
[Claude updates the recipe]
```

**Seasonal planning:**
```
> Show me recipes good for summer
> What can I make with seasonal vegetables?
> Plan a week of comfort food for winter
```

---

## Tips for Best Results

### 1. Be Specific with Dates
- ✅ "Plan dinners for next week"
- ✅ "Shopping list for January 2-8"
- ❌ "Plan some meals" (when?)

### 2. Provide Context
- ✅ "I want quick meals - we're busy this week"
- ✅ "Plan dinners for 2 people"
- ❌ Just "plan meals" (missing preferences)

### 3. Confirm Before Changes
Claude will usually confirm before making changes to your Notion data. If you want changes applied immediately:
- ✅ "Add this recipe and confirm it's correct"
- ✅ "Update and show me the result"

### 4. Use Follow-ups
In a single conversation, Claude remembers context:
```
> Plan this week's dinners
[Claude suggests]
> Make two of those vegetarian
[Claude knows which week you mean]
> Now generate the shopping list
[Claude knows to use the meals just planned]
```

### 5. Ask for Explanations
```
> Why did you suggest these recipes?
> How did you calculate the ingredient quantities?
> Show me your reasoning for this meal plan
```

---

## Troubleshooting Common Issues

### "I can't find that recipe"
- Check the exact name in your Notion database
- Try partial names: "pasta" instead of "Pasta Primavera with Fresh Basil"
- Ask Claude to list all recipes to see what's available

### "Ingredients don't add up correctly"
- Ensure consistent formatting in recipe ingredients
- Check that units are included (not just "2 flour" but "2 cups flour")
- Ask Claude to show its math: "How did you get 3.5 cups flour?"

### "Shopping list is missing items"
- Verify all meals are properly linked to recipes in meal plan
- Check that the date range is correct
- Ask: "Show me which meals you included in this shopping list"

---

## Next Steps

- Experiment with different meal planning styles
- Build up your recipe collection
- Customize the CLAUDE.md file with your preferences
- Create custom skills for your specific workflow

Enjoy cooking! 🍳
