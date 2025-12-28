#!/usr/bin/env node

// Test to see what the MCP API expects
const parent = {
  "database_id": "fa0b5578-990c-446d-8d17-279adee8324e"
};

const properties = {
  "Name": {
    "title": [
      {
        "text": {
          "content": "Classic Spaghetti Carbonara"
        }
      }
    ],
    "type": "title"
  }
};

console.log("Parent object:");
console.log(JSON.stringify(parent, null, 2));
console.log("\nProperties object:");
console.log(JSON.stringify(properties, null, 2));
