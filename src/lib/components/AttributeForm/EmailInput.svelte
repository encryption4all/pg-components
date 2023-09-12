<script lang="ts">
    import { onMount } from 'svelte'
    import AttributeRequest from './AttributeRequest.svelte'

    export let value = ''
    export let onRemove: Function
    export let readonly = false
    export let removable = true

    let element: HTMLInputElement

    onMount(() => element.focus())
</script>

<AttributeRequest {onRemove} {removable}>
    <div slot="type">
        <div class="image-container">
            <img
                src="data:image/svg+xml,%0A%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m6.58 8.014-2.51 2.502C4.022 10.43 4 10.26 4 9.997V6.002c0-.255.021-.425.057-.503l2.522 2.515Zm1.43.369a.578.578 0 0 1-.403-.17L4.418 5.017c.092-.071.298-.142.602-.142h5.967c.304 0 .517.071.61.142l-3.19 3.196a.571.571 0 0 1-.396.17Zm1.404-.369L11.936 5.5c.036.078.064.248.064.503v3.996c0 .262-.028.432-.078.518L9.414 8.014Zm-1.41.95c.262 0 .46-.085.744-.348l.233-.212 2.587 2.586c-.085.078-.284.135-.588.135H5.02c-.297 0-.503-.057-.588-.135l2.594-2.586.234.212c.276.263.481.348.744.348Z' fill='%23fff'/%3E%3C/svg%3E"
                alt="email"
            />
        </div>
    </div>
    <input
        slot="value"
        required
        type="email"
        autocomplete="email"
        placeholder=""
        size={value ? value.length * 0.8 : 10}
        bind:value
        bind:this={element}
        style={`cursor: default; background-color: var(--pg-${
            readonly ? 'blue' : 'white'
        }); color: var(--pg-${readonly ? 'white' : 'black'}`}
        {readonly}
    />
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

    input {
        width: 100%;
        padding: 0px 2px;
        height: 100%;
        border: 0px solid black;
        color: black;

        &:focus {
            outline: none;
        }
    }
</style>
