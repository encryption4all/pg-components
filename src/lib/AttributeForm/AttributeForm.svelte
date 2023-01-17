<script lang="ts" context="module">
    export type Policy = { [key: string]: AttributeCon };
    type PolicyList = { id: string; con: AttributeCon; removeActive: boolean }[];
    type AttributeCon = AttributeRequest[];
    type AttributeRequest = {
        t: string;
        v: string;
        focused: boolean;
    };
</script>

<script lang="ts">
    import initWithLang from '$lib/i18n';
    import { _, isLoading, locale } from 'svelte-i18n';
    import { ALLOWED_ATTRIBUTE_TYPES } from './consts';
    import type { AttributeType } from './consts';
    import TypedAttributeValue from './TypedAttributeValue.svelte';
    import EmailInput from './EmailInput.svelte';
    import { tick } from 'svelte';
    import '../app.css';

    const imgs: { [string]: string } = {
        health: "data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M5.714 5.75V4.734c0-.234.148-.445.372-.527L7.8 3.574a.585.585 0 0 1 .402 0l1.714.633a.563.563 0 0 1 .371.527V5.75h-.005c.004.046.005.093.005.14v.704c0 1.242-1.023 2.25-2.285 2.25-1.263 0-2.286-1.007-2.286-2.25V5.89c0-.048.002-.095.005-.141h-.007Zm.857.844C6.571 7.37 7.211 8 8 8c.79 0 1.429-.63 1.429-1.406v-.282H6.57v.282ZM6.305 9.18l1.486 1.554a.29.29 0 0 0 .416 0l1.486-1.554c1.316.262 2.305 1.407 2.305 2.78 0 .298-.246.539-.548.539H4.548A.545.545 0 0 1 4 11.96c0-1.373.991-2.517 2.305-2.779Zm1.41-4.837v.281h-.286a.142.142 0 0 0-.143.14v.282c0 .077.064.14.143.14h.285v.282c0 .077.065.14.143.14h.286a.142.142 0 0 0 .143-.14v-.282h.285a.142.142 0 0 0 .143-.14v-.281a.142.142 0 0 0-.143-.141h-.285v-.281a.142.142 0 0 0-.143-.14h-.286a.142.142 0 0 0-.143.14Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' transform='translate(4 3.5)' d='M0 0h8v9H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
        calendar:
            "data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.263 11.702C4.421 11.702 4 11.29 4 10.454V5.546c0-.827.421-1.248 1.263-1.248h5.474c.842 0 1.263.42 1.263 1.248v4.908c0 .835-.421 1.248-1.263 1.248H5.263Zm-.058-.69h5.583c.348 0 .522-.166.522-.522V6.7c0-.37-.203-.558-.551-.558H5.24c-.355 0-.551.188-.551.559v3.789c0 .356.181.523.515.523Zm1.99-3.368c-.175 0-.226-.05-.226-.21v-.29c0-.168.051-.226.225-.226h.276c.174 0 .232.058.232.225v.29c0 .16-.058.211-.232.211h-.276Zm1.335 0c-.174 0-.225-.05-.225-.21v-.29c0-.168.05-.226.225-.226h.276c.174 0 .225.058.225.225v.29c0 .16-.051.211-.225.211H8.53Zm1.336 0c-.182 0-.233-.05-.233-.21v-.29c0-.168.051-.226.233-.226h.268c.175 0 .233.058.233.225v.29c0 .16-.059.211-.233.211h-.268Zm-4 1.307c-.175 0-.233-.044-.233-.21v-.284c0-.174.058-.225.233-.225h.276c.174 0 .225.051.225.225v.283c0 .167-.051.211-.225.211h-.276Zm1.328 0c-.174 0-.225-.044-.225-.21v-.284c0-.174.051-.225.225-.225h.276c.174 0 .232.051.232.225v.283c0 .167-.058.211-.232.211h-.276Zm1.336 0c-.174 0-.225-.044-.225-.21v-.284c0-.174.05-.225.225-.225h.276c.174 0 .225.051.225.225v.283c0 .167-.051.211-.225.211H8.53Zm1.336 0c-.182 0-.233-.044-.233-.21v-.284c0-.174.051-.225.233-.225h.268c.175 0 .233.051.233.225v.283c0 .167-.059.211-.233.211h-.268Zm-4 1.314c-.175 0-.233-.05-.233-.225v-.283c0-.167.058-.21.233-.21h.276c.174 0 .225.043.225.21v.283c0 .174-.051.225-.225.225h-.276Zm1.328 0c-.174 0-.225-.05-.225-.225v-.283c0-.167.051-.21.225-.21h.276c.174 0 .232.043.232.21v.283c0 .174-.058.225-.232.225h-.276Zm1.336 0c-.174 0-.225-.05-.225-.225v-.283c0-.167.05-.21.225-.21h.276c.174 0 .225.043.225.21v.283c0 .174-.051.225-.225.225H8.53Z' fill='%23fff'/%3E%3C/svg%3E",
        education:
            "data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 5.277a.907.907 0 0 0-.296.05L4.198 6.558A.293.293 0 0 0 4 6.833c0 .123.079.232.198.275l.723.253a1.96 1.96 0 0 0-.32 1.075v.341c0 .345-.136.701-.28.982a3.204 3.204 0 0 1-.28.457.191.191 0 0 0-.03.182.198.198 0 0 0 .14.124l.8.195a.204.204 0 0 0 .155-.024.19.19 0 0 0 .09-.127c.107-.52.053-.987-.027-1.32A2.633 2.633 0 0 0 5 8.734v-.3c0-.366.128-.713.349-.99.161-.188.37-.34.615-.434l1.962-.75a.202.202 0 0 1 .26.11c.04.1-.01.213-.113.252l-1.963.75a1.15 1.15 0 0 0-.402.262l1.995.7a.907.907 0 0 0 .592 0l3.508-1.227A.292.292 0 0 0 12 6.833a.293.293 0 0 0-.197-.275l-3.507-1.23A.907.907 0 0 0 8 5.277Zm-2.4 4.57c0 .429 1.075.875 2.4.875s2.4-.446 2.4-.875l-.191-1.767-1.778.624a1.306 1.306 0 0 1-.862 0L5.79 8.08l-.19 1.767Z' fill='%23fff'/%3E%3C/svg%3E",
        envelope:
            "data:image/svg+xml,%0A%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m6.58 8.014-2.51 2.502C4.022 10.43 4 10.26 4 9.997V6.002c0-.255.021-.425.057-.503l2.522 2.515Zm1.43.369a.578.578 0 0 1-.403-.17L4.418 5.017c.092-.071.298-.142.602-.142h5.967c.304 0 .517.071.61.142l-3.19 3.196a.571.571 0 0 1-.396.17Zm1.404-.369L11.936 5.5c.036.078.064.248.064.503v3.996c0 .262-.028.432-.078.518L9.414 8.014Zm-1.41.95c.262 0 .46-.085.744-.348l.233-.212 2.587 2.586c-.085.078-.284.135-.588.135H5.02c-.297 0-.503-.057-.588-.135l2.594-2.586.234.212c.276.263.481.348.744.348Z' fill='%23fff'/%3E%3C/svg%3E",
        personal:
            "data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.889 4.875c-.49 0-.889.4-.889.893v4.464c0 .492.399.893.889.893h6.222c.49 0 .889-.4.889-.893V5.768a.892.892 0 0 0-.889-.893H4.89ZM6 8.446h.889c.614 0 1.111.5 1.111 1.116 0 .123-.1.224-.222.224H5.11a.223.223 0 0 1-.222-.224c0-.616.497-1.116 1.111-1.116Zm1.333-1.339A.892.892 0 0 1 6.444 8c-.49 0-.888-.4-.888-.893 0-.492.398-.893.888-.893s.89.4.89.893Zm1.778-.446h1.778a.223.223 0 0 1 0 .446H9.11a.223.223 0 0 1 0-.446Zm0 .893h1.778a.223.223 0 0 1 0 .446H9.11a.223.223 0 0 1 0-.446Zm0 .892h1.778a.223.223 0 0 1 0 .447H9.11a.223.223 0 0 1 0-.447Z' fill='%23fff'/%3E%3C/svg%3E",
        phone: "data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.17 9.818C4.381 8.036 3.246 5.765 4.59 4.414c.029-.03.059-.06.103-.089.512-.379.987-.468 1.3-.015l.942 1.329c.319.453.252.727-.104 1.091l-.297.32c-.096.103-.06.237-.015.326.156.26.527.72.95 1.143.43.43.876.787 1.143.95.104.06.26.074.342-.015l.304-.297c.342-.341.639-.415 1.091-.104.616.438.995.698 1.351.958.446.334.35.854.008 1.24-.045.051-.082.103-.134.155-1.343 1.344-3.622.208-5.404-1.588Z' fill='%23fff'/%3E%3C/svg%3E"
    };

    export let lang = 'en';
    export let initialPolicy: Policy = {};
    export let onPolicyChange: (policy: Policy) => Promise<void> = () => {};
    export let submitButton: boolean | { [customText]: string } = false;
    export let onSubmit: (policy: Policy) => Promise<void>;

    let init = false;
    let form;
    let policy: PolicyList = [];
    $: {
        if (!init) {
            policy = Object.entries(initialPolicy).reduce(
                (total, [id, con]) => [
                    { id, con: con.filter(({ t }) => t !== 'pbdf.sidn-pbdf.email.email') },
                    ...total
                ],
                [] as PolicyList
            );

            initWithLang(lang);
            init = true;
        }
    }

    $: validatedPolicy = form && policy ? validateForm() : undefined;
    $: onPolicyChange(validatedPolicy);

    function validateForm(auto: boolean = true): () => Policy | undefined {
        if (!form.checkValidity()) {
            if (!auto) form.reportValidity();
            return undefined;
        }

        const res: { [key: string]: AttributeCon } = {};
        for (const { id, con } of policy) {
            res[id] = [{ t: 'pbdf.sidn-pbdf.email.email', v: id.toLowerCase() }];
            for (let { t, v } of con) {
                if (t === 'pbdf.gemeente.personalData.dateofbirth') v = v.replace(/\.|\//g, '-');
                res[id].push({ t, v });
            }
        }

        return res;
    }

    // Helper function to get the more information of the type in an AttributeRequest.
    function typeOf(ar: AttributeRequest): AttributeType | undefined {
        for (const [, groupList] of Object.entries(ALLOWED_ATTRIBUTE_TYPES)) {
            for (const typ of groupList) {
                if (ar.t === typ.ident) return typ;
            }
        }
    }

    const handleSubmit = async () => {
        const validated = validateForm(false);
        if (validated) await onSubmit(validated);
    };

    const addRecipient = () => {
        policy.push({ id: '', con: [] });
        policy = policy;
    };

    const removeRecipient = (i: number) => {
        policy = policy.filter((item, idx) => idx !== i);
    };

    const addAttribute = (i: number, t: type) => {
        policy[i].con.push({ t, v: '', focused: true });
        policy = policy;
    };

    const removeAttribute = (i: number, j: number) => {
        policy[i].con = policy[i].con.filter((item, idx) => idx !== j);
        policy = policy;
    };
</script>

<svelte:window
    on:keydown={(e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    }}
/>

{#if $isLoading}{:else}
    <form bind:this={form} on:submit|preventDefault={handleSubmit}>
        <div class="attribute-row" id="instruction">{$_('instruction')}</div>
        <div id="row-container">
            {#each policy as { con, removeActive }, i}
                <div class={`attribute-row ${removeActive ? 'remove-active' : ''}`}>
                    <div id="recipient">
                        <div class="left-border">
                            <img src={imgs.envelope} alt="email" />
                        </div>
                        <EmailInput bind:value={policy[i].id} />
                        <div id="button-container">
                            <button
                                class="remove"
                                on:click|preventDefault={() => removeRecipient(i)}
                                on:mouseover={() => (removeActive = true)}
                                on:focus={() => void 0}
                                on:mouseout={() => (removeActive = false)}
                                on:blur={() => void 0}
                            />
                        </div>
                    </div>
                    <div id="attribute-con">
                        {#each con as ar, j}
                            {@const typ = typeOf(ar)}
                            <div id="attribute-request">
                                <select
                                    required
                                    bind:value={ar.t}
                                    on:change={() => {
                                        ar.v = '';
                                        ar.input.focus();
                                    }}
                                    on:focus={() => (ar.focused = true)}
                                    style={typ?.img
                                        ? `background-image: url("${
                                              imgs[typ.img]
                                          }"); padding-left: ${ar.focused ? '25px' : '20px'}`
                                        : ''}
                                >
                                    {#each Object.entries(ALLOWED_ATTRIBUTE_TYPES) as [group, types]}
                                        {@const filtered = types.filter(
                                            ({ ident }) =>
                                                !con.some(({ t }) => ident === t) || ar.t === ident
                                        )}
                                        <option value="" disabled selected hidden />
                                        {#each filtered as { ident }}
                                            <option
                                                required
                                                value={ident}
                                                label={ar.focused
                                                    ? $_(`attributeTypes.${ident}`)
                                                    : ''}
                                            />
                                        {/each}
                                    {/each}
                                </select>
                                <TypedAttributeValue
                                    bind:value={ar.v}
                                    bind:focused={ar.focused}
                                    {typ}
                                />
                                <div id="button-container">
                                    <button
                                        class="remove"
                                        on:click|preventDefault={() => removeAttribute(i, j)}
                                    />
                                </div>
                            </div>
                        {/each}
                        <select
                            id="add-recipient-data"
                            class="round-btn"
                            required
                            on:change={(event) => {
                                addAttribute(i, event.target.value);
                                event.target.value = 'none';
                            }}
                        >
                            {#each Object.entries(ALLOWED_ATTRIBUTE_TYPES) as [group, types]}
                                {@const filtered = types.filter(
                                    ({ ident }) => !con.some(({ t }) => ident === t)
                                )}
                                <option value="none" disabled selected hidden
                                    >{$_('addAttribute')}</option
                                >
                                {#each filtered as { ident }}
                                    <option
                                        required
                                        value={ident}
                                        label={$_(`attributeTypes.${ident}`)}
                                    />
                                {/each}
                            {/each}
                        </select>
                    </div>
                </div>
            {/each}
            <button class="round-btn" on:click|preventDefault={addRecipient}
                >{$_('addRecipient')}</button
            >
            {#if submitButton}
                <button class="button" type="submit"
                    >{submitButton.customText ?? $_('submit')}</button
                >
            {/if}
        </div>
    </form>
{/if}

<style lang="scss">
    form {
        background-color: var(--pg-dark-blue);
    }

    #instruction {
        padding-left: 10px;
        color: var(--pg-white);
    }

    #row-container {
        margin: 0 10px 0 10px;

        & > button {
            margin-top: 7px;
            margin-bottom: 7px;
        }
    }

    .attribute-row {
        position: relative;
        display: flex;
        border-bottom: 1px solid var(--pg-border-color);
        align-items: center;
        padding: 7px 0 7px 0;
        gap: 5px;

        &.remove-active {
            // todo
        }
    }

    #attribute-con {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
    }

    #button-container {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0px;
        border-left: 0;
        border-radius: 0 15px 15px 0;
        width: 25px;
        background-color: var(--pg-white);

        button.remove {
            width: 25px;
            height: 23px;
            position: relative;
            visibility: hidden;
            opacity: 0;
            transition: visibility 0.3s linear, opacity 0.3s linear;

            background: no-repeat 50% 50%
                url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.541992 9.51105L9.48743 0.565605' stroke='%23017AFF' stroke-width='1.5'/%3E%3Cpath d='M0.541992 0.565613L9.48743 9.51105' stroke='%23017AFF' stroke-width='1.5'/%3E%3C/svg%3E");
        }
    }

    #attribute-request {
        display: flex;
        flex-direction: row;

        &:hover > #button-container > button.remove {
            visibility: visible;
            opacity: 1;
        }

        select {
            background-color: var(--pg-blue);
            color: var(--pg-white);
            border: 0px solid black;
            border-radius: 15px 0px 0px 15px;
            padding: 3px 0 0 25px;

            background-repeat: no-repeat;
            background-position: left 8px top 50%;
            background-size: 20px 20px;
        }
    }

    .left-border {
        border: 0px solid black;
        border-radius: 15px 0 0 15px;
        padding: 3px;
    }

    div#recipient {
        display: flex;

        &:hover > #button-container > button.remove {
            visibility: visible;
            opacity: 1;
        }

        img {
            width: 20px;
            height: 20px;
        }

        div:not(#button-container) {
            display: flex;
            background-color: var(--pg-blue);
            width: 25px;
            align-items: center;
            justify-content: center;
        }
    }

    .round-btn,
    button {
        border: 0px solid black;
        border-radius: 15px;
        padding: 3px 10px 3px 10px;
        background-color: var(--pg-blue);
        color: var(--pg-white);
    }

    select#add-recipient-data {
        border-right: 10px solid transparent;
        padding-right: 0px;
    }

    button[type='submit'] {
        float: right;
    }
</style>
