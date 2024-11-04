<template>
	<div>
		<component
			:is="node.tag"
			v-for="(node, index) in renderMarkdown()"
			:key="index"
			v-bind="node.attrs"
		>
			<template v-if="node.children">
				<component
					:is="child.tag"
					v-for="(child, childIndex) in node.children"
					:key="childIndex"
					v-bind="child.attrs"
				>
					{{ child.content }}
				</component>
			</template>
			<template v-else>
				{{ node.content }}
			</template>
		</component>
	</div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';

type Props = { markdownText: string };

const props = defineProps<Props>();

const md = new MarkdownIt();

const text = ref(`# Заголовок

Это абзац с [ссылкой](https://example.com) и **жирным текстом**.

- Элемент списка
- Ещё элемент списка

1. Нумерованный элемент
2. Ещё нумерованный элемент

> Это цитата
`);

function renderMarkdown() {
	const tokens = md.parse(props.markdownText, {});
	const nodes: { tag: string; attrs: any; children: any }[] = [];
	let currentNode: { tag: string; attrs: any; children: any } | null = null;

	tokens.forEach((token: any) => {
		switch (token.type) {
			case 'heading_open':
			case 'paragraph_open':
			case 'blockquote_open':
			case 'list_item_open':
			case 'ordered_list_open':
			case 'bullet_list_open':
				currentNode = {
					tag: token.tag,
					attrs: token.attrs ? Object.fromEntries(token.attrs) : {},
					children: [],
				};
				nodes.push(currentNode);
				break;

			case 'inline':
				token.children?.forEach((childToken: any) => {
					if (childToken.type === 'text') {
						currentNode?.children.push({
							tag: 'span',
							content: childToken.content,
						});
					} else if (childToken.type === 'strong_open') {
						currentNode?.children.push({
							tag: 'strong',
							content: '',
						});
					} else if (childToken.type === 'link_open') {
						const link = {
							tag: 'a',
							attrs: Object.fromEntries(childToken.attrs || []),
							children: [],
						};
						currentNode?.children.push(link);
						currentNode = link; // переключаемся на вложенный узел для ссылок
					} else if (childToken.type === 'link_close') {
						currentNode = nodes[nodes.length - 1]; // возвращаемся к родителю после ссылки
					}
				});
				break;

			case 'heading_close':
			case 'paragraph_close':
			case 'blockquote_close':
			case 'list_item_close':
			case 'ordered_list_close':
			case 'bullet_list_close':
				currentNode = null;
				break;
		}
	});

	return nodes;
}
</script>
