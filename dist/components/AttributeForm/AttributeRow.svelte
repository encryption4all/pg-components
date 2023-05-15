<script>import EmailInput from './EmailInput.svelte';
import AttributeCon from './AttributeCon.svelte';
import { getContext } from 'svelte';
export let i;
const { policy, signing } = getContext('store');
function removeRecipient(i) {
    policy.update((p) => {
        p = p.filter((item, idx) => idx !== i);
        return p;
    });
}
let removeActive = false;
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

<style>.attribute-row {
  display: flex;
  align-items: center;
  padding: 7px 0 7px 0;
  gap: 10px;
}
.attribute-row:not(:last-child) {
  border-bottom: 1px solid var(--pg-border-color);
}</style>
