import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('onyks-textfield')
export class Onyks_Textfield extends LitElement 
{
    static override shadowRootOptions = 
    {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true
    };

    @property({type: String, reflect: true})
    size = "m"

    @property({type: String, reflect: true})
    placeholder = ""

    @property({type: String, reflect: true})
    type = "text"

    @property({type: String, reflect: true})
    label = ""

    @property({type: String, reflect: true})
    value = ""

    private _handleInput(e: Event) 
    {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
    }

    render() 
    {
        return html`
            <input class="${this.size}" 
            placeholder="${this.placeholder}"
            type="${this.type}"
            label="${this.label}"
            id="${this.id}"
            .value="${this.value}"
            @input="${this._handleInput}"
            />
        `
    }

    static styles = css`
        input
        {
            box-sizing: border-box;
            outline: none;
            border: 1px solid #ccc;
            width: 100%;
            height: 100%;
            margin: 0; 
            // padding: var(--spacing-sm);
            border-radius: var(--radius-sm);
            font-family: inherit;
        }

        .s
        {
            padding: var(--spacing-sm-field);
            font-size: var(--size-sm);
        }

        .m
        {
            padding: var(--spacing-md-field);
            font-size: var(--size-md);
        }

        .l
        {
            padding: var(--spacing-lg-field);
            font-size: var(--size-lg);
        }

        .xl
        {
            padding: var(--spacing-xl-field);
            font-size:  var(--size-xl);
        }

        :host
        {
            height: fit-content;
            display: inline-block;
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
        'onyks-textfield': Onyks_Textfield
    }
}