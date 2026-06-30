import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';


@customElement('onyks-header')
export class OnyksHeader extends LitElement
{
    @property({type: Number, reflect: true})
    level = 1;

    render()
    {
        return html`<div><slot></slot></div>`;
    }

    static styles = [css`
    :host 
    {
        font-family: var(--onyks-font);
        display: block;
    }

    :host([level="1"])
    {
        font-size: var(--onyks-size-4xl);
    }

    :host([level="2"])
    {
        font-size: var(--onyks-size-3xl);
    }

    :host([level="3"])
    {
        font-size: var(--onyks-size-2xl);
    }

    :host([level="4"])
    {
        font-size: var(--onyks-size-xl);
    }

    :host([level="5"])
    {
        font-size: var(--onyks-size-lg);
    }

    :host([level="6"])
    {
        font-size: var(--onyks-size-md);
    }
`];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-header': OnyksHeader
    }
}