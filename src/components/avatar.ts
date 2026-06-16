import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { applyStyle } from './_styles';

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
        return html`${this.src}`;
    }

    static styles = [css`
        :host
        {
            display: flex;
            padding: var(--spacing-md);
            cursor: pointer;
            user-select: none;
            background-color: var(--avatar-background);
            border: 2px solid var(--avatar-border-color);
            transition: background-color 0.3s ease;
            justify-content: center;
            align-items: center;
        }
        
        :host(:hover)
        {
            background-color: var(--avatar-background-hover);
        }

        :host([shape="circle"])
        {
            border-radius: 50%;
        }

        :host([shape="square"])
        {
            border-radius: var(--spacing-sm);
        }

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

        :host([size="xl"])
        {
            width: var(--size-xl);
            height: var(--size-xl);
        }
    `, applyStyle('size')];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-avatar': OnyksAvatar
    }
}