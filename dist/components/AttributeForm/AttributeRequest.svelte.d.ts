import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        onRemove: Function;
        removeActive?: boolean | undefined;
        removable?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        type: {};
        value: {};
    };
};
export type AttributeRequestProps = typeof __propDef.props;
export type AttributeRequestEvents = typeof __propDef.events;
export type AttributeRequestSlots = typeof __propDef.slots;
export default class AttributeRequest extends SvelteComponentTyped<AttributeRequestProps, AttributeRequestEvents, AttributeRequestSlots> {
}
export {};
