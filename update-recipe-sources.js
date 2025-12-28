#!/usr/bin/env node

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const RECIPES_DB_ID = 'ab60a389-134b-4b2b-b728-cbe416c79795';

async function updateRecipeSources() {
  const sourceName = process.argv[2];

  if (!sourceName) {
    console.error('❌ Please provide a source name');
    console.log('\nUsage: node update-recipe-sources.js "Source Name"');
    console.log('Example: node update-recipe-sources.js "Stealth Health Slow Cooker Cookbook"');
    process.exit(1);
  }

  console.log(`🔄 Updating recipes with source: "${sourceName}"...\n`);

  try {
    // Get all recipes from the database
    console.log('Searching for recipes...');
    const response = await notion.search({
      filter: {
        value: 'page',
        property: 'object'
      },
      page_size: 100
    });

    // Filter to only pages from our Recipes database
    const allRecipes = response.results.filter(page =>
      page.parent &&
      page.parent.database_id === RECIPES_DB_ID
    );

    console.log(`📚 Found ${allRecipes.length} recipes total`);

    // Filter recipes that don't have a source set
    const recipesWithoutSource = allRecipes.filter(recipe => {
      const sourceProperty = recipe.properties.Source;
      return !sourceProperty ||
             !sourceProperty.rich_text ||
             sourceProperty.rich_text.length === 0;
    });

    console.log(`📝 ${recipesWithoutSource.length} recipes need source updated\n`);

    if (recipesWithoutSource.length === 0) {
      console.log('✅ All recipes already have sources!');
      return;
    }

    // Update each recipe
    let updated = 0;
    for (const recipe of recipesWithoutSource) {
      const recipeName = recipe.properties.Name.title[0]?.plain_text || 'Untitled';

      try {
        await notion.pages.update({
          page_id: recipe.id,
          properties: {
            'Source': {
              rich_text: [
                {
                  text: {
                    content: sourceName
                  }
                }
              ]
            }
          }
        });
        updated++;
        console.log(`✓ ${updated}/${recipesWithoutSource.length}: ${recipeName}`);
      } catch (error) {
        console.error(`✗ Failed to update "${recipeName}": ${error.message}`);
      }
    }

    console.log(`\n🎉 Successfully updated ${updated} recipes with source: "${sourceName}"`);

  } catch (error) {
    console.error('❌ Error updating recipes:', error.message);
    process.exit(1);
  }
}

updateRecipeSources();
