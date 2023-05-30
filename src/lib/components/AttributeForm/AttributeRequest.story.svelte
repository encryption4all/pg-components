<script lang="ts">
    import AttributeRequest from './AttributeRequest.svelte'
    export let Hst

    import { ALLOWED_ATTRIBUTE_TYPES } from './consts'

    console.log(Object.entries(ALLOWED_ATTRIBUTE_TYPES))
    let input: string
    let onRemove = () => {
        console.log('onRemove')
    }
</script>

<Hst.Story title="AttributeRequest">
    {#each Object.entries(ALLOWED_ATTRIBUTE_TYPES) as [group, array]}
        {#each array as typ}
            <Hst.Variant title="{group}-{typ.ident}">
                <AttributeRequest> </AttributeRequest>
            </Hst.Variant>
        {/each}
    {/each}
</Hst.Story>
