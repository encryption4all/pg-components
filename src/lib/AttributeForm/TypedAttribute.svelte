<script lang="ts">
    import type { AttributeType } from './consts';

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
    <input required bind:value />
{:else if typ?.type === 'boolean'}
    <label for="yes">Yes</label>
    <input bind:group={value} required id="yes" type="radio" value="Yes" />
    <label for="no">No</label>
    <input required bind:group={value} id="no" type="radio" value="No" />
{/if}

<style>
    input[type='radio'] {
        width: 50px;
    }
</style>
