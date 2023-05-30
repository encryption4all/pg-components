<script lang="ts">
    export let onRemove: Function
    export let removeActive = false
    export let removable = true
</script>

<div class="attribute-request">
    <div class="left-container">
        <slot name="type" />
    </div>
    <div>
        <slot name="value" />
    </div>
    {#if removable}
        <div class="right-container">
            <button
                class="remove"
                on:click|preventDefault={() => onRemove()}
                on:mouseover={() => (removeActive = true)}
                on:focus={() => void 0}
                on:mouseout={() => (removeActive = false)}
                on:blur={() => void 0}
            />
        </div>
    {/if}
</div>

<style lang="scss">
    div.attribute-request {
        display: flex;
        width: fit-content;
        height: 1.5em;
        overflow: hidden;
        border-radius: 15px;
        border: 0px;

        .left-container {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--pg-blue);
            min-width: 1.5em;
        }

        &:hover > .right-container > button.remove {
            visibility: visible;
            opacity: 1;
        }

        .right-container {
            min-width: 1.5em;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--pg-white);

            button.remove {
                position: relative;
                width: 25px;
                height: 100%;
                visibility: hidden;
                opacity: 0;
                transition: visibility 0.3s linear, opacity 0.3s linear;

                background: no-repeat 50% 50%
                    url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.541992 9.51105L9.48743 0.565605' stroke='%23017AFF' stroke-width='1.5'/%3E%3Cpath d='M0.541992 0.565613L9.48743 9.51105' stroke='%23017AFF' stroke-width='1.5'/%3E%3C/svg%3E");
            }
        }
    }
</style>
