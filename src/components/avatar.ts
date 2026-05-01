import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { style_size } from './styles';

@customElement('onyks-avatar')
export class Onyks_Avatar extends LitElement
{
    @property({type: String, reflect: true})
    type = "emoji"

    @property({type: String, reflect: true})
    src = "";

    @property({type: String, reflect: true})
    alt = "Avatar";

    @property({type: String, reflect: true})
    shape = "circle";

    @property({type: String, reflect: true})
    size = "m";

    render()
    {
        return html`${this.type === "emoji" ? html`${this.src}` : html`<img src="${this.src}" alt="${this.alt}">`}`;
    }

    static styles = [css`
        :host
        {
            display: block;
            height: fit-content;
            width: fit-content;
            padding: var(--spacing-md);
            cursor: pointer;
            user-select: none;
            background-color: var(--surface-element);
            border: 1px solid var(--surface-border);
            transition: background-color 0.3s ease;
        }
        
        :host(:hover)
        {
            background-color: var(--surface-hover);
        }

        :host([shape="circle"])
        {
            border-radius: 50%;
        }

        :host([shape="square"])
        {
            border-radius: var(--spacing-sm);
        }
    `, style_size(":host")];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-avatar': Onyks_Avatar
    }
}