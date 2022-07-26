import AttributeForm from './../lib/AttributeForm/AttributeForm.svelte';
import type Policy from './../lib/AttributeForm/AttributeForm.svelte';

export default {
    title: 'Example/AttributeForm',
    component: AttributeForm,
    parameters: {
        layout: 'fullscreen'
    }
};

const policy = {
    'leon.botros@gmail.com': [{ t: 'pbdf.sidn-pbdf.mobilenumber.mobilenumber', v: '0612345678' }],
    'l.botros@cs.ru.nl': [
        { t: 'pbdf.sidn-pbdf.mobilenumber.mobilenumber', v: '0612345678' },
        { t: 'pbdf.gemeente.personalData.fullname', v: 'L. Botros' }
    ]
};

const onSubmit = async (policy: Policy) => {
    console.log('Yay, we finished: ', policy);
};

const Template = (args) => ({
    Component: AttributeForm,
    props: args
});

export const form1 = Template.bind({});
form1.args = { initialPolicy: policy, onSubmit };
