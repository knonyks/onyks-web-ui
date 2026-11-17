import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';

@customElement('onyks-tile')
export class OnyksTile extends LitElement 
{
    @property({type: String, reflect: true}) 
    icon = "F62A";

    @property({ type: Boolean, reflect: true })
    selected = false;

    @property({type: String, reflect: true})
    size = "m"

    @property({type: String, reflect: true})
    gap = "m"

    @property({type: String, reflect: true})
    padding = "m"

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
            <span class="icon"></span>
            <slot></slot>
        `;
    }

    static styles = [css`
        :host
        {
            display: flex;
            justify-content: start;
            align-items: center;
            background-color: var(--onyks-surface-1-hover);
            border: 1px solid var(--onyks-surface-1-border);
            transition: background-color 0.3s ease;
            padding: var(--onyks-spacing-md);
            border-radius: var(--onyks-spacing-sm);
            cursor: pointer;
            width: fit-content;
            height: fit-content;
        }

        :host([selected])
        {
            background-color: var(--onyks-surface-1-selected);
        }

        .icon
        {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .slot
        {
            flex: 1;
        }

    `, OnyksStyles.size(), OnyksStyles.padding(), OnyksStyles.gap()];
}


declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-tile': OnyksTile
    }
}