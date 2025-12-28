#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function addRecipe() {
  console.log('🥩 Adding recipe: Slow Cooker Pot Roast...\n');

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
                content: 'Slow Cooker Pot Roast'
              }
            }
          ]
        },
        'Servings': {
          number: 8
        },
        'Prep Time': {
          number: 15
        },
        'Cook Time': {
          number: 480
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
                content: '3-4 lb beef chuck roast\n6 medium potatoes, quartered\n4 large carrots, cut into chunks\n2 celery stalks, cut into chunks\n1 large onion, quartered\n4 cloves garlic, minced\n2 cups beef broth\n1 cup red wine (or additional beef broth)\n3 tbsp tomato paste\n2 tbsp Worcestershire sauce\n2 bay leaves\n1 tsp dried thyme\n1 tsp dried rosemary\n1 tsp onion powder\n1 tsp garlic powder\n2 tbsp olive oil\n3 tbsp cornstarch\n3 tbsp water\nSalt and pepper to taste\nFresh thyme for garnish'
              }
            }
          ]
        },
        'Instructions': {
          rich_text: [
            {
              text: {
                content: '1. Season roast generously with salt, pepper, onion powder, and garlic powder\n2. Heat olive oil in a large skillet over medium-high heat\n3. Sear roast on all sides until browned (3-4 minutes per side)\n4. Place potatoes, carrots, celery, and onion in bottom of slow cooker\n5. Place seared roast on top of vegetables\n6. In a bowl, whisk together beef broth, red wine, tomato paste, Worcestershire sauce, garlic, thyme, and rosemary\n7. Pour mixture over roast and vegetables\n8. Add bay leaves\n9. Cover and cook on LOW for 8-10 hours or HIGH for 5-6 hours until meat is fork-tender\n10. Remove roast and vegetables; tent with foil to keep warm\n11. For gravy: Mix cornstarch and water, stir into cooking liquid\n12. Cook on HIGH for 10-15 minutes until thickened\n13. Slice roast, serve with vegetables and gravy\n14. Garnish with fresh thyme'
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
