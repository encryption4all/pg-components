<script lang="ts" context="module">
    export type Policy = { [key: string]: AttributeCon };
    type PolicyList = { id: string; con: AttributeCon }[];
    type AttributeCon = AttributeRequest[];
    type AttributeRequest = {
        t: string;
        v: string;
        focused: boolean;
        input: any;
    };
</script>

<script lang="ts">
    import './i18n';
    import { ALLOWED_ATTRIBUTE_TYPES } from './consts';
    import type { AttributeType } from './consts';
    import { _, isLoading } from 'svelte-i18n';
    import TypedAttributeValue from './TypedAttributeValue.svelte';
    import './../../app.css';
    import { fade, fly } from 'svelte/transition';

    export let initialPolicy: Policy = {};
    export let onSubmit: (policy: Policy) => Promise<void>;
    export let submitButton: boolean = false;

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
            res[id] = [{ t: 'pbdf.sidn-pbdf.email.email', v: id }, ...con];
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
        policy[i].con.push({ t: '', v: '', focused: true });
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
        <div class="attribute-row" id="instruction">{$_('instruction')}</div>
        {#each policy as { con }, i}
            <div class="attribute-row">
                <div id="recipient">
                    <div class="left-border">
                        <img src="images/envelope.svg" alt="email icon" />
                    </div>
                    <input
                        required
                        type="email"
                        autocomplete="email"
                        placeholder=""
                        size={policy[i].id ? policy[i].id.length - 3 : 15}
                        class="right-border"
                        bind:value={policy[i].id}
                    />
                </div>
                <div id="attribute-con">
                    {#each con as ar, j}
                        {@const typ = typeOf(ar)}
                        <div id="attribute-request" transition:fade>
                            <select
                                required
                                bind:value={ar.t}
                                on:change={() => {
                                    ar.v = '';
                                    ar.input.focus();
                                }}
                                on:focus={() => (ar.focused = true)}
                                style={typ?.img
                                    ? `background-image: url("images/${typ.img}"); padding-left: ${
                                          ar.focused ? '25px' : '20px'
                                      }`
                                    : ''}
                            >
                                {#each Object.entries(ALLOWED_ATTRIBUTE_TYPES) as [group, types]}
                                    {@const filtered = types.filter(
                                        ({ ident }) =>
                                            !con.some(({ t }) => ident === t) || ar.t === ident
                                    )}
                                    <option value="" disabled selected hidden />
                                    {#each filtered as { ident }}
                                        <option
                                            required
                                            value={ident}
                                            label={ar.focused ? $_(`attributeTypes.${ident}`) : ''}
                                        />
                                    {/each}
                                {/each}
                            </select>
                            <TypedAttributeValue
                                bind:this={ar.input}
                                bind:value={ar.v}
                                bind:focused={ar.focused}
                                {typ}
                            />
                            <div id="button-container">
                                <button
                                    id="close"
                                    on:click|preventDefault={() => removeAttribute(i, j)}
                                />
                            </div>
                        </div>
                    {/each}
                    <button on:click|preventDefault={() => addAttribute(i)}
                        >{$_('addAttribute')}</button
                    >
                </div>
            </div>
        {/each}
        <button on:click|preventDefault={addRecipient}>{$_('addRecipient')}</button>
        {#if submitButton}
            <button type="submit">Submit</button>
        {/if}
    </form>
{/if}

<style type="scss">
    form {
        width: auto;
    }

    #instruction {
        color: var(--pg-white);
    }

    .attribute-row {
        position: relative;
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--pg-border-color);
        margin: 5px 0 5px 0;
        padding-bottom: 5px;
        gap: 5px;
        font-size: 12px;
    }

    #attribute-con {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
    }

    #attribute-request {
        display: flex;
        flex-direction: row;

        #button-container {
            border: 0px;
            border-left: 0;
            border-radius: 0 15px 15px 0;
            width: 25px;
            background-color: var(--pg-white);

            button {
                width: 25px;
                height: 23px;
                position: relative;
                visibility: hidden;
                opacity: 0;
                transition: visibility 0.3s linear, opacity 0.3s linear;

                background-color: var(--pg-white);
                background-image: url('images/close.svg');
                background-repeat: no-repeat;
                background-position: left 50% top 50%;
            }
        }

        &:hover > #button-container > button {
            visibility: visible;
            opacity: 1;
        }

        select {
            background-color: var(--pg-blue);
            color: var(--pg-white);
            border: 0px solid black;
            border-radius: 15px 0px 0px 15px;
            padding: 3px 0 0 25px;

            background-repeat: no-repeat;
            background-position: left 8px top 50%;
            background-size: 20px 20px;
        }
    }

    .left-border {
        border: 0px solid black;
        border-radius: 15px 0 0 15px;
        padding: 3px;
    }

    .right-border {
        border: 0px solid black;
        border-radius: 0 15px 15px 0;
        border-left: 0px;
        padding: 3px;
    }

    div#recipient {
        display: flex;
        align-items: center;

        img {
            width: 20px;
            height: 20px;
        }

        div {
            display: flex;
            height: 15px;
            background-color: var(--pg-blue);
            width: 25px;
            align-items: center;
            justify-content: center;
        }

        input {
            height: 15px;
            background-color: var(--pg-white);
        }
    }

    button {
        border: 0px solid black;
        border-radius: 15px;
        padding: 3px 12px 3px 12px;
        background-color: var(--pg-blue);
        color: var(--pg-white);

        &[type='submit'] {
            float: right;
        }
    }
</style>
