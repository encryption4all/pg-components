<script lang="ts">
    import AttributeForm from '$lib/AttributeForm/AttributeForm.svelte';
    import type Policy from '$lib/AttributeForm/AttributeForm.svelte';

    import './index.css';

    const initialPolicy = {
        'leon.botros@gmail.com': [
            { t: 'pbdf.sidn-pbdf.mobilenumber.mobilenumber', v: '+31612345678' }
        ],
        'l.botros@cs.ru.nl': [
            { t: 'pbdf.sidn-pbdf.mobilenumber.mobilenumber', v: '+31612345678' },
            { t: 'pbdf.gemeente.personalData.surname', v: 'Botros' }
        ]
    };

    const onSubmit = async (policy: Policy) => {
        console.log('Yay, we finished: ', policy);
    };

    const onPolicyChange = async (policy: Policy) => {
        console.log('The policy has changed: ', policy);
    };
</script>

<AttributeForm {initialPolicy} {onSubmit} {onPolicyChange} submitButton={{ customText: 'Send' }} />
