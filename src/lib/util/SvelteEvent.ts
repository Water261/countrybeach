export type SvelteSubmitEvent = Event & {
	readonly submitter: HTMLElement | null;
} & {
	currentTarget: EventTarget & HTMLFormElement;
};

export type SvelteClickEvent = MouseEvent & {
	currentTarget: EventTarget & HTMLButtonElement;
};
