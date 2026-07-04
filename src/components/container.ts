import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import { property } from 'lit/decorators.js';

@customElement('onyks-container')
export class OnyksContainer extends LitElement
{
    @property({type: String, reflect: true})
    gap = "m";

    @property({type: String, reflect: true})
    padding = "m";

    @property({type: String, reflect: true})
    type = "stack"; //grid, stack, group

    @property({type: Number, reflect: true})
    cols = 0;

    @property({type: String, reflect: true})
    align = "start"; //start, center, end

    @property({type: String, reflect: true})
    justify = "start"; //start, center, end, between

    render()
    {
        return html`<slot></slot>`;
    }

    updated(changedProperties: any) 
    {
        super.updated(changedProperties);
        if (changedProperties.has('cols')) 
        {
            this.style.setProperty('--cols', `${this.cols}`);
        }
    }

    static styles = [css`

        :host([type="stack"]) 
        {
            display: flex;
            flex-direction: column;
        }

    :host([type="group"]) 
    {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    :host([type="grid"]) 
    {
        display: grid;
        grid-template-columns: repeat(var(--cols, 1), 1fr);
    }

    :host([gap="s"]) 
    {
        gap: var(--onyks-spacing-sm); 
    }

    :host([gap="m"]) 
    {
        gap: var(--onyks-spacing-md); 
    }

    :host([gap="l"]) 
    {
        gap: var(--onyks-spacing-lg);
    }

    :host([gap="xl"]) 
    {
        gap: var(--onyks-spacing-xl);
    }

    :host([padding="s"]) 
    { 
        padding: var(--onyks-spacing-sm); 
    }
        
    :host([padding="m"]) 
    { 
        padding: var(--onyks-spacing-md); 
    }

    :host([padding="l"]) 
    { 
        padding: var(--onyks-spacing-lg); 
    }

    :host([padding="xl"]) 
    { 
        padding: var(--onyks-spacing-xl); 
    }

    :host([align="center"]) 
    {
        align-items: center; 
    }

    :host([align="end"]) 
    {
        align-items: flex-end; 
    }
    
    :host([justify="between"]) 
    {
        justify-content: space-between; 
    }

    :host([justify="center"]) 
    {
        justify-content: center; 
    }

    :host([justify="end"]) 
    {
        justify-content: flex-end; 
    }
`];
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-container': OnyksContainer
    }
}