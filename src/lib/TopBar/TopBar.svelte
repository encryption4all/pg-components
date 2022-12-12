<script lang="ts">
    import AttributeForm from '$lib/AttributeForm/AttributeForm.svelte';
    import Logo from '$lib/images/pg_logo_white.svg';

    export let enabled = true;
    export let extended = false;
    export let lang = 'en';
    export let onSwitched: (boolean) => void;
    export let formProps = {} || undefined;

    let prevExtended = false;

    $: onSwitched(enabled);

    $: if (!enabled) {
        prevExtended = extended;
        extended = false;
    }

    $: if (enabled) {
        extended = prevExtended;
    }
</script>

<div>
    <div class="pg-bar" {enabled}>
        <img class="icon" src={Logo} alt="PostGuard Logo" />
        <label class="switch">
            <input type="checkbox" bind:checked={enabled} />
            <span class="slider round" />
        </label>
        <p>
            {@html lang === 'en'
                ? `PostGuard is turned ${
                      enabled ? '<b>on</b>.' : '<b>off</b>. Sensitive content? Turn PostGuard on.'
                  }`
                : `PostGuard staat ${
                      enabled
                          ? '<b>aan</b>.'
                          : '<b>uit</b>. Gevoelige informatie? Zet PostGuard aan.'
                  }`}
        </p>
        <button hidden={!enabled} on:click={() => (extended = !extended)}>⚙</button>
    </div>
    {#if formProps}
        <div id="form" hidden={!extended}>
            <AttributeForm {...{ lang, ...formProps }} />
        </div>
    {/if}
</div>

<style lang="scss">
    @import './../app.css';

    button {
        height: 30px;
        width: 30px;
        margin-left: auto;
        margin-right: 1rem;
        background: transparent;
        outline: none;
        border: none;
        color: inherit;
        font-size: 22px;
    }

    #form {
        border-bottom: 2px solid var(--pg-border-color);
    }

    .pg-bar {
        display: flex;
        align-items: center;
        height: 45px;
        width: 100%;
        background-color: var(--pg-dark-blue);
        color: var(--pg-white);
    }

    .pg-bar p {
        font-family: 'Overpass';
        font-style: normal;
        margin-left: 1rem;
        font-size: 14px;
    }

    .pg-bar > .icon {
        padding: 0;
        margin: 3px 10px 3px 15px;
        width: 64px;
        height: 35px;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 16px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: '';
        height: 12px;
        width: 12px;
        left: 2px;
        bottom: 2px;
        transition: 0.4s;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
        transform: translateX(24px);
    }

    input:checked + .slider:before {
        background-color: var(--pg-dark-blue);
    }

    input:checked + .slider {
        background-color: var(--pg-white);
    }

    .slider.round {
        border-radius: 8px;
        background-color: var(--pg-grey);
    }

    .slider.round:before {
        background-color: var(--pg-white);
        border-radius: 50%;
    }
</style>
