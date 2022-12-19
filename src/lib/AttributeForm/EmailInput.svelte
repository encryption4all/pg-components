<script lang="ts">
    import { onMount } from 'svelte';

    export let value = '';

    let element;
    onMount(() => element.focus());
</script>

<input
    required
    type="email"
    autocomplete="email"
    placeholder=""
    size={value ? value.length : 15}
    bind:value
    bind:this={element}
/>

<style lang="scss">
    input {
        line-height: 17px;
        border: 0px solid black;
        border-left: 0;
        border-right: 0;
        padding: 3px;
        font-size: 12px;
        background-color: var(--pg-white);
        color: black;
    }
</style>
