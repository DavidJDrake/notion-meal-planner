#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const MEAL_PLAN_DB_ID = '58675e7c-a07c-4d59-a8f3-1d84075d454d';
const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function updateMealPlanProperties() {
  console.log('🔧 Adding properties to Meal Plan database...\n');

  try {
    const database = await notion.databases.update({
      database_id: MEAL_PLAN_DB_ID,
      properties: {
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
            database_id: RECIPES_DB_ID,
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

    console.log('✅ Properties added successfully!');
    console.log('\n📋 Added properties:');
    console.log('   - Date (Date)');
    console.log('   - Meal Type (Select)');
    console.log('   - Recipe (Relation to Recipes)');
    console.log('   - Servings (Number)');
    console.log('   - Status (Select)');
    console.log('   - Notes (Rich Text)');

  } catch (error) {
    console.error('❌ Error updating database:', error.message);
    console.error(JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

updateMealPlanProperties();
