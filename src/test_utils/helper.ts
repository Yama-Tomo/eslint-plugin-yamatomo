import { TSESLint } from '@typescript-eslint/experimental-utils';

const testerConfig: TSESLint.RuleTesterConfig = {
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};

export { testerConfig };
