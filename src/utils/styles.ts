import { css } from "lit"
import { unsafeCSS } from "lit"

export class OnyksStyles 
{
    static size = (selector: string = '', property: string = 'size') =>
    {
        if(selector != '')
        {
            return css`
                :host([${unsafeCSS(property)}="s"]) ${unsafeCSS(selector)}
                { 
                    font-size: var(--onyks-size-sm, 12px); 
                }
                :host([${unsafeCSS(property)}="m"]) ${unsafeCSS(selector)}
                { 
                    font-size: var(--onyks-size-md, 16px); 
                }
                :host([${unsafeCSS(property)}="l"]) ${unsafeCSS(selector)}
                { 
                    font-size: var(--onyks-size-lg, 20px); 
                }
                :host([${unsafeCSS(property)}="xl"]) ${unsafeCSS(selector)}
                { 
                    font-size: var(--onyks-size-xl, 24px); 
                }
            `
        }
        else
        {
            return css`
                :host([size="s"])
                { 
                    font-size: var(--onyks-size-sm, 12px); 
                }
                :host([size="m"])
                { 
                    font-size: var(--onyks-size-md, 16px); 
                }
                :host([size="l"])
                { 
                    font-size: var(--onyks-size-lg, 20px); 
                }
                :host([size="xl"])
                { 
                    font-size: var(--onyks-size-xl, 24px); 
                }
            `
        }
    }

    static scroll = (selector: string) =>
    {
        return css`

            ${unsafeCSS(selector)}
            {
                scrollbar-color: var(--onyks-scroll-thumb, auto) var(--onyks-scroll-track, auto);
                scrollbar-width: thin;
            }

            ${unsafeCSS(selector)}::-webkit-scrollbar 
            {
                width: var(--onyks-scroll-size, 8px);
            }

            ${unsafeCSS(selector)}::-webkit-scrollbar-track 
            {
                background: var(--onyks-scroll-track);
                border-radius: 3px;
            }

            ${unsafeCSS(selector)}::-webkit-scrollbar-thumb 
            {
                background: var(--onyks-scroll-thumb);
                border-radius: 3px;
            }

        `
    }
}