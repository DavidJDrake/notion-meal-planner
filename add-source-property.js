#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function addSourceProperty() {
  console.log('🔧 Adding Source property to Recipes database...\n');

  try {
    const database = await notion.databases.update({
      database_id: RECIPES_DB_ID,
      properties: {
        'Source': {
          rich_text: {}
        }
      }
    });

    console.log('✅ Source property added successfully!');
    console.log('\n📋 You can now track where each recipe comes from:');
    console.log('   - Cookbooks');
    console.log('   - Websites');
    console.log('   - Family recipes');
    console.log('   - Personal creations');
    console.log('   - etc.');

  } catch (error) {
    console.error('❌ Error adding Source property:', error.message);
    process.exit(1);
  }
}

addSourceProperty();
