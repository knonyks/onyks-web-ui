import { css, unsafeCSS } from 'lit';

export const style_size = (selector: string) => 
{
    if (selector.trim() === ':host') 
    {
        return css`
            :host([size="s"]) { font-size: var(--size-sm, 12px); }
            :host([size="m"]) { font-size: var(--size-md, 16px); }
            :host([size="l"]) { font-size: var(--size-lg, 20px); }
            :host([size="xl"]) { font-size: var(--size-xl, 24px); }
        `;
    }

    const sel = unsafeCSS(selector);
    return css`
        ${sel}[size="s"] { font-size: var(--size-sm, 12px); }
        ${sel}[size="m"] { font-size: var(--size-md, 16px); }
        ${sel}[size="l"] { font-size: var(--size-lg, 20px); }
        ${sel}[size="xl"] { font-size: var(--size-xl, 24px); }
    `;
};

export const style_scrollbar = (selector: string) => 
{
    const sel = unsafeCSS(selector);

    return css`
        ${sel} {
            scrollbar-width: thin;
            scrollbar-color: var(--surface-border) var(--surface-element);
        }

        ${sel}::-webkit-scrollbar { 
            width: 10px; 
            height: 10px; 
        }
            
        ${sel}::-webkit-scrollbar-track,
        ${sel}::-webkit-scrollbar-corner {
            background: var(--surface-element);
        }

        ${sel}::-webkit-scrollbar-thumb {
            background-color: var(--surface-border);
            border-radius: var(--radius-md);
            border: 2px solid var(--surface-element);
        }

        ${sel}::-webkit-scrollbar-thumb:hover {
            background-color: var(--color-primary);
        }
    `;
};


