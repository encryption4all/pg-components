<script lang="ts">
    import type { AttributeType } from './consts';
    import { tick } from 'svelte';

    let element;

    export let focused: boolean = false;
    export let value: string;
    export let typ: AttributeType;

    const onfocus = () => (focused = true);
    const onblur = () => (focused = false);

    export async function focus() {
        await tick();
        element.focus();
    }
</script>

{#if typ?.options}
    <select bind:this={element} on:focus={onfocus} on:blur={onblur} bind:value required>
        {#each typ.options as option}
            <option>{option}</option>
        {/each}
    </select>
{:else if typ?.type === 'string'}
    <input
        bind:this={element}
        on:focus={onfocus}
        on:blur={onblur}
        bind:value
        required
        size={value?.length ? value.length - 3 : typ?.placeholder ? typ.placeholder.length : 5}
        placeholder={typ?.placeholder ? typ.placeholder : ''}
    />
{:else if typ?.type === 'boolean'}
    <select bind:this={element} on:focus={onfocus} on:blur={onblur} bind:value required>
        <option>Yes</option>
        <option>No</option>
    </select>
{/if}

<style lang="scss">
    input,
    select {
        line-height: 17px;
        border: 0px solid black;
        border-left: 0;
        border-right: 0;
        padding: 3px;
        font-size: 12px;
        background-color: var(--pg-white);
        color: black;
    }

    input {
        min-width: 30px;
    }
</style>
