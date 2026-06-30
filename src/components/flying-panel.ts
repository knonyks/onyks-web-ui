import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';


@customElement('onyks-flying-panel')
export class Onyks_Flying_Panel extends LitElement
{
    @property({type: String, reflect: true})
    size = "m";

    render()
    {
        return html`<slot></slot>`;
    }

    static styles = [css`
        :host
        {
            display: flex;
            flex-direction: column;
            height: fit-content;
            width: fit-content;
            padding: var(--spacing-md);
            cursor: pointer;
            user-select: none;
            background-color: var(--surface-element);
            border: 1px solid var(--surface-border);
            transition: background-color 0.3s ease;
            border-radius: var(--radius-md);
        }
    `];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-flying-panel': Onyks_Flying_Panel
    }
}