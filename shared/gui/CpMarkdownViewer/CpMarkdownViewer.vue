<template>
	<div>
		<markdown-node
			v-for="(node, index) in renderMarkdown()"
			:key="index"
			:node="node"
		/>
	</div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import { ref } from 'vue';
import MarkdownNode from './MarkdownNode.vue';

interface Node {
	tag: string;
	attrs?: Record<string, string>;
	children?: Node[];
	content?: string;
}

const props = defineProps<{
	markdownText: string;
}>();

const md = new MarkdownIt();

// Используйте переданный текст или дефолтный
const text = ref(
	props.markdownText ||
		`# Заголовок

Это абзац с [ссылкой](https://example.com) и **жирным текстом**.

- Элемент списка
- Ещё элемент списка

1. Нумерованный элемент
2. Ещё нумерованный элемент

> Это цитата
`
);

function renderMarkdown(): Node[] {
	const tokens = md.parse(props.markdownText, {});
	const nodes: Node[] = [];
	const stack: Node[] = [];

	tokens.forEach((token) => {
		if (token.type.endsWith('_open')) {
			const node: Node = {
				tag: token.tag,
				attrs: token.attrs ? Object.fromEntries(token.attrs) : {},
				children: [],
			};
			if (stack.length > 0) {
				const parent = stack[stack.length - 1];
				parent.children = parent.children || [];
				parent.children.push(node);
			} else {
				nodes.push(node);
			}
			stack.push(node);
		} else if (token.type === 'inline') {
			const parent = stack[stack.length - 1];
			token.children?.forEach((childToken) => {
				if (childToken.type === 'text') {
					parent.children!.push({
						tag: 'span',
						content: childToken.content,
					});
				} else if (childToken.type === 'strong_open') {
					const strongNode: Node = {
						tag: 'strong',
						children: [],
					};
					parent.children!.push(strongNode);
					stack.push(strongNode);
				} else if (childToken.type === 'strong_close') {
					stack.pop();
				} else if (childToken.type === 'em_open') {
					const emNode: Node = {
						tag: 'em',
						children: [],
					};
					parent.children!.push(emNode);
					stack.push(emNode);
				} else if (childToken.type === 'em_close') {
					stack.pop();
				} else if (childToken.type === 'link_open') {
					const linkNode: Node = {
						tag: 'a',
						attrs: Object.fromEntries(childToken.attrs || []),
						children: [],
					};
					parent.children!.push(linkNode);
					stack.push(linkNode);
				} else if (childToken.type === 'link_close') {
					stack.pop();
				} else if (childToken.type === 'image') {
					// childToken.attrs содержит среди прочего src, alt, title
					const imageAttrs = Object.fromEntries(childToken.attrs || []);
					const imageNode: Node = {
						tag: 'img',
						attrs: {
							src: imageAttrs.src || '',
							alt: imageAttrs.alt || '',
							title: imageAttrs.title || '',
						},
					};
					parent.children!.push(imageNode);
				}

				// Добавьте обработку других типов токенов по необходимости
			});
		} else if (token.type.endsWith('_close')) {
			stack.pop();
		}
	});

	return nodes;
}
</script>
