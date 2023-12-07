<script lang="ts">
    import TopBar from '$lib/components/TopBar/TopBar.svelte'
    import type Policy from '$lib/components/AttributeForm/AttributeForm.svelte'

    export let Hst

    const initialPolicy = {
        'alice@example.com': [{ t: 'pbdf.sidn-pbdf.mobilenumber.mobilenumber', v: '+31612345678' }],
        'bob@example.com': [
            { t: 'pbdf.sidn-pbdf.mobilenumber.mobilenumber', v: '+31612345678' },
            { t: 'pbdf.gemeente.personalData.surname', v: 'Bob' }
        ]
    }

    const initialPolicySign = {
        'alice@example.com': [{ t: 'pbdf.sidn-pbdf.email.email'}]
    }

    const onSubmit = async (policy: Policy) => {
        console.log('Yay, we finished: ', policy)
    }

    const onPolicyChange = async (policy: Policy) => {
        console.log('The encryption policy has changed: ', policy)
    }

    const onSigningPolicyChanged = async (policy: Policy) => {
        console.log('The signing policy has changed: ', policy)
    }

    let enabled = false
</script>

<Hst.Story title="TopBar">
    <Hst.Variant title="en">
        <TopBar
            lang="en"
            bind:enabled
            formProps={{
                initialPolicy,
                onPolicyChange,
                onSubmit
            }}
            formPropsSign={{
                initialPolicy: initialPolicySign,
                onPolicyChange: onSigningPolicyChanged,
                onSubmit
            }}
        />
    </Hst.Variant>
    <Hst.Variant title="nl">
        <TopBar
            lang="nl"
            bind:enabled
            formProps={{
                initialPolicy,
                onPolicyChange,
                onSubmit
            }}
            formPropsSign={{
                initialPolicy: initialPolicySign,
                onPolicyChange: onSigningPolicyChanged,
                onSubmit
            }}
        />
    </Hst.Variant>
</Hst.Story>
