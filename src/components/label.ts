import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('onyks-label')
export class Onyks_Label extends LitElement 
{
    @property({type: String, reflect: true})
    size = "m"

    @property({type: String, reflect: true})
    for = ""

    render() 
    {
        return html`
            <label for="${this.for}" class="${this.size}"><slot></slot></label>
        `
    }

    static styles = css`
        label
        {
            box-sizing: border-box;
            outline: none;
            border: 1px solid transparent;
            width: 100%;
            height: 100%;
            display: inline-flex;
            font-family: var(--font);
            color: var(--color);
        }

        .s {font-size: var(--size-sm);}
        .m {font-size: var(--size-md);}
        .l {font-size: var(--size-lg);}
        .xl {font-size:  var(--size-xl);}

        :host
        {
            height: fit-content;
            display: block;
            width: fit-content;
            box-sizing: border-box;
        }

        *
        {
            font-family: var(--font);
        }
    `
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-label': Onyks_Label
    }
}