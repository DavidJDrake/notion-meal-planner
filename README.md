# Notion Meal Planner

An intelligent meal planning system that combines Notion databases for persistent storage with Claude Code for smart meal planning, ingredient aggregation, and shopping list generation.

## Overview

This system uses:
- **Notion** - Data storage (recipes, meal plans)
- **Claude Code** - Intelligent interface with natural language commands
- **Notion MCP Server** - Integration layer

## Features

- 📅 **Weekly Meal Planning** - Plan your meals with natural language
- 🛒 **Smart Shopping Lists** - Automatically aggregate and combine ingredients
- 🔢 **Quantity Math** - Intelligent ingredient quantity calculation and unit conversion
- 📊 **Recipe Scaling** - Adjust recipes for different serving sizes
- 🔄 **Reusable Recipes** - Build a library of recipes to use repeatedly
- 🏷️ **Categorization** - Tag recipes by cuisine, dietary restrictions, etc.

## Quick Start

### Prerequisites

1. **Notion Account** with API access
2. **Claude Code** installed
3. **Notion MCP Server** configured

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/DavidJDrake/notion-meal-planner.git
   cd notion-meal-planner
   ```

2. Follow the setup guide in [docs/setup.md](docs/setup.md) to:
   - Create the required Notion databases
   - Configure the Notion MCP server
   - Import starter recipes (optional)

3. Start using Claude Code with natural language:
   ```bash
   claude
   ```

## Usage Examples

```
> Plan this week's dinners - I want variety and 2 vegetarian meals
> Generate my shopping list for the week
> Add salmon recipe for Tuesday dinner
> Scale the lasagna recipe to serve 8 people
> What recipes use chicken breast?
```

## Project Structure

```
notion-meal-planner/
├── .claude/
│   └── skills/          # Claude Code skills for meal planning
├── docs/
│   ├── setup.md         # Setup instructions
│   ├── notion-schema.md # Notion database schemas
│   └── usage-guide.md   # Detailed usage examples
├── examples/
│   └── recipes/         # Sample recipes in JSON format
└── README.md
```

## Notion Database Structure

This system uses three main Notion databases:

1. **Recipes** - Your recipe library
2. **Meal Plan** - Calendar of planned meals
3. **Ingredients** - Ingredient reference (optional)

See [docs/notion-schema.md](docs/notion-schema.md) for detailed database schemas.

## Claude Code Skills

Custom skills in `.claude/skills/`:
- `plan-meals.md` - Create weekly meal plans
- `generate-shopping-list.md` - Aggregate ingredients and create shopping lists
- `add-recipe.md` - Add new recipes to Notion
- `scale-recipe.md` - Adjust recipe servings

## How It Works

1. **Data Storage**: Recipes and meal plans are stored in Notion databases
2. **Intelligent Processing**: Claude Code reads from Notion, performs smart operations (quantity math, unit conversion, aggregation)
3. **Natural Interface**: Interact with your meal plan using plain English
4. **Persistence**: All data remains in Notion, accessible from anywhere

## Advantages Over Notion-Only Approach

- ✅ Natural language interface
- ✅ Smart ingredient quantity math (e.g., "2 cups + 1.5 cups = 3.5 cups")
- ✅ Unit conversion and normalization
- ✅ Intelligent recipe suggestions
- ✅ Automated shopping list generation
- ✅ Recipe scaling calculations

## Contributing

Contributions welcome! Feel free to:
- Add sample recipes to `examples/recipes/`
- Improve Claude Code skills
- Enhance documentation
- Share your workflow improvements

## License

MIT License - feel free to use and modify for your own meal planning needs.

## Acknowledgments

Built with:
- [Claude Code](https://claude.ai/code)
- [Notion API](https://developers.notion.com/)
- [Notion MCP Server](https://github.com/makenotion/notion-mcp-server)
