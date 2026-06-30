import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { applyStyle, onyksStyleSize } from './_styles';

@customElement('onyks-strip-menu-option')
export class OnyksStripMenuOption extends LitElement 
{
    @property({type: String, reflect: true}) 
    icon = "F62A";

    @property({ type: Boolean, reflect: true })
    selected = false;

    @property({type: String, reflect: true})
    size = "xl"

    render() 
    {
        return html`    
            <style>
                .icon::before 
                {
                    font-family: 'bootstrap-icons';
                    content: "\\${this.icon}";
                }
            </style>
            <div class="icon onyks-size"></div>
        `;
    }

    static styles = [css`
        .icon
        {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--onyks-surface-1-border);
            transition: background-color 0.3s ease;
            padding: var(--onyks-spacing-md);
            border-radius: var(--onyks-spacing-sm);
            cursor: pointer;
        }

        :host(:hover) .icon
        {
            background-color: var(--onyks-surface-1-hover);
        }

        :host([selected]) .icon
        {
            background-color: var(--onyks-surface-1-selected);
        }
    `, onyksStyleSize];
}

@customElement('onyks-strip-menu')
export class OnyksStripMenu extends LitElement 
{
    @property({type: String, reflect: true})
    type = "v"

    render()
    {
        return html`<slot></slot>`;
    }

    static styles = [css`
        :host
        {
            background-color: var(--onyks-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            border-radius: var(--onyks-radius-md);
            display: flex;
            gap: var(--onyks-spacing-sm);
            width: fit-content;
            height: fit-content;
            padding: var(--onyks-spacing-sm);
        }

        :host([type="v"])
        {
            flex-direction: column;
        }

        :host([type="h"])
        {
            flex-direction: row;
        }
    `];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-strip-menu': OnyksStripMenu,
        'onyks-strip-menu-option': OnyksStripMenuOption
    }
}