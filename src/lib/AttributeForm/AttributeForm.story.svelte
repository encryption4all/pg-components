<script>
    import AttributeForm from './AttributeForm.svelte';
    export let Hst;
</script>

<Hst.Story title="AttributeForm">
    <AttributeForm lang={'en'} onSubmit={(p) => console.log('done: ', p)} />
</Hst.Story>
