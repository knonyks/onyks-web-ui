import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';
import { style_size } from './_styles';

@customElement('onyks-strip-menu-option')
export class Onyks_Strip_Menu_Option extends LitElement 
{
    @property({type: String, reflect: true}) icon = "F62A"; 

    @property({ type: Boolean, reflect: true }) marked = false;

    @property({type: String, reflect: true})
    size = "m";

    render() 
    {
        const parsedCode = parseInt(this.icon, 16);
        const converted_icon = isNaN(parsedCode) ? '' : String.fromCodePoint(parsedCode);

        return html`<style>
            :host {
                --decoded-icon: '${converted_icon}';
            }
        </style>`;
    }

    static styles = [css`
        :host 
        {
            display: block;'
            height: fit-content;
            width: fit-content;
            padding: var(--spacing-md); 
            cursor: pointer;
            user-select: none;


            border-radius: var(--radius-md, 4px);

            transition: background-color 0.2s;

        }

        :host::before {
            font-family: 'bootstrap-icons';
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            content: var(--decoded-icon);
            width: fit-content;
            height: fit-content;
        }

        :host(:hover) {
            background-color: var(--surface-hover, red) !important;
        }

        :host([marked]) {
            background-color: var(--surface-marked, green) !important;
        }
    `, style_size(':host')];
}

@customElement('onyks-strip-menu')
export class Onyks_Strip_Menu extends LitElement 
{
    @property({type: String, reflect: true})
    type = "v"

    @property({type: String, reflect: true})
    size = "l"

    render()
    {
        return html`<slot></slot>`;
    }

    static styles = [css`
        :host 
        {
            display: flex;
            background-color: var(--surface-element);
            border: 1px solid var(--surface-border);
            gap: 1rem;
            align-items: center;
            font-weigth: bold;
        }

        :host([type="v"])
        {
            flex-direction: column;
            height: fit-content;
            width: fit-content;
            padding: var(--spacing-sm);
            border-radius: var(--radius-md);
        }

        :host([type="h"])
        {
            flex-direction: row;
        }

    `, style_size(':host')];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-strip-menu': Onyks_Strip_Menu,
        'onyks-strip-menu-option': Onyks_Strip_Menu_Option
    }
}