import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { style_scrollbar, style_size } from './styles';

@customElement('onyks-list-element')
export class Onyks_List_Element extends LitElement 
{
    @property({type: String, reflect: true})
    size = "m";

    @property({type: Boolean, reflect: true})
    marked = false;

    render()
    {
        return html`<slot></slot>`;
    }

    static styles = [css`
    :host
    {
        display: block;
        padding: var(--spacing-sm);
        background-color: var(--surface-element);
        border: 1px solid var(--surface-border);
        border-radius: var(--spacing-sm);
        padding: var(--spacing-md);
        cursor: pointer;
        user-select: none;
        transition: background-color 0.3s ease;
    }

    :host(:hover)
    {
        background-color: var(--surface-hover);
    }

    :host([marked])
    {
        background-color: var(--surface-marked);
    }

    `, style_size(":host")];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-list': Onyks_List
    }
}

@customElement('onyks-list')
export class Onyks_List extends LitElement 
{
    @property({type: Boolean, reflect: true})
    childrenSpacing = true;

    render()
    {
        return html`<slot></slot>`;
    }

    static styles = [css`
    :host
    {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        overflow-y: auto;
        height: 100%;
        box-sizing: border-box;
        padding: var(--spacing-md);
        border: 1px solid var(--surface-border);
        height: 300px;
        width: 300px;
        border-radius: var(--radius-md);
    }

    :host([childrenSpacing])
    {
        gap: 0;
    }

    :host([childrenSpacing]) ::slotted(onyks-list-element)
    {
        border-radius: 0;
        border-bottom: none;
    }

    :host([childrenSpacing]) ::slotted(onyks-list-element:last-child)
    {
        border-radius: 0 0 var(--radius-md) var(--radius-md);
        border-bottom: 1px solid var(--surface-border);
    }
    
    :host([childrenSpacing]) ::slotted(onyks-list-element:first-child)
    {
        border-radius: var(--radius-md) var(--radius-md) 0 0;
    }



    `, style_scrollbar(":host")];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-list': Onyks_List,
        'onyks-list-element': Onyks_List_Element
    }
}