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
export type AttributeConProps = typeof __propDef.props;
export type AttributeConEvents = typeof __propDef.events;
export type AttributeConSlots = typeof __propDef.slots;
export default class AttributeCon extends SvelteComponentTyped<AttributeConProps, AttributeConEvents, AttributeConSlots> {
}
export {};
