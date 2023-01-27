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
  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      {{ label }}
    </label>
    <input
      required
      @input="$emit('on-input', $event.target.value)"
      class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      v-bind:type="typeInput"
      v-bind:placeholder="placeholder"
    />
  </div>
</template>
