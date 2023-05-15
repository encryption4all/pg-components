import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        lang?: string | undefined;
        enabled?: boolean | undefined;
        extended?: boolean | undefined;
        extendedSign?: boolean | undefined;
        formProps?: {} | undefined;
        formPropsSign?: {} | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type TopBarProps = typeof __propDef.props;
export type TopBarEvents = typeof __propDef.events;
export type TopBarSlots = typeof __propDef.slots;
export default class TopBar extends SvelteComponentTyped<TopBarProps, TopBarEvents, TopBarSlots> {
}
export {};
