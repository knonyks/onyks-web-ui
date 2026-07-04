import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { onyksStyleSize } from './_styles';


@customElement('onyks-text')
export class OnyksText extends LitElement
{
    @property({type: String, reflect: true})
    size = "m";

    render()
    {
        return html`<div class="onyks-size"><slot></slot></div>`;
    }

    static styles = [css`
    :host 
    {
        font-family: var(--onyks-font);
        display: block;
    }
`, onyksStyleSize];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-text': OnyksText
    }
}