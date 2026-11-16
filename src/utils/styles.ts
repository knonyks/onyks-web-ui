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
                :host([${unsafeCSS(property)}="2xl"]) ${unsafeCSS(selector)}
                { 
                    font-size: var(--onyks-size-2xl, 28px); 
                }
                :host([${unsafeCSS(property)}="3xl"]) ${unsafeCSS(selector)}
                { 
                    font-size: var(--onyks-size-3xl, 32px); 
                }
                :host([${unsafeCSS(property)}="4xl"]) ${unsafeCSS(selector)}
                { 
                    font-size: var(--onyks-size-4xl, 36px); 
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
                :host([size="2xl"])
                { 
                    font-size: var(--onyks-size-2xl, 28px); 
                }
                :host([size="3xl"])
                { 
                    font-size: var(--onyks-size-3xl, 32px); 
                }
                :host([size="4xl"])
                { 
                    font-size: var(--onyks-size-4xl, 36px); 
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

    static gap = (selector: string = '', property: string = 'gap') =>
    {
        return css`
            :host([${unsafeCSS(property)}="s"]) ${unsafeCSS(selector)}
            { 
                gap: var(--onyks-spacing-sm, 4px); 
            }
            :host([${unsafeCSS(property)}="m"]) ${unsafeCSS(selector)}
            { 
                gap: var(--onyks-spacing-md, 8px); 
            }
            :host([${unsafeCSS(property)}="l"]) ${unsafeCSS(selector)}
            { 
                gap: var(--onyks-spacing-lg, 12px); 
            }
            :host([${unsafeCSS(property)}="xl"]) ${unsafeCSS(selector)}
            { 
                gap: var(--onyks-spacing-xl, 16px); 
            }
        `
    }

    static padding = (selector: string = '', property: string = 'padding') =>
    {
        return css`
            :host([${unsafeCSS(property)}="s"]) ${unsafeCSS(selector)}
            { 
                padding: var(--onyks-spacing-sm, 4px); 
            }
            :host([${unsafeCSS(property)}="m"]) ${unsafeCSS(selector)}
            { 
                padding: var(--onyks-spacing-md, 8px); 
            }
            :host([${unsafeCSS(property)}="l"]) ${unsafeCSS(selector)}
            { 
                padding: var(--onyks-spacing-lg, 12px); 
            }
            :host([${unsafeCSS(property)}="xl"]) ${unsafeCSS(selector)}
            { 
                padding: var(--onyks-spacing-xl, 16px); 
            }
        `
    }

    static radius = (selector: string = '', property: string = 'radius') =>
    {
        return css`
            :host([${unsafeCSS(property)}="s"]) ${unsafeCSS(selector)}
            {
                border-radius: var(--onyks-radius-sm);
            }
            :host([${unsafeCSS(property)}="m"]) ${unsafeCSS(selector)}
            {
                border-radius: var(--onyks-radius-md);
            }
            :host([${unsafeCSS(property)}="l"]) ${unsafeCSS(selector)}
            {
                border-radius: var(--onyks-radius-lg);
            }
            :host([${unsafeCSS(property)}="xl"]) ${unsafeCSS(selector)}
            {
                border-radius: var(--onyks-radius-xl);
            }
        `
    }

    static background = (selector: string = '', property: string = "background") =>
    {
        return css`
        :host([${unsafeCSS(property)}="red"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-red);
            color: var(--onyks-on-red);
            --background-shadow: hsl(from var(--onyks-red, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="blue"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-blue);
            color: var(--onyks-on-blue);
            --background-shadow: hsl(from var(--onyks-blue, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="green"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-green);
            color: var(--onyks-on-green);
            --background-shadow: hsl(from var(--onyks-green, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="yellow"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-yellow);
            color: var(--onyks-on-yellow);
            --background-shadow: hsl(from var(--onyks-yellow, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="gray"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-gray);
            color: var(--onyks-on-gray);
            --background-shadow: hsl(from var(--onyks-gray, #999) h s 30%);
        }
        
        :host([${unsafeCSS(property)}="purple"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-purple);
            color: var(--onyks-on-purple);
            --background-shadow: hsl(from var(--onyks-purple, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="orange"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-orange);
            color: var(--onyks-on-orange);
            --background-shadow: hsl(from var(--onyks-orange, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="pink"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-pink);
            color: var(--onyks-on-pink);
            --background-shadow: hsl(from var(--onyks-pink, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="cyan"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-cyan);
            color: var(--onyks-on-cyan);
            --background-shadow: hsl(from var(--onyks-cyan, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="teal"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-teal);
            color: var(--onyks-on-teal);
            --background-shadow: hsl(from var(--onyks-teal, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="indigo"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-indigo);
            color: var(--onyks-on-indigo);
            --background-shadow: hsl(from var(--onyks-indigo, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="lime"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-lime);
            color: var(--onyks-on-lime);
            --background-shadow: hsl(from var(--onyks-lime, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="error"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-error);
            color: var(--onyks-on-error);
            --background-shadow: hsl(from var(--onyks-error, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="warning"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-warning);
            color: var(--onyks-on-warning);
            --background-shadow: hsl(from var(--onyks-warning, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="info"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-info);
            color: var(--onyks-on-info);
            --background-shadow: hsl(from var(--onyks-info, #999) h s 30%);
        }

        :host([${unsafeCSS(property)}="success"])${unsafeCSS(selector)}
        {
            background-color: var(--onyks-success);
            color: var(--onyks-on-success);
            --background-shadow: hsl(from var(--onyks-success, #999) h s 30%);
        }
        `
    }

    static color = (selector: string = '', property: string = "color") =>
    {
        return css`
        :host([${unsafeCSS(property)}="red"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-red);
        }

        :host([${unsafeCSS(property)}="blue"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-blue);
        }

        :host([${unsafeCSS(property)}="green"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-green);
        }

        :host([${unsafeCSS(property)}="yellow"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-yellow);
        }

        :host([${unsafeCSS(property)}="gray"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-gray);
        }
        
        :host([${unsafeCSS(property)}="purple"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-purple);
        }

        :host([${unsafeCSS(property)}="orange"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-orange);
        }

        :host([${unsafeCSS(property)}="pink"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-pink);
        }

        :host([${unsafeCSS(property)}="cyan"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-cyan);
        }

        :host([${unsafeCSS(property)}="teal"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-teal);
        }

        :host([${unsafeCSS(property)}="indigo"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-indigo);
        }

        :host([${unsafeCSS(property)}="lime"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-lime);
        }

        :host([${unsafeCSS(property)}="error"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-error);
        }

        :host([${unsafeCSS(property)}="warning"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-warning);
        }

        :host([${unsafeCSS(property)}="info"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-info);
        }

        :host([${unsafeCSS(property)}="success"]) ${unsafeCSS(selector)}
        {
            color: var(--onyks-success);
        }
        `
    }
}

export class OnyksSchemas
{
    static background = [
        'red',
        'blue',
        'green',
        'yellow',
        'gray',
        'purple',
        'orange',
        'pink',
        'cyan',
        'teal',
        'indigo',
        'lime',
        'error',
        'warning',
        'info',
        'success'
    ] as const

    static size = [
        's',
        'm',
        'l',
        'xl'
    ] as const

    static padding = 
    [
        's',
        'm',
        'l',
        'xl'
    ] as const

    static side = 
    [
        'none',
        'left',
        'right',
        'top',
        'bottom'
    ] as const

    static radius = 
    [
        'none',
        's',
        'm',
        'l',
        'xl'
    ] as const

    static color = [
        'none',
        'red',
        'blue',
        'green',
        'yellow',
        'gray',
        'purple',
        'orange',
        'pink',
        'cyan',
        'teal',
        'indigo',
        'lime',
        'error',
        'warning',
        'info',
        'success'
    ] as const
}