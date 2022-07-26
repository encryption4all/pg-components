<script lang="ts" context="module">
    export type Policy = { [key: string]: AttributeCon };
    type PolicyList = { id: string; con: AttributeCon }[];
    type AttributeCon = AttributeRequest[];
    type AttributeRequest = {
        t: string;
        v: string;
    };
</script>

<script lang="ts">
    import './i18n';
    import { ALLOWED_ATTRIBUTE_TYPES } from './consts';
    import type { AttributeType } from './consts';
    import { _, isLoading } from 'svelte-i18n';
    import TypedAttribute from './TypedAttribute.svelte';

    export let initialPolicy: Policy = {};
    export let onSubmit: (policy: Policy) => Promise<void>;

    let policy: PolicyList = [];
    $: policy = policy.length
        ? policy
        : Object.entries(initialPolicy).reduce(
              (total, [id, con]) => [{ id, con }, ...total],
              [] as PolicyList
          );

    // Helper function to get the more information of the type in an AttributeRequest.
    function typeOf(ar: AttributeRequest): AttributeType | undefined {
        for (const [, groupList] of Object.entries(ALLOWED_ATTRIBUTE_TYPES)) {
            for (const typ of groupList) {
                if (ar.t === typ.ident) return typ;
            }
        }
    }

    const handleSubmit = async () => {
        const res: { [key: string]: AttributeCon } = {};
        for (const { id, con } of policy) {
            res[id] = con;
        }
        await onSubmit(res);
    };

    const addRecipient = () => {
        policy.push({ id: '', con: [] });
        policy = policy;
    };

    const deleteRecipient = (i: number) => {
        policy.splice(i, 1);
        policy = policy;
    };

    const addAttribute = (i: number) => {
        policy[i].con.push({ t: '', v: '' });
        policy = policy;
    };

    const removeAttribute = (i: number, j: number) => {
        policy[i].con.splice(j, 1);
        policy = policy;
    };
</script>

{#if $isLoading}
    Loading...
{:else}
    <form on:submit|preventDefault={handleSubmit}>
        {#each policy as { con }, i}
            <div id="attribute-row">
                <input
                    bind:value={policy[i].id}
                    type="email"
                    size="25"
                    placeholder="Add a recipient"
                    required
                />
                <button class="small" on:click|preventDefault={() => deleteRecipient(i)}>-</button>
                <div id="attribute-con">
                    {#each con as ar, j}
                        {@const typ = typeOf(ar)}
                        <div id="attribute-request">
                            <select
                                bind:value={policy[i].con[j].t}
                                on:change={() => (policy[i].con[j].v = '')}
                                required
                            >
                                {#each Object.entries(ALLOWED_ATTRIBUTE_TYPES) as [group, types]}
                                    {@const filtered = types.filter(
                                        ({ ident }) =>
                                            !con.some(({ t }) => ident === t) || ar.t === ident
                                    )}
                                    <option value="" disabled selected hidden>Please choose</option
                                    ><optgroup label={$_(`groupTypes.${group}`)} />
                                    {#each filtered as { ident }}
                                        <option
                                            required
                                            value={ident}
                                            label={$_(`attributeTypes.${ident}`)}
                                        />
                                    {/each}
                                {/each}
                            </select>
                            <TypedAttribute bind:value={policy[i].con[j].v} {typ} />
                            <button
                                class="small"
                                on:click|preventDefault={() => removeAttribute(i, j)}>-</button
                            >
                        </div>
                    {/each}
                    <button class="small" on:click|preventDefault={() => addAttribute(i)}>+</button>
                </div>
            </div>
        {/each}
        <button on:click|preventDefault={addRecipient}>Add recipient</button>
        <button type="submit">Submit</button>
    </form>
{/if}

<style type="postcss">
    :global(input:not([type='email']), select) {
        width: 150px;
        height: 25px;
        box-sizing: border-box;
    }

    form {
        width: auto;
    }

    button.small {
        height: 25px;
        width: 25px;
    }

    #attribute-row {
        position: relative;
        display: flex;
        align-items: center;
        padding-bottom: 15px;
    }

    #attribute-con {
        display: flex;
        flex-direction: column;
    }

    #attribute-request {
        display: flex;
        flex-direction: row;
    }
</style>
