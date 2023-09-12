<template>
  <div :id="name"></div>
</template>

<script>
import { MarkDown } from '../utils/markdown';
import '../utils/markdown.css'

export default {
	name: 'MarkDownEditor',
	props: {
		name: {
			type: String,
			required: true,
		}
	},
	data() {
		return {
			editor: null,
		}
	},
	mounted() {
		this.editor = new MarkDown({
			id: this.name,
		})

		this.editor.init()
	},
}
</script>
