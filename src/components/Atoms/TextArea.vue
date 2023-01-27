<script>
export default {
  props: {
    value: String,
    label: String,
    typeInput: String,
    placeholder: String,
  },
};
</script>

<template>
  <div class="w-full px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="grid-first-name"
    >
      {{ label }}
    </label>
    <textarea
      required
      @input="$emit('on-input', $event.target.value)"
      class="appearance-none h-72 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      v-bind:type="typeInput"
      v-bind:placeholder="placeholder"
    />
  </div>
</template>
