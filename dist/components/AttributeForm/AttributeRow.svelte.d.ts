import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        i: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AttributeRowProps = typeof __propDef.props;
export type AttributeRowEvents = typeof __propDef.events;
export type AttributeRowSlots = typeof __propDef.slots;
export default class AttributeRow extends SvelteComponentTyped<AttributeRowProps, AttributeRowEvents, AttributeRowSlots> {
}
export {};
