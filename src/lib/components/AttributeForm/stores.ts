import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

// stores for the current policies (sign/encryption)
export const encPolicy: Writable<PolicyListItem[]> = writable([])

export const signPolicy: Writable<PolicyListItem[]> = writable([])

// derived stores for available attribute choices
// TODO
