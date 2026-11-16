import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';


@customElement('onyks-button')
export class OnyksButton extends LitElement 
{
    @property({ type: String, reflect: true }) 
    size = 'm';
    
    @property({ type: String, reflect: true }) 
    background = 'red';
    
    @property({ type: String, reflect: true }) 
    type = 'button';
    
    @property({ type: String, reflect: true }) 
    href = "";
    
    @property({ type: Boolean, reflect: true }) 
    disabled = false;

    @property({ type: Boolean, reflect: true }) 
    animated = false;
    
    @property({type: String, reflect: true}) 
    icon = ''
    
    render()
    {
        if(this.href) 
        {
            return html`
                <style>
                    .icon::before 
                    {
                        font-family: 'bootstrap-icons';
                        content: "\\${this.icon}";
                    }
                </style>

                <a class="btn icon" href="${this.href}" aria-disabled="${this.disabled ? 'true' : 'false'}" tabindex="${this.disabled ? '-1' : '0'}">
                    <slot></slot>
                </a>
            `;
        } 
        else 
        {
            return html`
                <style>
                    .icon::before 
                    {
                        font-family: 'bootstrap-icons';
                        content: "\\${this.icon}";
                    }
                </style>

                <button class="btn icon" type="${this.type}" ?disabled="${this.disabled}">
                    <slot></slot>
                </button>
            `;
        }
    }

    static styles = [css`
        :host 
        {
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            height: fit-content;
            width: fit-content;
            user-select: none;
            padding-top: 4px;
        }

        .btn 
        {
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            display: inline-flex;
            gap: var(--onyks-spacing-sm);
            width: 100%;
            height: 100%;
            padding: var(--onyks-spacing-sm) var(--onyks-spacing-md); 
            border: 1px solid transparent;
            cursor: pointer;
            font-family: var(--onyks-font, inherit);
            font-weight: 500;
            text-decoration: none;
            text-align: center;
            border-radius: var(--onyks-radius-md, 8px);
            line-height: 1.5;
        }
        
        :host([animated]) .btn
        {
            transform: translateY(-4px);
            transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.1s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 7px 0 var(--background-shadow);
        }
            
        :host([animated]) .btn:hover:not(:disabled) 
        {
            transform: translateY(0px);
            box-shadow: 0 3px 0 var(--background-shadow); 
        }

        :host([animated]) .btn:active:not(:disabled) 
        {
            transform: translateY(3px);
            box-shadow: 0 0px 0 var(--background-shadow);
        }

        button:disabled, a[aria-disabled="true"] 
        {
            opacity: 0.6;
            pointer-events: none;
            cursor: not-allowed;
        }
    `, OnyksStyles.size('.btn'), OnyksStyles.background(' .btn')];

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
        'onyks-button': OnyksButton
    }
}