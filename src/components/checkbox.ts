import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('onyks-checkbox')
export class Onyks_Checkbox extends LitElement {
    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: String, reflect: true }) size = 'small';

    static styles = css`
        :host {
            display: inline-block;
            color: #c1c2c5;
            --cb-size: calc(var(--size-md) + 6px);
            --cb-mark-size: calc(var(--size-md) - 2px);
            --cb-font-size: var(--size-md);
        }

        :host([size="small"]) {
            --cb-size: calc(var(--size-sm) + 6px);
            --cb-mark-size: calc(var(--size-sm) - 2px);
            --cb-font-size: var(--size-sm);
        }

        :host([size="medium"]) {
            --cb-size: calc(var(--size-md) + 6px);
            --cb-mark-size: calc(var(--size-md) - 2px);
            --cb-font-size: var(--size-md);
        }

        :host([size="large"]) {
            --cb-size: calc(var(--size-lg) + 6px);
            --cb-mark-size: calc(var(--size-lg) - 2px);
            --cb-font-size: var(--size-lg);
        }

        :host([size="extra-large"]) {
            --cb-size: calc(var(--size-xl) + 6px);
            --cb-mark-size: calc(var(--size-xl) - 2px);
            --cb-font-size: var(--size-xl);
        }

        .checkbox-wrapper {
            display: inline-flex;
            align-items: center;
            padding: var(--spacing-sm) var(--spacing-sm);
            cursor: pointer;
            user-select: none;
        }

        input[type="checkbox"] {
            appearance: none;
            background-color: #232428;
            margin: 0;
            
            width: var(--cb-size);
            height: var(--cb-size);
            
            border: 2px solid #3f4148;
            border-radius: 4px;
            display: inline-grid;
            place-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }

        .checkbox-wrapper:hover input[type="checkbox"] {
            border-color: #fa5252;
        }

        input[type="checkbox"]::before {
            content: "";
            width: var(--cb-mark-size);
            height: var(--cb-mark-size);
            
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            background-color: #fa5252;
            transform-origin: center;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }

        input[type="checkbox"]:checked::before {
            transform: scale(1);
        }

        input[type="checkbox"]:checked {
            border-color: #fa5252;
        }
    `;

    render() {
        return html`
            <label class="checkbox-wrapper">
                <input 
                    type="checkbox" 
                    .checked=${this.checked} 
                    @change=${this._handleChange} 
                />
                <span class="label-text">
                    <slot></slot>
                </span>
            </label>
        `;
    }

    private _handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        this.checked = target.checked;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { checked: this.checked },
            bubbles: true,
            composed: true
        }));
    }
}