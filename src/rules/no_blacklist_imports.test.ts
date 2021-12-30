import { TSESLint } from '@typescript-eslint/experimental-utils';

import { testerConfig } from '../test_utils/helper';
import Rule from './no_blacklist_imports';

const options = [[{ paths: ['**/src/**/!(Ignore).ts{,x}'], blacklists: ['react', 'webpack'] }]];

new TSESLint.RuleTester(testerConfig).run(Rule.ruleName, Rule.rule, {
  valid: [
    {
      name: 'No blacklist import',
      filename: '/path/src/libs/test.ts',
      code: ` 
import * as qs from 'qs';

const a: string = "aaa";
`,
      options,
    },
    {
      name: 'Excluded files allow blacklist import',
      filename: '/path/src/components/Ignore.tsx',
      code: `
import React from 'react';
import * as qs from 'qs';

const webpack = require('webpack');
const a: string = "aaa";
`,
      options,
    },
  ],
  invalid: [
    {
      name: 'detect blacklist imports',
      filename: '/path/src/components/A.tsx',
      code: `
import React from 'react';
import * as qs from 'qs';

const webpack = require('webpack');
const a: string = "aaa";
`,
      options,
      errors: [
        { messageId: Rule.ruleName, data: { moduleName: 'react' } },
        { messageId: Rule.ruleName, data: { moduleName: 'webpack' } },
      ],
    },
  ],
});
