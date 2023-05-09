<script lang="ts">
    import { tick, onMount } from 'svelte'

    import '$lib/app.css'

    let element: HTMLElement

    export let focused: boolean = false
    export let value: string
    export let typ: AttributeType

    const onfocus = () => (focused = true)
    const onblur = () => (focused = false)

    let inputProps = {}

    $: if (typ) inputProps = {}
    $: if (typ?.pattern) inputProps.pattern = typ.pattern
    $: if (typ?.placeholder) inputProps.placeholder = typ.placeholder
    $: if (typ?.ident.endsWith('mobilenumber')) inputProps.type = 'tel'

    $: inputSize = value?.length
        ? value.length * 0.8 + 1
        : typ?.placeholder
        ? typ.placeholder.length * 0.8 + 1
        : 10

    onMount(() => element.focus())
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
        border: 0px solid black;
        background-color: var(--pg-white);
        &:focus {
            outline: none;
        }
    }

    input {
        height: 100%;
    }
</style>
