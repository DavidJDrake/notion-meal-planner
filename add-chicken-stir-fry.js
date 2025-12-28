#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function addRecipe() {
  console.log('🍗 Adding recipe: Chicken Stir-Fry...\n');

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
                content: 'Chicken Stir-Fry'
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
                content: '1.5 lbs chicken breast, sliced thin\n3 cups mixed vegetables (bell peppers, broccoli, snap peas, carrots)\n3 cloves garlic, minced\n1 tbsp fresh ginger, grated\n3 tbsp soy sauce\n2 tbsp oyster sauce\n1 tbsp sesame oil\n2 tbsp vegetable oil\n1 tbsp cornstarch\n1/4 cup chicken broth\n2 green onions, sliced\n1 tsp red pepper flakes (optional)\nSalt and pepper to taste\nCooked rice for serving'
              }
            }
          ]
        },
        'Instructions': {
          rich_text: [
            {
              text: {
                content: '1. Mix soy sauce, oyster sauce, sesame oil, cornstarch, and chicken broth in a small bowl; set aside\n2. Heat 1 tbsp vegetable oil in a large wok or skillet over high heat\n3. Add chicken and stir-fry until cooked through (5-7 minutes); remove and set aside\n4. Add remaining oil to wok, then add garlic and ginger; stir-fry for 30 seconds\n5. Add vegetables and stir-fry until crisp-tender (3-5 minutes)\n6. Return chicken to wok\n7. Pour sauce over chicken and vegetables; toss to coat\n8. Cook for 2-3 minutes until sauce thickens\n9. Garnish with green onions and red pepper flakes\n10. Serve hot over rice'
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
