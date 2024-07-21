import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pkg from '@eslint/js';
import tsEslintPlugin from 'typescript-eslint';
import vueEslint from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

const { configs: eslintConfigs } = pkg;

export default withNuxt([
	eslintPluginPrettierRecommended,
	eslintConfigs.recommended,
	tsEslintPlugin.configs.recommended[2],
	vueEslint.configs.flat,
	{
		files: ['*.ts', '*.tsx'],
		rules: {
			'no-undef': 'off',
		},
	},
	{
		files: ['*.vue'],
		rules: {
			'no-undef': 'off',
		},
	},
	{
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsEslintPlugin.parser,
				sourceType: 'module',
				ecmaVersion: 2020,
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			'vue/func-call-spacing': ['error', 'never'],
			'vue/no-v-model-argument': 'off',
			'vue/attribute-hyphenation': ['error', 'always'],
			'vue/no-deprecated-dollar-listeners-api': 'off',
			'vue/no-lone-template': 'off',
			'vue/attributes-order': [
				'warn',
				{
					order: [
						'DEFINITION',
						'CONDITIONALS',
						'TWO_WAY_BINDING',
						'SLOT',
						'RENDER_MODIFIERS',
						'OTHER_DIRECTIVES',
						'LIST_RENDERING',
						'UNIQUE',
						'GLOBAL',
						'OTHER_ATTR',
						'EVENTS',
						'CONTENT',
					],
					alphabetical: false,
				},
			],
			'vue/html-indent': ['error', 'tab'],
			'vue/max-len': [
				'warn',
				{
					code: 160,
					template: 160,
					ignoreUrls: true,
					ignoreRegExpLiterals: true,
					ignoreStrings: true,
					ignoreComments: true,
				},
			],
			'vue/component-name-in-template-casing': [
				'error',
				'kebab-case',
				{ registeredComponentsOnly: false },
			],
			'vue/block-tag-newline': 'error',
			'vue/define-emits-declaration': ['error', 'type-based'],
			'vue/define-macros-order': [
				'error',
				{
					order: ['defineProps', 'defineEmits'],
					defineExposeLast: false,
				},
			],
			'vue/define-props-declaration': ['error', 'type-based'],
			'vue/no-ref-object-reactivity-loss': 'error',
			'vue/no-useless-v-bind': 'error',
			'vue/prefer-define-options': 'error',
			curly: 'error',
			'comma-dangle': [
				'error',
				{
					arrays: 'always-multiline',
					objects: 'always-multiline',
					imports: 'always-multiline',
					exports: 'always-multiline',
					functions: 'ignore',
				},
			],
			eqeqeq: ['error', 'always'],
			'linebreak-style': ['error', 'unix'],
			'no-console': [
				'error',
				{ allow: ['warn', 'error', 'time', 'info', 'timeEnd'] },
			],
			'no-new': 'error',
			'no-var': 'error',
			'no-empty': ['error', { allowEmptyCatch: true }],
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
			'no-prototype-builtins': 'error',
			indent: 'off',
			quotes: 'off',
			'@typescript-eslint/quotes': ['error', 'single'],
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					useTabs: true,
					tabWidth: 2,
				},
			],
			semi: 'off',
			'@typescript-eslint/semi': ['error', 'always'],
			'brace-style': 'off',
			'@typescript-eslint/brace-style': 'error',
			'space-infix-ops': 'off',
			'@typescript-eslint/space-infix-ops': 'error',
			'key-spacing': 'off',
			'@typescript-eslint/key-spacing': ['error', { mode: 'strict' }],
			'keyword-spacing': 'off',
			'@typescript-eslint/keyword-spacing': ['error', { before: true }],
			'object-curly-spacing': 'off',
			'@typescript-eslint/object-curly-spacing': ['error', 'always'],
			'padding-line-between-statements': 'off',
			'@typescript-eslint/padding-line-between-statements': [
				'error',
				{ blankLine: 'never', prev: 'import', next: 'import' },
				{ blankLine: 'always', prev: '*', next: ['return', 'function'] },
				{ blankLine: 'always', prev: 'function', next: '*' },
			],
			'space-before-blocks': 'off',
			'@typescript-eslint/space-before-blocks': 'error',
			'space-before-function-paren': 'off',
			'@typescript-eslint/space-before-function-paren': [
				'error',
				{
					anonymous: 'always',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-empty-function': [
				'error',
				{ allow: ['constructors'] },
			],
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'vue/multi-word-component-names': 'off',
			'vue/attributes-order': 'error',
			'vue/html-indent': ['error', 'tab'],
			'vue/max-len': [
				'error',
				{
					code: 120,
					template: 120,
					ignoreUrls: true,
					ignoreRegExpLiterals: true,
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
					ignoreHTMLAttributeValues: true,
				},
			],
			'vue/padding-line-between-blocks': ['error', 'always'],
			'vue/singleline-html-element-content-newline': ['off'],
			'vue/html-self-closing': [
				'error',
				{
					html: {
						void: 'always',
						normal: 'always',
						component: 'always',
					},
				},
			],
			'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
			'vue/block-lang': [
				'error',
				{
					script: {
						lang: 'ts',
					},
				},
			],
		},
	},
	{
		ignores: [
			'eslint.config.mjs',
			'nuxt.config.ts',
			'svgFontGenerator.js',
			'tsconfig.json',
		],
	},
]);
