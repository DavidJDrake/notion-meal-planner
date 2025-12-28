#!/usr/bin/env node

const { Client} = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function updateDatabaseProperties() {
  console.log('🔧 Adding properties to Recipes database...\n');

  try {
    const database = await notion.databases.update({
      database_id: RECIPES_DB_ID,
      properties: {
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

    console.log('✅ Properties added successfully!');
    console.log('\n📋 Added properties:');
    console.log('   - Ingredients (Rich Text)');
    console.log('   - Instructions (Rich Text)');
    console.log('   - Servings (Number)');
    console.log('   - Prep Time (Number)');
    console.log('   - Cook Time (Number)');
    console.log('   - Cuisine (Select)');
    console.log('   - Dietary Tags (Multi-select)');
    console.log('   - Meal Type (Multi-select)');

  } catch (error) {
    console.error('❌ Error updating database:', error.message);
    console.error(JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

updateDatabaseProperties();
