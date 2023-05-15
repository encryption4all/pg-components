import { SvelteComponentTyped } from "svelte";
import './../../app.css';
declare const __propDef: {
    props: {
        focused?: boolean | undefined;
        value: string;
        typ: AttributeType;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AttributeValueProps = typeof __propDef.props;
export type AttributeValueEvents = typeof __propDef.events;
export type AttributeValueSlots = typeof __propDef.slots;
export default class AttributeValue extends SvelteComponentTyped<AttributeValueProps, AttributeValueEvents, AttributeValueSlots> {
}
export {};
