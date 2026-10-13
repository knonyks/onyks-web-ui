import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { OnyksStyles } from '../utils/styles'

@customElement('onyks-tag')
export class OnyksTag extends LitElement 
{
    @property({type: String, reflect: true})
    size = "m"

    @property({type: Boolean, reflect: true})
    closable = false

    @property({type: String, reflect: true})
    icon = 'F5B2'

    @property({type: String, reflect: true})
    background = 'green'

    private handleClose = () =>
    {
        this.dispatchEvent(new CustomEvent('close', {bubbles: true, composed: true}))
    }

    render()
    {
        return html`
            <style>
                .tag-icon::before 
                {
                    font-family: 'bootstrap-icons';
                    content: "\\${this.icon}";
                }
            </style>
            ${this.icon ? html`<span class="tag-icon" ></span>` : ''}
            <span class="text"><slot></slot></span>
            ${this.closable ? html`<span class="close-icon" @click=${this.handleClose}></span>` : ''}
        `
    }

    static styles = [css`
        .tag-icon::before
        {
            display: inline-block;
            font-family: 'bootstrap-icons';
        }

        .text
        {
            width: 100%;
            white-space:nowrap; 
            overflow:hidden; 
            white-space:nowrap;
            text-overflow: ellipsis;
        }

        .tag-icon
        {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .close-icon::before
        {
            display: inline-block;
            font-family: 'bootstrap-icons';
            content: '\\F62A';
        }

        :host
        {
            display: inline-flex;
            align-items: center;
            background-color: var(--onyks-accent);
            color: var(--onyks-on-accent);
            border-radius: var(--onyks-radius-md);
            padding: var(--onyks-spacing-sm);
            display: flex;
            gap: var(--onyks-spacing-sm);
            max-width: 300px;
        }

        :host([background="accent"])
        {
            background-color: var(--onyks-accent);
            color: var(--onyks-on-accent);
        }

        :host([background="blue"])
        {
            background-color: var(--onyks-blue);
            color: var(--onyks-on-blue);
        }

        :host([background="green"])
        {
            background-color: var(--onyks-green);
            color: var(--onyks-on-green);
        }

        :host([background="red"])
        {
            background-color: var(--onyks-red);
            color: var(--onyks-on-red);
        }

        :host([background="yellow"])
        {
            background-color: var(--onyks-yellow);
            color: var(--onyks-on-yellow);
        }

        :host([background="purple"])
        {
            background-color: var(--onyks-purple);
            color: var(--onyks-on-purple);
        }
        
        :host([background="gray"])
        {
            background-color: var(--onyks-gray);
            color: var(--onyks-on-gray);
        }
    `, OnyksStyles.size('')]
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-tag': OnyksTag
    }
}