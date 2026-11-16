import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';

@customElement('onyks-window-bar-button')
export class OnyksWindowBarButton extends LitElement 
{
    @property({type: String, reflect: true})
    type = "close"

    @property({type: String, reflect: true})
    size = "xl"

    @property({type: Boolean, reflect: true})
    disabled = false

    render()
    {
        return html``;
    }

    static styles = [css`
    :host 
    {

    }

    :host([type="close"])
    {

    }   

    :host([type="minimalize"]),
    :host([type="minimize"])
    {

    }

    :host([type="fullscreen"])
    {

    }

    `];
}

@customElement('onyks-window-bar')
export class OnyksWindowBar extends LitElement 
{
    @property({type: String, reflect: true})
    size = "m"

    @property({type: Boolean, reflect: true})
    radius = false

    @property({type: Boolean, reflect: true})
    border = false

    render()
    {
        return html`
            dasd
        `;
    }

    static styles = [css`
        :host
        {
            display: block;
            background-color: var(--onyks-surface-1);
            height: fit-content;
            width: 100%;
            border: 1px solid var(--onyks-surface-1-border);
            padding: var(--onyks-spacing-sm);
            box-sizing: border-box;
        }
    `, OnyksStyles.size(), OnyksStyles.radius()];
}



declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-window-button': OnyksWindowBarButton,
        'onyks-window-bar': OnyksWindowBar
    }
}