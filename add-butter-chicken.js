#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function addRecipe() {
  console.log('🍛 Adding recipe: Butter Chicken...\n');

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
                content: 'Butter Chicken'
              }
            }
          ]
        },
        'Servings': {
          number: 6
        },
        'Prep Time': {
          number: 20
        },
        'Cook Time': {
          number: 40
        },
        'Cuisine': {
          select: {
            name: 'Indian'
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
                content: '2 lbs chicken breast, cut into chunks\n1 cup plain yogurt\n2 tbsp lemon juice\n2 tsp garam masala\n1 tsp turmeric\n1 tsp cumin\n1 tsp red chili powder\n4 cloves garlic, minced\n1 tbsp fresh ginger, grated\n4 tbsp butter\n1 large onion, diced\n1 can (14 oz) tomato sauce\n1 cup heavy cream\n1 tbsp sugar\n1 tsp salt\nFresh cilantro for garnish\nCooked basmati rice for serving\nNaan bread for serving'
              }
            }
          ]
        },
        'Instructions': {
          rich_text: [
            {
              text: {
                content: '1. Marinate chicken in yogurt, lemon juice, 1 tsp garam masala, turmeric, cumin, chili powder, half the garlic, and half the ginger for at least 1 hour (or overnight)\n2. Heat 2 tbsp butter in a large skillet over medium-high heat\n3. Cook marinated chicken until browned and cooked through (8-10 minutes); set aside\n4. In the same pan, melt remaining butter and sauté onion until soft (5 minutes)\n5. Add remaining garlic and ginger; cook for 1 minute\n6. Add tomato sauce and remaining garam masala; simmer for 10 minutes\n7. Stir in heavy cream and sugar; simmer for 5 minutes\n8. Return chicken to the pan and coat with sauce\n9. Simmer for 10 minutes until sauce thickens\n10. Season with salt and garnish with cilantro\n11. Serve hot over basmati rice with naan bread'
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
