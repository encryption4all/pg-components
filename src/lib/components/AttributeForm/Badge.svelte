<script lang="ts">
    import AttributeRequest from './AttributeRequest.svelte'

    export let typ: AttributeType
    export let value: string
</script>

<AttributeRequest removable={false} onRemove={() => {}}>
    <div class="image-container" slot="type">
        <img src={typ.img} alt="email" />
    </div>
    <div class="value" slot="value">{value}</div>
</AttributeRequest>

<style lang="scss">
    .image-container {
        width: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        img {
            width: 20px;
            height: 20px;
        }
    }

    .value {
        background-color: var(--pg-blue);
        color: var(--pg-white);
        height: 100%;
        padding-right: 0.75em;
        line-height: 25px;
    }
</style>
