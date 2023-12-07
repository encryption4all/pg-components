<script lang="ts">
    import initLocale from '$lib/i18n'
    import { _, isLoading } from 'svelte-i18n'
    import { EMAIL } from './consts'
    import { encPolicy, signPolicy } from './stores'
    import AttributeRow from './AttributeRow.svelte'
    import { setContext } from 'svelte'

    import './../../app.css'

    export let lang = 'en'
    export let initialPolicy: Policy = {}
    export let onPolicyChange: (policy: Policy | undefined) => Promise<void> = async () => {}
    export let submitButton: boolean | { [customText: string]: string } = false
    export let onSubmit: (policy: Policy) => Promise<void>
    export let signing = false

    // Set the store.
    const policy = signing ? signPolicy : encPolicy
    setContext('store', { policy, signing })

    let init = false
    let form: HTMLFormElement

    $: {
        if (!init) {
            let initial = Object.entries(initialPolicy).reduce(
                (total, [id, con]) => [
                    {
                        id,
                        con: con.filter(({ t }) => t !== EMAIL)
                    },
                    ...total
                ],
                []
            )

            policy.set(initial)

            initLocale(lang)
            init = true
        }
    }

    $: validatedPolicy = form && $policy ? validateForm() : undefined
    $: onPolicyChange(validatedPolicy)

    function validateForm(auto: boolean = true): Policy | undefined {
        if (!form.checkValidity()) {
            if (!auto) form.reportValidity()
            return undefined
        }

        const res: { [key: string]: AttributeCon } = {}
        for (const { id, con } of $policy) {
            res[id] = signing ? [{ t: EMAIL }] : [{ t: EMAIL, v: id.toLowerCase() }]
            for (let { t, v } of con) {
                if (t === 'pbdf.gemeente.personalData.dateofbirth') v = v.replace(/\.|\//g, '-')
                res[id].push(signing ? { t } : { t, v })
            }
        }

        return res
    }

    const handleSubmit = async () => {
        const validated = validateForm(false)
        if (validated) await onSubmit(validated)
    }

    const addRecipient = () => {
        policy.update((p) => {
            p.push({ id: '', con: [] })
            return p
        })
    }
</script>

<svelte:window
    on:keydown={(e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSubmit()
        }
    }}
/>

{#if !$isLoading}
    <form bind:this={form} on:submit|preventDefault={handleSubmit}>
        <div id="instruction">
            {$_(`instruction${signing ? 'Sign' : ''}`)}
        </div>
        <div id="row-container">
            {#each $policy as _, i}
                <AttributeRow {i} />
            {/each}
            {#if !signing}
                <button class="round-btn" on:click|preventDefault={addRecipient}
                    >{$_('addRecipient')}</button
                >
            {/if}
        </div>
        {#if submitButton}
            <button class="button" type="submit">{submitButton.customText ?? $_('submit')}</button>
        {/if}
    </form>
{/if}

<style lang="scss">
    form {
        background-color: var(--pg-dark-blue);
        border-bottom: 1px solid var(--pg-border-color);
        padding: 0.25em 0;
        display: flex;
        flex-direction: column;
    }

    #instruction {
        padding: 5px 0 0 10px;
        color: var(--pg-white);
    }

    #row-container {
        margin: 0 10px 0 10px;

        & > button {
            margin-top: 7px;
            margin-bottom: 7px;
        }
    }

    button[type='submit'] {
        margin: 0.25em 0.5em;
        width: fit-content;
        align-self: flex-end;
    }
</style>
