<script lang="ts">
    import EmailInput from './EmailInput.svelte'
    import AttributeCon from './AttributeCon.svelte'

    import { getContext } from 'svelte'
    import type { Writable } from 'svelte/store'

    export let i: number
    const { policy, signing }: { policy: Writable<PolicyListItem[]>; signing: boolean } =
        getContext('store')

    function removeRecipient(i: number) {
        policy.update((p: PolicyListItem[]) => {
            p = p.filter((item, idx) => idx !== i)
            return p
        })
    }

    let removeActive = false
</script>

<div class={`attribute-row ${removeActive ? 'remove-active' : ''}`}>
    <EmailInput
        bind:value={$policy[i].id}
        onRemove={() => removeRecipient(i)}
        removable={!signing}
        readonly={signing}
    />
    <AttributeCon {i} />
</div>

<style lang="scss">
    .attribute-row {
        display: flex;
        align-items: center;
        padding: 7px 0 7px 0;
        gap: 10px;

        &:not(:last-child) {
            border-bottom: 1px solid var(--pg-border-color);
        }
    }
</style>
