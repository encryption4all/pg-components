<script lang="ts">
    import AttributeForm from '$lib/AttributeForm/AttributeForm.svelte';
    import Logo from '$lib/images/pg_logo_no_text.svg';
    import LogoGrey from '$lib/images/pg_logo_grey_no_text.svg';
    import initLocale from '$lib/i18n';
    import { _, isLoading } from 'svelte-i18n';

    export let enabled = true;
    export let extended = false;
    export let lang = 'en';
    export let formProps = {} || undefined;

    let prevExtended = false;

    $: if (!enabled) {
        prevExtended = extended;
        extended = false;
    }

    $: if (enabled) extended = prevExtended;

    initLocale(lang);
</script>

{#if $isLoading}{:else}
    <div>
        <div class="pg-bar" {enabled}>
            <img class="icon" src={enabled ? Logo : LogoGrey} alt="PostGuard Logo" />
            <label class="switch">
                <input type="checkbox" bind:checked={enabled} />
                <span class="slider round" />
            </label>
            <p id="bar-text">
                {@html $_(enabled ? 'enabledText' : 'disabledText')}
            </p>
            <button hidden={!enabled} on:click={() => (extended = !extended)}
                >{$_('attributeSelection')}</button
            >
        </div>
        {#if formProps}
            <div id="form" hidden={!extended}>
                <AttributeForm {...{ lang, ...formProps }} />
            </div>
        {/if}
    </div>
{/if}

<style lang="scss">
    @import './../app.css';

    #bar-text {
        font-size: 16px;
    }

    button {
        height: 25px;
        margin-left: auto;
        margin-right: 1rem;
        padding: 0 15px;
        background: var(--pg-blue);
        outline: none;
        border: 0px solid black;
        border-radius: 15px;
        color: inherit;
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
    }

    .pg-bar > .icon {
        padding: 0;
        margin: 3px 10px 3px 15px;
        width: 35px;
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
