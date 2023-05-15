import { SvelteComponentTyped } from "svelte";
import './../../app.css';
declare const __propDef: {
    props: {
        lang?: string | undefined;
        initialPolicy?: Policy | undefined;
        onPolicyChange?: ((policy: Policy | undefined) => Promise<void>) | undefined;
        submitButton?: boolean | {
            [customText: string]: string;
        } | undefined;
        onSubmit: (policy: Policy) => Promise<void>;
        signing?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AttributeFormProps = typeof __propDef.props;
export type AttributeFormEvents = typeof __propDef.events;
export type AttributeFormSlots = typeof __propDef.slots;
export default class AttributeForm extends SvelteComponentTyped<AttributeFormProps, AttributeFormEvents, AttributeFormSlots> {
}
export {};
