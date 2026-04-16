import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';

@customElement('onyks-text-help')
export class Onyks_Text_Help extends LitElement
{
    @property({type: String, reflect: true})
    size = "M"

    @property({type: String, reflect: true})
    color = "purple"

    render() 
    {
        const classes = {
            [`size-${this.size}`]: true,
            [`color-${this.color}`]: true
        }
        return html`<div class=${classMap(classes)}><slot></slot></div>`;
    }
        
    static styles = css`
        :host {
            display: block;
            height: fit-content;
        }

        .color-red { color: var(--color-red, red); }
        .color-green { color: var(--color-green, green); }
        .color-blue { color: var(--color-blue, blue); }
        .color-yellow { color: var(--color-yellow, yellow); }
        .color-orange { color: var(--color-orange, orange); }
        .color-purple { color: var(--color-purple, purple); }

        /* Zmiana z p na div */
        div {
            padding: 0; 
            margin: 0;
        }

        /* Trick na pusty element - podpięty pod diva! */
        div::before {
            content: '\\200B'; 
        }

        /* Rozmiary */
        .size-s { font-size: var(--size-sm, 0.75rem); }
        .size-m { font-size: var(--size-md, 0.875rem); }
        .size-l { font-size: var(--size-lg, 1rem); }
        .size-xl { font-size: var(--size-xl, 1.25rem); }
    `
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-text-help': Onyks_Text_Help
    }
}