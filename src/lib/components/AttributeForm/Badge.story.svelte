<script lang="ts">
    import Badge from './Badge.svelte'
    import { ALLOWED_ATTRIBUTE_TYPES } from './consts.ts'
    import { _ } from 'svelte-i18n'
    export let Hst

    let value = 'reallylongtestvalue'
</script>

<Hst.Story title="Badge">
    {#each Object.entries(ALLOWED_ATTRIBUTE_TYPES) as [group, array]}
        {#each array as typ}
            <Hst.Variant title={group}>
                <Badge {typ} {value} />
            </Hst.Variant>
        {/each}
    {/each}
</Hst.Story>
