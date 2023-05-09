<script lang="ts">
    import { compute_slots } from 'svelte/internal'
    import EmailInput from './EmailInput.svelte'
    export let Hst

    let input: string
    let onRemove = () => {
        console.log('onRemove')
    }
</script>

<Hst.Story title="EmailInput">
    <Hst.Variant title="enabled">
        <EmailInput {input} {onRemove} />
    </Hst.Variant>
    <Hst.Variant title="disabled">
        <EmailInput {input} {onRemove} removable={false} readonly value={'test@exameple.com'} />
    </Hst.Variant>
</Hst.Story>
