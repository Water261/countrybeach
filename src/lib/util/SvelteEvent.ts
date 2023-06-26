export type SvelteSubmitEvent = Event & {
    readonly submitter: HTMLElement | null;
} & {
    currentTarget: EventTarget & HTMLFormElement;
};
