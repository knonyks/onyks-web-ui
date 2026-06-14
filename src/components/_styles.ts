import { css, unsafeCSS } from 'lit';

export const styleSize = (selector: string) => 
{
    const sel = unsafeCSS(selector);
    return css`
        :host([size="s"]) ${sel}
        { 
            font-size: var(--size-sm, 12px); 
        }
        :host([size="m"]) ${sel}
        { 
            font-size: var(--size-md, 16px); 
        }
        :host([size="l"]) ${sel} 
        { 
            font-size: var(--size-lg, 20px); 
        }
        :host([size="xl"]) ${sel}
        { 
            font-size: var(--size-xl, 24px); 
        }
    `;
};

export const style_size = styleSize


export const styleScrollbar = (selector: string) => 
{
    const sel = unsafeCSS(selector);
    return css`
        ${sel}
        {
            scrollbar-width: thin;
            scrollbar-color: var(--surface-border) var(--surface-element);
        }

        ${sel}::-webkit-scrollbar 
        { 
            width: 10px; 
            height: 10px; 
        }
            
        ${sel}::-webkit-scrollbar-track,
        ${sel}::-webkit-scrollbar-corner 
        {
            background: var(--surface-element);
        }

        ${sel}::-webkit-scrollbar-thumb 
        {
            background-color: var(--surface-border);
            border-radius: var(--radius-md);
            border: 2px solid var(--surface-element);
        }

        ${sel}::-webkit-scrollbar-thumb:hover 
        {
            background-color: var(--color-primary);
        }
    `;
};

export const style_scrollbar = styleScrollbar

export const styleFont = (selector: string) =>
{
    const sel = unsafeCSS(selector);
    return css`
        ${sel}
        {
            font-family: var(--font-family);
        }
    `
};

export const applyStyle = (mode: string, selector: string = '') =>
{
    switch(mode)
    {
        case 'size':
            return styleSize(selector)
        case 'scrollbar':
            return styleScrollbar(selector)
        case 'font':
            return styleFont(selector);
    }
    return styleSize(selector)
};


