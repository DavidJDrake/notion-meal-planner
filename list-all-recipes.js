#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function listAllRecipes() {
  try {
    console.log('🔍 Searching for all pages...\n');

    const response = await notion.search({
      filter: {
        value: 'page',
        property: 'object'
      },
      page_size: 100
    });

    console.log(`Total pages found: ${response.results.length}\n`);

    // Show database IDs
    console.log('Database parent IDs found:');
    response.results.forEach((page, idx) => {
      if (page.parent && page.parent.database_id) {
        const title = page.properties.Name?.title[0]?.plain_text || 'Untitled';
        console.log(`  ${idx + 1}. "${title}"`);
        console.log(`     Parent DB ID: ${page.parent.database_id}`);
        console.log(`     Looking for: ${RECIPES_DB_ID.replace(/-/g, '')}`);
        console.log(`     Match: ${page.parent.database_id === RECIPES_DB_ID.replace(/-/g, '')}\n`);
      }
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

listAllRecipes();
