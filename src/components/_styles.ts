import { css } from 'lit';

export const style_scrollbar = css``;

export const style_size = css``;

export const onyksStyleSize = css`
    :host([size="s"]) .onyks-size
    { 
        font-size: var(--size-sm, 12px); 
    }
    :host([size="m"]) .onyks-size
    { 
        font-size: var(--size-md, 16px); 
    }
    :host([size="l"]) .onyks-size
    { 
        font-size: var(--size-lg, 20px); 
    }
    :host([size="xl"]) .onyks-size
    { 
        font-size: var(--size-xl, 24px); 
    }
`;

export const onyksStyleScrollbar = css`
    .onyks-scrollbar::-webkit-scrollbar 
    {
        width: var(--onyks-scroll-size)
    }

    .onyks-scrollbar::-webkit-scrollbar-track 
    {
        background: var(--onyks-scroll-track);
    }

    .onyks-scrollbar::-webkit-scrollbar-thumb 
    {
        background: var(--onyks-scroll-thumb);
        border-radius: var(--onyks-radius-sm);
    }

    @supports not selector(::-webkit-scrollbar) 
    {
        .onyks-scrollbar
        {
            scrollbar-width: auto;
            scrollbar-color: var(--onyks-scroll-thumb) var(--onyks-scroll-track);
        }
    }
`;

export const styleSize = css` `;