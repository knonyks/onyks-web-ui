import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { applyStyle } from './_styles';
import { property } from 'lit/decorators.js';

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
        display: block;
        width: 2rem;
        height: 100%;
        cursor: pointer;
        border-radius: var(--radius-sm);
    }

    :host([type="close"])
    {
        background-color: var(--window-bar-button-close-background);
    }   

    :host([type="minimalize"]),
    :host([type="minimize"])
    {
        background-color: yellow;
        background-color: var(--window-bar-button-minimize-background);
    }

    :host([type="fullscreen"])
    {
        background-color: green;
        background-color: var(--window-bar-button-fullscreen-background);
    }

    `, applyStyle('size', 'button')];
}

@customElement('onyks-window-bar')
export class OnyksWindowBar extends LitElement 
{
    @property({ type: String, reflect: true }) 
    text = "Placeholder";

    @property({type: String, reflect: true})
    size = "xl"

    render()
    {
        return html`
            <div></div>
            <div class="text">${this.text}</div>
            <div class="btns"><slot></slot></div>
        `;
    }

    static styles = [css`
        :host
        {
            height: fit-content;
            background-color: var(--window-bar-background);
            width: 100%;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            border-radius: var(--radius-md);
            height: fit-content;
            user-select: none;
            border: 1px solid var(--window-bar-border-color);
        }

        .text
        {
            text-align: center;
            justify-self: center;
            padding: var(--spacing-sm);
        }

        .btns
        {
            justify-self: end;
            display: flex;
            flex-direction: row;
            height: 100%;
            padding: var(--spacing-sm);
            box-sizing: border-box;
            gap: var(--spacing-sm);
            -webkit-app-region: no-drag;
        }

        ::slotted(onyks-window-bar-button:last-child)
        {
            border-top-right-radius: var(--radius-sm);
            border-bottom-right-radius: var(--radius-sm);
        }

    `, applyStyle('size')];
}



declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-window-button': OnyksWindowBarButton,
        'onyks-window-bar': OnyksWindowBar
    }
}