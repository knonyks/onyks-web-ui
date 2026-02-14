import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';

@customElement('onyks-button')
export class Onyks_Button extends LitElement 
{
    @property({type: String, reflect: true})
    size = 'm';

    @property({type: String, reflect: true})
    background = 'red';

    @property({type: String, reflect: true})
    href = ""

    @property({ type: String })
    type = 'button';

    @property({ type: Boolean, reflect: true})
    disabled = false;

    render() 
    {
        const classes = {
            ['btn']: true,
            [`size-${this.size}`]: true,
            [`bg-${this.background}`]: true
        }

        if (this.href) {
            return html`
                <a 
                    class=${classMap(classes)} 
                    href="${this.href}"
                    aria-disabled="${this.disabled ? 'true' : 'false'}"  tabindex="${this.disabled ? '-1' : '0'}"
                >
                    <slot></slot>
                </a>`;
        }

        return html`
            <button 
                class=${classMap(classes)} 
                type="${this.type}" 
                ?disabled="${this.disabled}" >
                <slot></slot>
            </button>`;

    }

    static styles = css`
        :host
        {
            display: inline-block;
            vertical-align: middle;
        }
        .btn
        {
            box-sizing: border-box;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: var(--spacing-sm) var(--spacing-md);
            border: 1px solid transparent;
            cursor: pointer;
            font-family: var(--font);
            text-decoration: none;
            text-align: center;
            border-radius: var(--radius-sm, 4px);
            transform: translateY(-4px); 
            transition: all 0.1s ease;
            line-height: 1.5;
        }
        .bg-blue
        {
            background-color: var(--color-blue);
            box-shadow: 0 7px 0 var(--sub-color-blue);
            color: white;
        }
        .bg-blue:hover
        {
            transform: translateY(0px); 
            box-shadow: 0 3px 0 var(--sub-color-blue); 
        }

        .bg-green
        {
            background-color: var(--color-green);
            box-shadow: 0 7px 0 var(--sub-color-green);
            color: black;
        }
        .bg-green:hover
        {
            transform: translateY(0px); 
            box-shadow: 0 3px 0 var(--sub-color-green); 
        }
        .bg-red
        {
            background-color: var(--color-red);
            box-shadow: 0 7px 0 var(--sub-color-red); 
            color: white;
        }
        .bg-red:hover
        {
            transform: translateY(0px); 
            box-shadow: 0 3px 0 var(--sub-color-red); 
        }

        .size-s
        {
            font-size: var(--size-sm);
        }

        .size-m
        {
            font-size: var(--size-md);
        }

        .size-l
        {
            font-size: var(--size-lg);
        }

        .size-xl
        {
            font-size: var(--size-xl);
        }

        .btn:focus-visible 
        {
            outline: 2px solid var(--color-focus, blue);
            outline-offset: 2px;
        }

        button:disabled, a[aria-disabled="true"]
        {
            opacity: 0.6;
            pointer-events: none;
            cursor: not-allowed;
        }

        *
        {
            font-family: var(--font);
        }
    `
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-button': Onyks_Button
    }
}