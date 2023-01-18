<script lang="ts">
    import type { AttributeType } from './consts';
    import { tick, onMount } from 'svelte';

    import '../app.css';

    let element;

    export let focused: boolean = false;
    export let value: string;
    export let typ: AttributeType;

    const onfocus = () => (focused = true);
    const onblur = () => (focused = false);

    let inputProps = {};

    $: if (typ) inputProps = {};
    $: if (typ?.pattern) inputProps.pattern = typ.pattern;
    $: if (typ?.placeholder) inputProps.placeholder = typ.placeholder;
    $: if (typ?.ident.endsWith('mobilenumber')) inputProps.type = 'tel';

    $: inputSize = value?.length ? value.length : typ?.placeholder ? typ.placeholder.length : 5;

    onMount(() => element.focus());
</script>

{#if typ?.options}
    <select bind:this={element} on:blur={onblur} bind:value required>
        {#each typ.options as option}
            <option>{option}</option>
        {/each}
    </select>
{:else if typ?.type === 'string'}
    <input
        bind:this={element}
        on:blur={onblur}
        bind:value
        required
        size={inputSize}
        {...inputProps}
    />
{:else if typ?.type === 'boolean'}
    <select bind:this={element} on:blur={onblur} bind:value required>
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
        background-color: var(--pg-white);
        color: black;
        &:focus {
            outline: none;
        }
    }

    input {
        min-width: 30px;
    }
</style>
