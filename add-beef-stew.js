#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function addRecipe() {
  console.log('🥘 Adding recipe: Slow Cooker Beef Stew...\n');

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
                content: 'Slow Cooker Beef Stew'
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
                content: '2 lbs beef chuck, cut into 1-inch cubes\n4 medium potatoes, peeled and cubed\n4 carrots, peeled and sliced\n3 celery stalks, chopped\n1 large onion, diced\n3 cloves garlic, minced\n3 cups beef broth\n1 can (6 oz) tomato paste\n2 bay leaves\n1 tsp dried thyme\n1 tsp dried rosemary\n1 tsp paprika\n2 tbsp Worcestershire sauce\n3 tbsp flour\n2 tbsp olive oil\n1 cup frozen peas\nSalt and pepper to taste\nFresh parsley for garnish'
              }
            }
          ]
        },
        'Instructions': {
          rich_text: [
            {
              text: {
                content: '1. Season beef cubes with salt, pepper, and flour; toss to coat\n2. Heat olive oil in a skillet and brown beef on all sides (optional but recommended)\n3. Place potatoes, carrots, celery, and onion in slow cooker\n4. Add browned beef on top of vegetables\n5. Mix beef broth, tomato paste, Worcestershire sauce, garlic, thyme, rosemary, and paprika\n6. Pour mixture over beef and vegetables\n7. Add bay leaves\n8. Cover and cook on LOW for 8 hours or HIGH for 4-5 hours\n9. Add frozen peas in the last 30 minutes of cooking\n10. Remove bay leaves, adjust seasoning with salt and pepper\n11. Garnish with fresh parsley and serve hot'
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
