#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function addRecipe() {
  console.log('🍗 Adding recipe: Quick Chicken Stir-Fry...\n');

  try {
    const recipe = await notion.pages.create({
      parent: {
        database_id: RECIPES_DB_ID
      },
      properties: {
        'Name': {
          title: [
            {
              text: {
                content: 'Quick Chicken Stir-Fry'
              }
            }
          ]
        },
        'Servings': {
          number: 4
        },
        'Prep Time': {
          number: 15
        },
        'Cook Time': {
          number: 15
        },
        'Cuisine': {
          select: {
            name: 'Asian'
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
                content: '1 lb chicken breast, cubed\n2 cups mixed vegetables (broccoli, carrots, bell peppers)\n2 tbsp soy sauce\n1 tbsp sesame oil\n2 cloves garlic, minced\n1 tsp ginger, minced\nSalt and pepper to taste'
              }
            }
          ]
        },
        'Instructions': {
          rich_text: [
            {
              text: {
                content: '1. Heat sesame oil in a large wok or skillet\n2. Add chicken and cook until golden\n3. Add garlic and ginger, cook for 1 minute\n4. Add vegetables and stir-fry for 5-7 minutes\n5. Add soy sauce, salt and pepper\n6. Serve hot over rice'
              }
            }
          ]
        }
      }
    });

    console.log('✅ Recipe added successfully!');
    console.log(`   Recipe URL: ${recipe.url}\n`);

  } catch (error) {
    console.error('❌ Error adding recipe:', error.message);
    console.error(error);
    process.exit(1);
  }
}

addRecipe();
