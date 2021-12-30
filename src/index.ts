import { TSESLint } from '@typescript-eslint/experimental-utils';

import NoBlacklistImports from './rules/no_blacklist_imports';

export = {
  rules: [NoBlacklistImports].reduce(
    (rules, item) => ({ ...rules, [item.ruleName]: item.rule }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {} as Record<string, TSESLint.RuleModule<any>>
  ),
  configs: {
    base: {
      plugins: ['@yamatomo'],
    },
  },
};
