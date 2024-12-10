<template>
	<component :is="node.tag" v-bind="node.attrs">
		<template v-if="node.children && node.children.length">
			<markdown-node
				v-for="(child, index) in node.children"
				:key="index"
				:node="child"
			/>
		</template>
		<template v-else>
			{{ node.content }}
		</template>
	</component>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
//eslint-disable-next-line
import MarkdownNode from './MarkdownNode.vue'; // Импортируйте сам себя для рекурсии

interface Node {
	tag: string;
	attrs?: Record<string, string>;
	children?: Node[];
	content?: string;
}

const props = defineProps<{
	node: Node;
}>();
</script>
