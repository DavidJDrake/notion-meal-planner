#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function addSampleRecipe() {
  console.log('🍝 Adding sample recipe: Classic Spaghetti Carbonara...\n');

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
                content: 'Classic Spaghetti Carbonara'
              }
            }
          ]
        },
        'Servings': {
          number: 4
        },
        'Prep Time': {
          number: 10
        },
        'Cook Time': {
          number: 20
        },
        'Cuisine': {
          select: {
            name: 'Italian'
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
                content: '1 lb spaghetti\n6 oz pancetta, diced\n4 large eggs\n1 cup Parmesan cheese, grated\n2 cloves garlic, minced\nSalt and black pepper to taste'
              }
            }
          ]
        },
        'Instructions': {
          rich_text: [
            {
              text: {
                content: '1. Cook spaghetti according to package directions\n2. While pasta cooks, fry pancetta until crispy\n3. Beat eggs with Parmesan in a bowl\n4. Drain pasta, reserving 1 cup pasta water\n5. Toss hot pasta with pancetta\n6. Remove from heat, quickly stir in egg mixture\n7. Add pasta water to reach desired consistency\n8. Season with salt and pepper'
              }
            }
          ]
        }
      }
    });

    console.log('✅ Sample recipe added successfully!');
    console.log(`   Recipe URL: ${recipe.url}\n`);
    console.log('🎉 Your meal planning system is ready to use!');
    console.log('\n💡 Try these commands in Claude Code:');
    console.log('   > List all recipes');
    console.log('   > Add this recipe to my meal plan for tomorrow');
    console.log('   > Generate a shopping list for this week');

  } catch (error) {
    console.error('❌ Error adding sample recipe:', error.message);
    process.exit(1);
  }
}

addSampleRecipe();
