import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: string | undefined;
        onRemove: Function;
        readonly?: boolean | undefined;
        removable?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type EmailInputProps = typeof __propDef.props;
export type EmailInputEvents = typeof __propDef.events;
export type EmailInputSlots = typeof __propDef.slots;
export default class EmailInput extends SvelteComponentTyped<EmailInputProps, EmailInputEvents, EmailInputSlots> {
}
export {};
