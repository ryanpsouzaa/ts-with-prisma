import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.node },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Aqui você "mata" o erro do any
      '@typescript-eslint/no-explicit-any': 'off',
      // Aproveitando: se o ESLint reclamar de variáveis não usadas (comum em SOLID)
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
);
