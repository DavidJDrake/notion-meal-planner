#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const RECIPES_DB_ID = 'fa0b5578-990c-446d-8d17-279adee8324e';

async function deleteAllRecipes() {
  console.log('🗑️  Deleting all recipes...\n');

  let hasMore = true;
  let cursor = undefined;
  let totalDeleted = 0;

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: RECIPES_DB_ID,
      start_cursor: cursor,
      page_size: 100
    });

    for (const page of response.results) {
      await notion.blocks.delete({ block_id: page.id });
      totalDeleted++;
      console.log(`Deleted: ${totalDeleted}`);
    }

    hasMore = response.has_more;
    cursor = response.next_cursor;
  }

  console.log(`\n✅ Deleted ${totalDeleted} recipes\n`);
}

deleteAllRecipes();
