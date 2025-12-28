#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function listProperties() {
  try {
    const database = await notion.databases.retrieve({
      database_id: RECIPES_DB_ID
    });

    console.log('📚 Recipes Database Properties:\n');

    if (database.properties) {
      Object.keys(database.properties).forEach(propName => {
        const prop = database.properties[propName];
        console.log(`   - "${propName}" (${prop.type})`);
      });
    } else {
      console.log('No properties found');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listProperties();
