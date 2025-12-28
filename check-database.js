#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function checkDatabase() {
  try {
    const database = await notion.databases.retrieve({
      database_id: RECIPES_DB_ID
    });

    console.log('📚 Recipes Database:\n');
    console.log(JSON.stringify(database, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkDatabase();
