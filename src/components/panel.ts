import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'



@customElement('onyks-panel')
export class Onyks_Panel extends LitElement 
{
    @property({type: String, reflect: true})
    size = 'l';

    @property({type: Boolean, reflect: true }) 
    opened = false;

    @property({type: String, reflect: true})
    side = 'left'

    @property({type: String, reflect: true})
    allRound = false

    render() 
    {
        return html`<slot class="size-${this.size}"></slot>`
    }

    static styles = css`
        :host 
        {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 300px;
            height: 300px;
            padding: 20px;
            background-color: var(--surface-hover);
            height: 100%;
            border-radius: 5px;
        }

        .size-s
        {
            font-size: var(--size-sm);
        }

        .size-m
        {
            font-size: var(--size-md);
        }

        .size-l
        {
            font-size: var(--size-lg);
        }

        .size-xl
        {
            font-size: var(--size-xl);
        }
    `
}


declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-panel': Onyks_Panel
    }
}