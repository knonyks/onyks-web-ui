import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { style_size } from './styles';
import { property } from 'lit/decorators.js';

@customElement('onyks-window-button')
export class Onyks_Window_Button extends LitElement 
{
    @property({type: String, reflect: true})
    type = "close"

    @property({type: String, reflect: true})
    size = "xl"

    render()
    {
        return html``;
    }

    static styles = [css`
    :host 
    {
        display: flex;
        flex-direction: row;
        padding: calc(var(--spacing-sm)/2);
        cursor: pointer;
        transition: background-color 0.1s;
        -webkit-app-region: no-drag;
    }

    :host::before 
    {
        font-family: 'bootstrap-icons';
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 100%;
    }

    :host([type="close"])::before 
    {
        content: '\\F62A';
    }

    :host([type="close"]:hover) 
    {
        background-color: var(--color-red);
    }

    :host([type="close"]):hover::before 
    {
        background-color: red;
        padding: 4px;
        border-radius: 4px;
    }

    :host([type="minimize"])::before,
    :host([type="minimalize"])::before 
    {
        content: '\\F2EA';
    }

    :host([type="fullscreen"])::before 
    {
        content: '\\F3DF';
    }

    :host(:hover:not([type="close"])) 
    {
        background-color: rgba(255, 255, 255, 0.1);
    }

    :host([size="s"][type="fullscreen"]) 
    {
        font-size: calc(var(--size-sm)/2)
    }

    :host([size="m"][type="fullscreen"]) 
    {
        font-size: calc(var(--size-md)/2)
    }

    :host([size="l"][type="fullscreen"]) 
    {
        font-size: calc(var(--size-lg)/2)
    }

    :host([size="xl"][type="fullscreen"]) 
    {
        font-size: calc(var(--size-xl)/2)
    }
    `, style_size(':host')];
}

@customElement('onyks-window-bar')
export class Onyks_Window_Bar extends LitElement 
{
    @property({ type: String, reflect: true }) 
    text = "";

    @property({type: String, reflect: true})
    size = "m"

    render()
    {
        return html`
            <div class="text">${this.text}</div>
            <div class="btns"><slot></slot></div>`;
    }
 
    static styles = [css`
        :host 
        {
            width: fit-content;
            height: fit-content;
            background-color: var(--surface-element);
            border-radius: var(--radius-sm);
            padding: calc(var(--spacing-sm)/2);
            width: 100%;
            box-sizing: border-box;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            border: 1px solid var(--surface-border);
        }

        .text
        {
            grid-column: 2;
        }

        .btns
        {
            grid-column: 3;
            justify-self: end;
            display: flex;
            flex-direction: row;
            -webkit-app-region: no-drag;
        }

        ::slotted(*:last-child) 
        {
            border-top-right-radius: var(--radius-sm);
            border-bottom-right-radius: var(--radius-sm);
        }
    `, style_size(':host')];
}



declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-window-button': Onyks_Window_Button,
        'onyks-window-bar': Onyks_Window_Bar
    }
}