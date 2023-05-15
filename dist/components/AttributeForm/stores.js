import { writable } from 'svelte/store';
// stores for the current policies (sign/encryption)
export const encPolicy = writable([]);
export const signPolicy = writable([]);
// derived stores for available attribute choices
// TODO
