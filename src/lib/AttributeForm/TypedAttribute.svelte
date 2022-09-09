<script lang="ts">
    import type { AttributeType } from './consts';
    import './../../app.css';

    export let value: string;
    export let typ: AttributeType;
</script>

{#if typ?.options}
    <select bind:value required>
        {#each typ.options as option}
            <option>{option}</option>
        {/each}
    </select>
{:else if typ?.type === 'string'}
    <span contenteditable="true" bind:textContent={value} />
{:else if typ?.type === 'boolean'}
    <select bind:value required>
        <option>Yes</option>
        <option>No</option>
    </select>
{/if}

<style lang="scss">
    span,
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

    span {
        min-width: 30px;
    }
</style>
