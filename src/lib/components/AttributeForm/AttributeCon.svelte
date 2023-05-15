<script lang="ts">
    import { ALLOWED_ATTRIBUTE_TYPES } from './consts'
    import AttributeValue from './AttributeValue.svelte'
    import { _ } from 'svelte-i18n'
    import { getContext } from 'svelte'
    import AttributeRequest from './AttributeRequest.svelte'

    export let i: number

    const { policy, signing } = getContext('store')

    $: con = $policy[i].con

    $: possibleChoices = Object.entries(ALLOWED_ATTRIBUTE_TYPES).flatMap(([group, types]) => {
        return types.filter(({ ident }) => !con.some(({ t }) => ident === t))
    })

    const addAttribute = (t: AttributeRequest) => {
        policy.update((p: PolicyListItem[]) => {
            p[i].con.push({ t, v: '', focused: true })
            return p
        })
    }

    const removeAttribute = (j: number) => {
        policy.update((p: PolicyListItem[]) => {
            p[i].con = p[i].con.filter((item, idx) => idx !== j)
            return p
        })
    }

    // Helper function to get the more information of the type in an AttributeRequest.
    function typeOf(ar: AttributeRequest): AttributeType | undefined {
        for (const [, groupList] of Object.entries(ALLOWED_ATTRIBUTE_TYPES)) {
            for (const typ of groupList) {
                if (ar.t === typ.ident) return typ
            }
        }
    }
</script>

<div id="attribute-con">
    {#each con as ar, j}
        {@const typ = typeOf(ar)}
        <AttributeRequest removable={true} onRemove={() => removeAttribute(j)}>
            <select
                id="attribute-request"
                slot="type"
                bind:value={ar.t}
                on:change={() => {
                    ar.v = ''
                    ar.focused = false
                    console.log('selected: ', ar.t)
                }}
                on:focus={() => (ar.focused = true)}
                style={typ?.img
                    ? `background-image: url("${typ.img}"); padding-left: ${
                          ar.focused ? '2.25em' : '1.75em'
                      }`
                    : ''}
            >
                {#each possibleChoices as { ident }}
                    <option value={ident} label={ar.focused ? $_(`attributeTypes.${ident}`) : ''} />
                {/each}
            </select>
            <AttributeValue slot="value" bind:value={ar.v} bind:focused={ar.focused} {typ} />
        </AttributeRequest>
    {/each}
    {#if possibleChoices.length > 0}
        <select
            id="add-recipient-data"
            class="round-btn"
            required
            on:change={(event) => {
                addAttribute(event.target.value)
                event.target.value = 'none'
            }}
        >
            <option value="none" disabled selected hidden
                >{$_(`addAttribute${signing ? 'Sign' : ''}`)}</option
            >
            {#each possibleChoices as { ident }}
                <option required value={ident} label={$_(`attributeTypes.${ident}`)} />
            {/each}
        </select>
    {/if}
</div>

<style lang="scss">
    #attribute-con {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
    }

    select#attribute-request {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;

        background-color: var(--pg-blue);
        color: var(--pg-white);
        border: 0px solid black;
        width: 3em;

        background-repeat: no-repeat;
        background-position: left 8px top 50%;
        background-size: 20px 20px;
    }

    select#add-recipient-data {
        border-right: 10px solid transparent;
        padding-right: 0px;
    }
</style>
