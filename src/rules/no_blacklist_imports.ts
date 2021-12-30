import { TSESLint } from '@typescript-eslint/experimental-utils';
import { TSESTree } from '@typescript-eslint/types';
import { AST_NODE_TYPES, Identifier } from '@typescript-eslint/types/dist/ast-spec';
import minimatch from 'minimatch';

const ruleName = 'no-blacklist-imports' as const;
const optionFields = ['paths', 'blacklists'] as const;

type Options = Record<typeof optionFields[number], string[]>;
const rule: TSESLint.RuleModule<typeof ruleName, Array<Options[]>> = {
  meta: {
    docs: {
      description: 'Prevent disallowed module imports',
      recommended: 'error',
    },
    messages: {
      [ruleName]: "Import of '{{moduleName}}' is disallowed",
    },
    schema: [
      {
        type: 'array',
        items: {
          type: 'object',
          properties: optionFields.reduce((result, item) => {
            return { ...result, [item]: { type: 'array', items: { type: 'string' } } };
          }, {}),
          required: optionFields,
          additionalProperties: false,
        },
      },
    ],
    type: 'suggestion',
  },
  create(context): TSESLint.RuleListener {
    const filename = context.getFilename();
    const checkList = (context.options[0] || []).filter(
      (item) => !!item.paths.find((pathPattern) => minimatch(filename, pathPattern))
    );
    const isSkipLinting = !checkList.length;
    if (isSkipLinting) {
      return {};
    }

    function check(node: TSESTree.Node | TSESTree.Token, moduleName: string) {
      checkList.forEach((item) => {
        item.blacklists.forEach((blacklistPattern) => {
          if (minimatch(moduleName, blacklistPattern)) {
            context.report({ node, messageId: ruleName, data: { moduleName } });
          }
        });
      });
    }

    return {
      ImportDeclaration(node) {
        const moduleName = node.source.value;
        check(node, moduleName);
      },
      VariableDeclaration(node) {
        node.declarations.forEach((item) => {
          if (
            item.init?.type === AST_NODE_TYPES.CallExpression &&
            item.init.callee.type === AST_NODE_TYPES.Identifier &&
            item.init.callee.name === 'require'
          ) {
            const moduleName = (item.id as Identifier).name;
            check(node, moduleName);
          }
        });
      },
    };
  },
};

export default { rule, ruleName };
