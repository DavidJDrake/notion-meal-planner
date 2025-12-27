# Setup Guide

This guide will walk you through setting up the Notion Meal Planner system from scratch.

## Prerequisites

Before you begin, ensure you have:
- [ ] A Notion account
- [ ] Claude Code installed
- [ ] Git installed
- [ ] Node.js installed (for MCP server)

## Step 1: Clone the Repository

```bash
git clone https://github.com/DavidJDrake/notion-meal-planner.git
cd notion-meal-planner
```

## Step 2: Set Up Notion Integration

### 2.1 Create a Notion Integration

1. Go to https://www.notion.com/profile/integrations
2. Click "**+ New integration**"
3. Fill in the details:
   - **Name:** Claude Code Meal Planner
   - **Associated workspace:** Select your workspace
   - **Logo:** (optional)
4. Click "**Submit**"
5. Copy your **Internal Integration Token** (starts with `secret_` or `ntn_`)
   - ⚠️ **Keep this secret!** Don't commit it to git

### 2.2 Create Notion Databases

You need to create three databases in your Notion workspace.

#### Create Recipes Database

1. In Notion, create a new page called "**Meal Planning System**"
2. Add a database (type `/database` and select "Table - Inline")
3. Name it "**Recipes**"
4. Add the following properties (refer to [notion-schema.md](notion-schema.md) for details):

**Essential Properties:**
- Name (Title) - already exists
- Ingredients (Text)
- Instructions (Text)
- Servings (Number)

**Recommended Properties:**
- Prep Time (Number)
- Cook Time (Number)
- Cuisine (Select)
- Dietary Tags (Multi-select)
- Meal Type (Multi-select)

**Configure Select Options:**

For **Cuisine**:
- Italian
- Mexican
- Asian
- American
- Mediterranean
- Indian
- Other

For **Dietary Tags**:
- Vegetarian
- Vegan
- Gluten-Free
- Dairy-Free
- Nut-Free
- Low-Carb
- Keto

For **Meal Type**:
- Breakfast
- Lunch
- Dinner
- Snack
- Dessert

#### Create Meal Plan Database

1. In the same page, add another database
2. Name it "**Meal Plan**"
3. Add these properties:

**Essential Properties:**
- Name (Title) - already exists
- Date (Date)
- Meal Type (Select): breakfast, lunch, dinner, snack
- Recipe (Relation → Recipes database)
- Servings (Number)

**Recommended Properties:**
- Status (Select): Planned, Cooked, Skipped
- Notes (Text)

**Set up Relation:**
1. Click "+ Add a property" → "Relation"
2. Select your "Recipes" database
3. Name the property "Recipe"
4. Enable "Show on Recipes" if you want to see meal plans from recipe pages

**Create Calendar View:**
1. Click "+ Add a view" at the top
2. Select "Calendar"
3. Set "Date property" to your Date field
4. Customize properties shown on cards

### 2.3 Share Databases with Your Integration

For **each database** (Recipes and Meal Plan):
1. Click "**Share**" in the top right corner
2. Click "**Invite**"
3. Search for your integration name (e.g., "Claude Code Meal Planner")
4. Click "**Invite**"

⚠️ **Important:** If you forget this step, Claude Code won't be able to access your databases!

### 2.4 Get Database IDs

You'll need the database IDs for Claude Code to access them.

**Method 1: From URL**
1. Open your Recipes database as a full page
2. Look at the URL: `https://notion.so/[workspace]/[DATABASE_ID]?v=...`
3. Copy the DATABASE_ID (32-character string)
4. Repeat for Meal Plan database

**Method 2: Via API** (we'll do this with Claude Code later)

## Step 3: Configure Notion MCP Server

### 3.1 Install Notion MCP Server

```bash
claude mcp add --scope user notion npx -- -y @notionhq/notion-mcp-server
```

### 3.2 Add Your Notion Token

Edit your Claude Code configuration:
```bash
nano ~/.claude.json
```

Find the `mcpServers` section and update the `notion` server:
```json
"mcpServers": {
  "notion": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@notionhq/notion-mcp-server"],
    "env": {
      "NOTION_TOKEN": "your_token_here"
    }
  }
}
```

Replace `your_token_here` with your actual Notion integration token.

Save and exit (Ctrl+O, Enter, Ctrl+X).

### 3.3 Verify Installation

```bash
claude mcp list
```

You should see:
```
notion: npx -y @notionhq/notion-mcp-server - ✓ Connected
```

## Step 4: Add Sample Recipes (Optional)

To get started quickly, you can add some sample recipes:

```bash
claude
```

Then ask:
```
> Add a simple pasta recipe to my Notion Recipes database
> Add a chicken stir-fry recipe to my Recipes database
> Add a vegetarian chili recipe
```

Or manually add a few recipes through the Notion UI to test the system.

## Step 5: Test the System

### 5.1 Start Claude Code

```bash
cd notion-meal-planner
claude
```

### 5.2 Test Basic Functionality

Try these commands:

**List your recipes:**
```
> List all recipes in my Notion database
```

**Add to meal plan:**
```
> Add [recipe name] to my meal plan for tomorrow at dinner
```

**Generate shopping list:**
```
> Show me all the meals planned for this week
> Generate a shopping list for this week's meals
```

## Step 6: Customize (Optional)

### 6.1 Add Project-Specific Context

The `CLAUDE.md` file in this repository provides context to Claude Code. You can edit it to add:
- Your dietary preferences
- Favorite cuisines
- Shopping day (for automatic date ranges)
- Any other preferences

### 6.2 Create Custom Skills

Add custom Claude Code skills in `.claude/skills/` for repeated tasks:
- `plan-week.md` - Your personal weekly meal planning workflow
- `quick-add-recipe.md` - Streamlined recipe entry
- `shopping-day.md` - Generate list for your specific shopping day

## Troubleshooting

### MCP Server Not Connecting

**Problem:** `claude mcp list` shows notion as disconnected

**Solutions:**
1. Check your Notion token is correct in `~/.claude.json`
2. Ensure Node.js is installed: `node --version`
3. Try reinstalling:
   ```bash
   claude mcp remove notion -s user
   claude mcp add --scope user notion npx -- -y @notionhq/notion-mcp-server
   ```

### Can't Access Databases

**Problem:** Claude Code says it can't find your databases

**Solutions:**
1. Verify you shared the databases with your integration (Step 2.3)
2. Check the integration has the right permissions
3. Make sure you're using the correct workspace

### Ingredient Parsing Issues

**Problem:** Shopping lists have incorrect quantities

**Solutions:**
1. Use consistent ingredient formatting (see [notion-schema.md](notion-schema.md))
2. Include units in ingredient lists
3. One ingredient per line in the Ingredients field

### Permission Errors

**Problem:** "Integration does not have access"

**Solutions:**
1. Go to each database in Notion
2. Click Share → Add your integration
3. Make sure it shows in the "Shared with" list

## Getting Help

- **Documentation:** Check [docs/usage-guide.md](usage-guide.md) for more examples
- **Notion Schema:** See [docs/notion-schema.md](notion-schema.md) for database details
- **GitHub Issues:** Report problems at the repository issues page
- **Claude Code Docs:** https://code.claude.com/docs

## Next Steps

Now that you're set up:
1. Add your favorite recipes to the Recipes database
2. Plan next week's meals
3. Generate your first shopping list
4. Customize the system to fit your workflow

Enjoy your intelligent meal planning! 🍳
