<script lang="ts">
    import AttributeForm from '$lib/components/AttributeForm/AttributeForm.svelte'
    import Logo from '$lib/images/pg_logo_no_text.svg'
    import LogoGrey from '$lib/images/pg_logo_grey_no_text.svg'
    import initLocale from '$lib/i18n'
    import { _, isLoading } from 'svelte-i18n'
    import Switch from './Switch.svelte'

    export let lang = 'en'
    export let enabled = true
    export let extended = false
    export let extendedSign = false
    export let formProps = {} || undefined
    export let formPropsSign = {} || undefined

    let prevExtended = false
    let prevExtendedSign = false

    $: if (!enabled) {
        prevExtended = extended
        prevExtendedSign = extendedSign
        extended = false
        extendedSign = false
    }

    $: if (enabled) {
        extended = prevExtended
        extendedSign = prevExtendedSign
    }

    initLocale(lang)

    $: console.log('formprops sign: ', formPropsSign)
</script>

{#if !$isLoading}
    <div>
        <div class="pg-bar" {enabled}>
            <img class="icon" src={enabled ? Logo : LogoGrey} alt="PostGuard Logo" />
            <Switch bind:enabled />
            <p id="bar-text">
                {@html $_(enabled ? 'enabledText' : 'disabledText')}
            </p>
            <button class="btn-round" hidden={!enabled} on:click={() => (extended = !extended)}
                >{$_('attributeSelection')}</button
            >
            <button
                class="btn-round"
                hidden={!enabled}
                on:click={() => (extendedSign = !extendedSign)}
                >{$_('attributeSelectionSign')}</button
            >
        </div>
        {#if formProps || formPropsSign}
            <div id="form" hidden={!extended}>
                {#if formProps}
                    <AttributeForm {...{ lang, ...formProps }} />
                {/if}
            </div>
            <div id="form" hidden={!extendedSign}>
                {#if formPropsSign}
                    <AttributeForm {...{ lang, ...formPropsSign, signing: true }} />
                {/if}
            </div>
        {/if}
    </div>
{/if}

<style lang="scss">
    #bar-text {
        font-size: 16px;
    }

    .pg-bar {
        display: flex;
        align-items: center;
        height: 45px;
        width: 100%;
        background-color: var(--pg-dark-blue);
        color: var(--pg-white);
        border-bottom: 1px solid var(--pg-border-color);

        button {
            height: 25px;
            margin-left: 0.75em;
            padding: 0 15px;
        }
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
</style>
