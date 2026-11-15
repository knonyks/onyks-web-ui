import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';


@customElement('onyks-header')
export class OnyksHeader extends LitElement
{
    @property({type: Number, reflect: true})
    size = 'm';

    render()
    {
        return html`<slot></slot>`;
    }

    static styles = [css`
        :host 
        {
            position: relative;
            font-family: var(--onyks-font);
            display: block;
            font-weight: bold;
            color: var(--onyks-accent);
            line-height: 1.3;
            overflow-wrap: anywhere;
            padding-bottom: var(--onyks-spacing-sm);
        }

        :host::after
        {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 40px;
            height: 2px;
            background-color: var(--onyks-accent);
        }
    `, OnyksStyles.size()];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-header': OnyksHeader
    }
}