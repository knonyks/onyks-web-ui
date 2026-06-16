import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('onyks-panel')
export class OnyksPanel extends LitElement 
{
    @property({type: String, reflect: true})
    side = 'left'

    @property({type: String, reflect: true, attribute: 'all-round'})
    allRound = false

    render() 
    {
        return html`<slot></slot>`
    }

    static styles = css`
        :host 
        {
            display: block;
            height: 200px;
            width: 200px;
            background-color: var(--panel-background);
            padding: var(--spacing-md);
            border: 3px solid var(--panel-border-color);
        }

        :host([all-round])
        {
            border-radius: var(--radius-lg);
        }

        :host([side="left"]:not([all-round]))
        {
            border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
        }
        
        :host([side="right"]:not([all-round]))
        {
            border-radius: var(--radius-lg) 0 0 var(--radius-lg);
        }

        :host([side="top"]:not([all-round]))
        {
            border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }

        :host([side="bottom"]:not([all-round]))
        {
            border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        }
    `
}


declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-panel': OnyksPanel
    }
}