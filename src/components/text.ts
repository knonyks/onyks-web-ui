import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';

@customElement('onyks-text')
export class OnyksText extends LitElement
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
            font-family: var(--onyks-font);
            display: inline;
        }
    `, OnyksStyles.size()];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-text': OnyksText
    }
}