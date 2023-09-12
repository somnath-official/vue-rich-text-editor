<template>
  <MarkDownEditor class="md-editor" name="test"/>
</template>

<script>
import MarkDownEditor from './components/MarkDownEditor.vue';

export default {
  components: { MarkDownEditor }
}
</script>

<style scoped>
.md-editor {
  border: 1px solid rgb(177, 177, 177);
  margin: auto;
}
</style>