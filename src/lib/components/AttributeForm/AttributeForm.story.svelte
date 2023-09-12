<script>
    import AttributeForm from './AttributeForm.svelte'
    export let Hst

    const initialPolicy = {
        'test@example.com': [{ t: 'pbdf.sidn-pbdf.email.email', v: 'test@example.com' }]
    }

    function onSubmit(p) {
        console.log('done: ', p)
    }
</script>

<Hst.Story title="AttributeForm">
    <Hst.Variant title="enc">
        <AttributeForm lang={'en'} {onSubmit} submitButton={true} />
    </Hst.Variant>
    <Hst.Variant title="sign">
        <AttributeForm lang={'en'} {onSubmit} signing={true} submitButton={true} {initialPolicy} />
    </Hst.Variant>
</Hst.Story>
