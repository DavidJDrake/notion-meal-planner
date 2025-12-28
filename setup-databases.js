#!/usr/bin/env node

/**
 * Notion Meal Planner - Database Setup Script
 *
 * This script creates the Recipes and Meal Plan databases in your Notion workspace
 * with all the necessary properties and relations.
 */

const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function createMealPlanningDatabases() {
  try {
    console.log('🚀 Creating Notion databases for meal planning...\n');

    // Step 1: Search for or create a parent page
    console.log('📄 Searching for workspace pages...');
    const search = await notion.search({
      filter: {
        value: 'page',
        property: 'object'
      },
      page_size: 1
    });

    if (search.results.length === 0) {
      console.error('❌ No pages found in workspace. Please create at least one page in Notion first.');
      console.error('💡 Go to Notion, create any page, share it with your integration, then run this again.');
      process.exit(1);
    }

    // Use the first page found as parent
    const parentPageId = search.results[0].id;
    console.log(`✅ Using existing page as parent\n`);

    // Step 2: Create Recipes Database
    console.log('📚 Creating Recipes database...');
    const recipesDatabase = await notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: parentPageId
      },
      title: [
        {
          type: 'text',
          text: {
            content: 'Recipes'
          }
        }
      ],
      properties: {
        'Name': {
          title: {}
        },
        'Ingredients': {
          rich_text: {}
        },
        'Instructions': {
          rich_text: {}
        },
        'Servings': {
          number: {
            format: 'number'
          }
        },
        'Prep Time': {
          number: {
            format: 'number'
          }
        },
        'Cook Time': {
          number: {
            format: 'number'
          }
        },
        'Cuisine': {
          select: {
            options: [
              { name: 'Italian', color: 'red' },
              { name: 'Mexican', color: 'orange' },
              { name: 'Asian', color: 'yellow' },
              { name: 'American', color: 'blue' },
              { name: 'Mediterranean', color: 'green' },
              { name: 'Indian', color: 'purple' },
              { name: 'Other', color: 'gray' }
            ]
          }
        },
        'Dietary Tags': {
          multi_select: {
            options: [
              { name: 'Vegetarian', color: 'green' },
              { name: 'Vegan', color: 'green' },
              { name: 'Gluten-Free', color: 'yellow' },
              { name: 'Dairy-Free', color: 'blue' },
              { name: 'Nut-Free', color: 'orange' },
              { name: 'Low-Carb', color: 'purple' },
              { name: 'Keto', color: 'pink' }
            ]
          }
        },
        'Meal Type': {
          multi_select: {
            options: [
              { name: 'Breakfast', color: 'yellow' },
              { name: 'Lunch', color: 'orange' },
              { name: 'Dinner', color: 'red' },
              { name: 'Snack', color: 'blue' },
              { name: 'Dessert', color: 'pink' }
            ]
          }
        }
      }
    });
    console.log('✅ Recipes database created!');
    console.log(`   Database ID: ${recipesDatabase.id}\n`);

    // Step 3: Create Meal Plan Database
    console.log('📅 Creating Meal Plan database...');
    const mealPlanDatabase = await notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: parentPageId
      },
      title: [
        {
          type: 'text',
          text: {
            content: 'Meal Plan'
          }
        }
      ],
      properties: {
        'Name': {
          title: {}
        },
        'Date': {
          date: {}
        },
        'Meal Type': {
          select: {
            options: [
              { name: 'Breakfast', color: 'yellow' },
              { name: 'Lunch', color: 'orange' },
              { name: 'Dinner', color: 'red' },
              { name: 'Snack', color: 'blue' }
            ]
          }
        },
        'Recipe': {
          relation: {
            database_id: recipesDatabase.id,
            type: 'dual_property',
            dual_property: {
              synced_property_name: 'Meal Plans'
            }
          }
        },
        'Servings': {
          number: {
            format: 'number'
          }
        },
        'Status': {
          select: {
            options: [
              { name: 'Planned', color: 'yellow' },
              { name: 'Cooked', color: 'green' },
              { name: 'Skipped', color: 'red' }
            ]
          }
        },
        'Notes': {
          rich_text: {}
        }
      }
    });
    console.log('✅ Meal Plan database created!');
    console.log(`   Database ID: ${mealPlanDatabase.id}\n`);

    // Success summary
    console.log('🎉 All databases created successfully!\n');
    console.log('📋 Summary:');
    console.log(`   Recipes Database: ${recipesDatabase.url}`);
    console.log(`   Meal Plan Database: ${mealPlanDatabase.url}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Open the databases in Notion');
    console.log('   2. Create a Calendar view for Meal Plan');
    console.log('   3. Add your first recipe!');
    console.log('\n✨ Save these database IDs for reference:');
    console.log(`   RECIPES_DB_ID="${recipesDatabase.id}"`);
    console.log(`   MEAL_PLAN_DB_ID="${mealPlanDatabase.id}"`);

  } catch (error) {
    console.error('❌ Error creating databases:', error.message);
    if (error.code === 'validation_error') {
      console.error('\n💡 Tip: Make sure NOTION_PARENT_PAGE_ID is set to a valid page ID');
    }
    process.exit(1);
  }
}

// Run the setup
createMealPlanningDatabases();
