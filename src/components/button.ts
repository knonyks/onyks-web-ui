import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { onyksStyleSize } from './_styles';

@customElement('onyks-button')
export class Onyks_Button extends LitElement 
{
    @property({type: String, reflect: true})
    size = 'm';

    @property({type: String, reflect: true})
    background = 'red';

    @property({ type: String })
    type = 'button';

    @property({type: String, reflect: true})
    href = ""

    @property({ type: Boolean, reflect: true})
    disabled = false;
    
    render() 
    {
        if(this.href)
        {
            return html`<a class="onyks-size btn" href="${this.href}" aria-disabled="${this.disabled ? 'true' : 'false'}"  
            tabindex="${this.disabled ? '-1' : '0'}">
                <slot></slot>
            </a>`
        }
        else
        {
            return html`<button class="onyks-size btn" type="${this.type}" ?disabled="${this.disabled}"><slot></slot></button>`
        }
    }

    static styles = [css`
        :host
        {
            display: inline-block;
            vertical-align: middle;
            height: fit-content;
            width: fit-content;
            padding-top: 4px;
            user-select: none;
        }

        .btn
        {
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            display: inline-flex;
            width: 100%;
            padding: var(--onyks-spacing-sm) var(--onyks-spacing-sm);
            border: 1px solid transparent;
            cursor: pointer;
            font-family: var(--onyks-font);
            text-decoration: none;
            text-align: center;
            border-radius: var(--onyks-radius-md, 4px);
            transform: translateY(-4px); 
            transition: all 0.1s ease;
            line-height: 1.5;
        }

        :host([background="red"]) .btn
        {
            background-color: var(--onyks-red);
            color: var(--onyks-on-red);
            box-shadow: 0 7px 0 hsl(from var(--onyks-red) h s 30%);
        }

        :host([background="blue"]) .btn
        {
            background-color: var(--onyks-blue);
            color: var(--onyks-on-blue);
            box-shadow: 0 7px 0 hsl(from var(--onyks-blue) h s 30%);
        }

        :host([background="green"]) .btn
        {
            background-color: var(--onyks-green);
            color: var(--onyks-on-green);
            box-shadow: 0 7px 0 hsl(from var(--onyks-green) h s 30%);
        }

        :host([background="yellow"]) .btn
        {
            background-color: var(--onyks-yellow);
            color: var(--onyks-on-yellow);
            box-shadow: 0 7px 0 hsl(from var(--onyks-yellow) h s 30%);
        }

        :host([background="red"]) .btn:hover 
        {
            transform: translateY(0px);
            box-shadow: 0 3px 0 var(--onyks-red); 
        }

        :host([background="green"]) .btn:hover 
        {
            transform: translateY(0px);
            box-shadow: 0 3px 0 var(--onyks-green); 
        }

        :host([background="blue"]) .btn:hover 
        {
            transform: translateY(0px);
            box-shadow: 0 3px 0 var(--onyks-blue); 
        }

        :host([background="yellow"]) .btn:hover 
        {
            transform: translateY(0px);
            box-shadow: 0 3px 0 var(--onyks-yellow); 
        }

        button:disabled, a[aria-disabled="true"]
        {
            opacity: 0.6;
            pointer-events: none;
            cursor: not-allowed;
        }
    `, onyksStyleSize]

    constructor() 
    {
        super();
        this.addEventListener('click', (e: Event) => 
        {
            if (this.disabled) 
            {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
    }
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-button': Onyks_Button
    }
}