export type SvelteEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement;
}
