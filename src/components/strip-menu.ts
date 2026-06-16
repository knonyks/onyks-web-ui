import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { applyStyle } from './_styles';

@customElement('onyks-strip-menu-option')
export class OnyksStripMenuOption extends LitElement 
{
    @property({type: String, reflect: true}) 
    icon = "F62A"; 

    @property({ type: Boolean, reflect: true })
    marked = false;

    @property({type: String, reflect: true})
    size = "xl"

    render() 
    {
        return html`    
            <style>
                :host::before 
                {
                    font-family: 'bootstrap-icons';
                    content: "\\${this.icon}";
                }
            </style>
        `;
    }

    static styles = [css`
        :host([size="s"])
        {
            width: var(--size-sm);
            height: var(--size-sm);
        }

        :host([size="m"])
        {
            width: var(--size-md);
            height: var(--size-md);
        }

        :host([size="l"])
        {
            width: var(--size-lg);
            height: var(--size-lg);
        }

        :host([size="xl"])
        {
            width: var(--size-xl);
            height: var(--size-xl);
        }

        :host
        {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--strip-menu-option-background);
            border: 2px solid var(--strip-menu-border-color);
            transition: background-color 0.3s ease;
            padding: var(--spacing-md);
            border-radius: var(--spacing-sm);
            cursor: pointer;
        }

        :host(:hover)
        {
            background-color: var(--strip-menu-option-background-hover);
        }

        :host([marked])
        {
            background-color: var(--strip-menu-option-background-marked);
        }
    `, applyStyle('size')];
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
            background-color: var(--strip-menu-background);
            border: 2px solid var(--strip-menu-border-color);
            border-radius: var(--radius-md);
            display: flex;
            gap: var(--spacing-sm);
            width: fit-content;
            height: fit-content;
            padding: var(--spacing-sm);
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