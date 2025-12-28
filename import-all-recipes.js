#!/usr/bin/env node

const { Client } = require('@notionhq/client');
const fs = require('fs');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

function parseRecipes(fileContent) {
  const recipes = [];
  const lines = fileContent.split('\n');

  let currentRecipe = null;
  let currentSection = null;
  let ingredientBuffer = [];
  let instructionBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Look for "Per Serving: makes X" which indicates a recipe
    if (line.match(/^Per Serving: makes \d+/i)) {
      // Save previous recipe if exists
      if (currentRecipe) {
        currentRecipe.ingredients = ingredientBuffer.join('\n').trim();
        currentRecipe.instructions = instructionBuffer.join('\n').trim();
        recipes.push(currentRecipe);
      }

      // Start new recipe
      const servingsMatch = line.match(/makes (\d+)/i);
      const servings = servingsMatch ? parseInt(servingsMatch[1]) : 4;

      // Get recipe name from previous line
      const recipeName = lines[i - 1] ? lines[i - 1].trim() : 'Unknown Recipe';

      currentRecipe = {
        name: recipeName,
        servings: servings,
        prepTime: 15, // default
        cookTime: 240, // default 4 hours for slow cooker
      };

      currentSection = null;
      ingredientBuffer = [];
      instructionBuffer = [];
      continue;
    }

    // Detect sections
    if (line.toLowerCase() === 'ingredients') {
      currentSection = 'ingredients';
      continue;
    }

    if (line.toLowerCase() === 'instructions') {
      currentSection = 'instructions';
      continue;
    }

    // Skip empty lines or "back to table of contents"
    if (!line || line.match(/back to table of contents/i)) {
      continue;
    }

    // Add content to appropriate section
    if (currentRecipe && currentSection === 'ingredients') {
      ingredientBuffer.push(line);
    } else if (currentRecipe && currentSection === 'instructions') {
      instructionBuffer.push(line);
    }
  }

  // Don't forget the last recipe
  if (currentRecipe) {
    currentRecipe.ingredients = ingredientBuffer.join('\n').trim();
    currentRecipe.instructions = instructionBuffer.join('\n').trim();
    recipes.push(currentRecipe);
  }

  return recipes;
}

async function addRecipeToNotion(recipe) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: RECIPES_DB_ID
      },
      properties: {
        'Name': {
          title: [
            {
              text: {
                content: recipe.name
              }
            }
          ]
        },
        'Servings': {
          number: recipe.servings
        },
        'Prep Time': {
          number: recipe.prepTime
        },
        'Cook Time': {
          number: recipe.cookTime
        },
        'Cuisine': {
          select: {
            name: 'American'
          }
        },
        'Meal Type': {
          multi_select: [
            { name: 'Dinner' }
          ]
        },
        'Ingredients': {
          rich_text: [
            {
              text: {
                content: recipe.ingredients.substring(0, 2000) // Notion has char limits
              }
            }
          ]
        },
        'Instructions': {
          rich_text: [
            {
              text: {
                content: recipe.instructions.substring(0, 2000)
              }
            }
          ]
        }
      }
    });

    return response;
  } catch (error) {
    console.error(`Error adding recipe "${recipe.name}":`, error.message);
    return null;
  }
}

async function main() {
  console.log('📖 Reading recipes.txt...\n');

  const fileContent = fs.readFileSync('recipes.txt', 'utf8');
  const recipes = parseRecipes(fileContent);

  console.log(`Found ${recipes.length} recipes to import\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    console.log(`[${i + 1}/${recipes.length}] Adding: ${recipe.name}...`);

    const result = await addRecipeToNotion(recipe);

    if (result) {
      successCount++;
    } else {
      failCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n✅ Import complete!`);
  console.log(`   Successfully added: ${successCount} recipes`);
  if (failCount > 0) {
    console.log(`   Failed: ${failCount} recipes`);
  }
}

main();
