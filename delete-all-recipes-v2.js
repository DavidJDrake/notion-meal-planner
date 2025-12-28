#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function deleteAllRecipes() {
  console.log('🗑️  Fetching all recipes...\n');

  // Search for all pages (recipes)
  const response = await notion.search({
    filter: {
      value: 'page',
      property: 'object'
    },
    page_size: 100
  });

  console.log(`Found ${response.results.length} pages to delete\n`);

  let deleted = 0;
  for (const page of response.results) {
    // Check if it's in our database
    if (page.parent && page.parent.database_id === DB_ID) {
      try {
        await notion.blocks.delete({ block_id: page.id });
        deleted++;
        console.log(`[${deleted}] Deleted: ${page.id}`);
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error deleting ${page.id}:`, error.message);
      }
    }
  }

  console.log(`\n✅ Deleted ${deleted} recipes\n`);
}

deleteAllRecipes();
