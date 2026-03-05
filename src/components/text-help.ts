import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';

@customElement('onyks-text-help')
export class Onyks_Text_Help extends LitElement
{
    static override shadowRootOptions = 
    {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true
    };

    @property({type: String, reflect: true})
    size = "m"

    @property({type: String, reflect: true})
    color = "red"

    render() 
    {
        const classes = {
            [`size-${this.size}`]: true,
            [`color-${this.color}`]: true
        }

        return html`
        <p
            class=${classMap(classes)} 
            color="${this.color}">
            <b><slot></slot></b>
        </p>`;
    }
        
    static styles = css`
        :host
        {
            display: block;
            height: fit-content;
        }
        .color-red {color: var(--color-primary);}
        .color-green {color: var(--color-success);}
        .color-blue {color: var(--color-info);}

        .size-s {font-size: var(--size-sm);}
        .size-m {font-size: var(--size-md);}
        .size-l {font-size: var(--size-lg);}
        .size-xl {font-size: var(--size-xl);}
        `
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-text-help': Onyks_Text_Help
    }
}