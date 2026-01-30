import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], 
    ignores:["webpack.config.js"],
    languageOptions: { 
      globals: globals.browser,
      sourceType:"module", 
    },
    rules:{
      ...js.configs.recommended.rules,
    }, 
  },

  {
    files:["webpack.config.js"],
    languageOptions:{
      globals:globals.node,
      sourceType:"commonjs",
    },
    rules:{
      ...js.configs.recommended.rules,
    },
  },
]);
