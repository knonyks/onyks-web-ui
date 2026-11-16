import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { OnyksStyles } from '../utils/styles'

@customElement('onyks-panel')
export class OnyksPanel extends LitElement 
{
    @property({type: String, reflect: true})
    side = 'none'

    @property({type: String, reflect: true, attribute: 'radius'})
    radius = 'm'

    @property({type: String, reflect: true, attribute: 'padding'})
    padding = 'm'

    render() 
    {
        return html`<slot></slot>`
    }

    static styles = [css`
        :host 
        {
            display: block;
            height: fit-content;
            width: fit-content;
            background-color: var(--onyks-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            font-family: var(--onyks-font);
            color: var(--onyks-on-surface-1);
            box-sizing: border-box;
        }

        :host([side="left"]) {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }

        :host([side="right"]) {
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
        }

        :host([side="top"]) {
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }

        :host([side="bottom"]) {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }
    `, OnyksStyles.size(), OnyksStyles.scroll(':host'), OnyksStyles.padding(), OnyksStyles.radius()]
}


declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-panel': OnyksPanel
    }
}