import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { onyksStyleSize } from './_styles';

@customElement('onyks-avatar')
export class OnyksAvatar extends LitElement
{
    @property({type: String, reflect: true})
    size = "m";

    @property({type: String, reflect: true})
    src = "";
    
    @property({type: String, reflect: true})
    shape = "circle";

    render()
    {
        return html`<span class="onyks-size">${this.src}</span>`;
    }

    static styles = [css`
        :host
        {
            display: flex;
            padding: var(--onyks-spacing-md);
            cursor: pointer;
            user-select: none;
            background-color: var(--onyks-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            transition: background-color 0.3s ease;
            justify-content: center;
            align-items: center;
        }
        
        :host(:hover)
        {
            background-color: var(--onyks-surface-1-hover);
        }

        :host([shape="circle"])
        {
            border-radius: 50%;
        }

        :host([shape="square"])
        {
            border-radius: var(--onyks-spacing-sm);
        }

        :host([size="s"])
        {
            width: var(--onyks-size-sm);
            height: var(--onyks-size-sm);
        }

        :host([size="m"])
        {
            width: var(--onyks-size-md);
            height: var(--onyks-size-md);
        }

        :host([size="l"])
        {
            width: var(--onyks-size-lg);
            height: var(--onyks-size-lg);
        }

        :host([size="xl"])
        {
            width: var(--onyks-size-xl);
            height: var(--onyks-size-xl);
        }

        :host([size="xl"])
        {
            width: var(--onyks-size-xl);
            height: var(--onyks-size-xl);
        }
    `, onyksStyleSize];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-avatar': OnyksAvatar
    }
}