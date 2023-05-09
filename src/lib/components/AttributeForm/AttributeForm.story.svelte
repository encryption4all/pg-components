<script>
    import AttributeForm from './AttributeForm.svelte'
    export let Hst

    function onSubmit(p) {
        console.log('done: ', p)
    }
</script>

<Hst.Story title="AttributeForm">
    <Hst.Variant title="enc">
        <AttributeForm lang={'en'} {onSubmit} />
    </Hst.Variant>
    <Hst.Variant title="sign">
        <AttributeForm lang={'en'} {onSubmit} signing={true} submitButton={true} />
    </Hst.Variant>
</Hst.Story>
