import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('onyks-checkbox')
export class OnyksCheckbox extends LitElement
{
    @property({ type: Boolean, reflect: true }) 
    checked = false;

    @property({ type: Boolean, reflect: true })
    disabled = false;
    
    @property({ type: String, reflect: true }) 
    size: 's' | 'm' | 'l' | 'xl' = 's';

    static styles = css`
        :host 
        {
            display: inline-grid;
            place-items: center;
            color: var(--onyks-on-surface);
            font-family: var(--onyks-font);
            --cb-size: var(--onyks-size-md);
            --cb-mark-size: var(--onyks-size-md);
            --cb-font-size: var(--onyks-size-md);
            width: var(--cb-size);
            height: var(--cb-size);
        }

        :host([size="s"]) 
        {
            --cb-size: var(--onyks-size-sm);
            --cb-mark-size: var(--onyks-size-sm);
            --cb-font-size: var(--onyks-size-sm);
        }

        :host([size="m"]) 
        {
            --cb-size: var(--onyks-size-md);
            --cb-mark-size: var(--onyks-size-md);
            --cb-font-size: var(--onyks-size-md);
        }

        :host([size="l"]) 
        {
            --cb-size: var(--onyks-size-lg);
            --cb-mark-size: var(--onyks-size-lg);
            --cb-font-size: var(--onyks-size-lg);
        }

        :host([size="xl"]) 
        {
            --cb-size: var(--onyks-size-xl);
            --cb-mark-size: var(--onyks-size-xl);
            --cb-font-size: var(--onyks-size-xl);
        }

        input[type="checkbox"] 
        {
            appearance: none;
            box-sizing: border-box;
            background-color: var(--onyks-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            border-radius: var(--onyks-radius-sm);
            
            margin: 0;
            width: 100%;
            height: 100%;

            
            display: inline-grid;
            place-content: center;
            cursor: pointer;
            transition: border-color 0.2s ease, background-color 0.2s ease;
            flex-shrink: 0;
        }


        :host([disabled]) .checkbox-wrapper, input[type="checkbox"]:disabled
        {
            cursor: not-allowed;
        }

        input[type="checkbox"]:disabled
        {
            opacity: 0.6;
        }

        .checkbox-wrapper:hover input[type="checkbox"] 
        {
            border-color: var(--onyks-accent);
        }

        input[type="checkbox"]::before 
        {
            content: "";
            width: var(--cb-mark-size);
            height: var(--cb-mark-size);
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            background-color: var(--onyks-accent);
            transform-origin: center;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }

        input[type="checkbox"]:checked::before 
        {
            transform: scale(1);
        }

        input[type="checkbox"]:checked 
        {
            border-color: var(--onyks-accent);
        }
    `;

    render() 
    {
        return html`<input type="checkbox" .checked=${this.checked} ?disabled=${this.disabled} @change=${this._handleChange}/>`;
    }

    private _handleChange(e: Event) 
    {
        e.stopPropagation();
        const target = e.target as HTMLInputElement;
        this.checked = target.checked;
        this.dispatchEvent(new CustomEvent('change', 
        {
            detail: { checked: this.checked },
            bubbles: true,
            composed: true
        }));
    }
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-checkbox': OnyksCheckbox
    }
}