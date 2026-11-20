import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';


@customElement('onyks-header')
export class OnyksHeader extends LitElement
{
    @property({type: String, reflect: true})
    size = 'm';

    @property({type: String, reflect: true})
    color = 'none';

    @property({type: Boolean, reflect: true})
    underline = false

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
        }

        :host(:not([underline]))::after
        {
            display: none;
        }

        :host([color="none"])::after
        {
            background-color: var(--onyks-on-surface-1);
        }
    `, OnyksStyles.size(), OnyksStyles.color(), OnyksStyles.background('::after', 'color')];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-header': OnyksHeader
    }
}