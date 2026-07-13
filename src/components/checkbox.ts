import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('onyks-checkbox')
export class Onyks_Checkbox extends LitElement {
    @property({ type: Boolean, reflect: true }) checked = false;
     @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' | 'xl' = 's';

    static styles = css`
        :host {
            display: inline-block;
            color: var(--onyks-on-surface);
            font-family: var(--onyks-font);

            --cb-size: calc(var(--onyks-size-md) + 6px);
            --cb-mark-size: calc(var(--onyks-size-md) - 2px);
            --cb-font-size: var(--onyks-size-md);
        }

        :host([size="s"]) {
            --cb-size: calc(var(--onyks-size-sm) + 6px);
            --cb-mark-size: calc(var(--onyks-size-sm) - 2px);
            --cb-font-size: var(--onyks-size-sm);
        }

        :host([size="m"]) {
            --cb-size: calc(var(--onyks-size-md) + 6px);
            --cb-mark-size: calc(var(--onyks-size-md) - 2px);
            --cb-font-size: var(--onyks-size-md);
        }

        :host([size="l"]) {
            --cb-size: calc(var(--onyks-size-lg) + 6px);
            --cb-mark-size: calc(var(--onyks-size-lg) - 2px);
            --cb-font-size: var(--onyks-size-lg);
        }

        :host([size="xl"]) {
            --cb-size: calc(var(--onyks-size-xl) + 6px);
            --cb-mark-size: calc(var(--onyks-size-xl) - 2px);
            --cb-font-size: var(--onyks-size-xl);
        }

        .checkbox-wrapper {
            display: inline-flex;
            align-items: center;
            gap: var(--onyks-spacing-sm);
            padding: var(--onyks-spacing-sm) 0;
            cursor: pointer;
            user-select: none;
        }

        input[type="checkbox"] {
            appearance: none;
            background-color: var(--onyks-surface-1);
            border: 2px solid var(--onyks-surface-1-border);
            border-radius: var(--onyks-radius-sm);
            
            margin: 0;
            width: var(--cb-size);
            height: var(--cb-size);
            
            display: inline-grid;
            place-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }

        .checkbox-wrapper:hover input[type="checkbox"] {
            border-color: var(--onyks-accent);
        }

        input[type="checkbox"]::before {
            content: "";
            width: var(--cb-mark-size);
            height: var(--cb-mark-size);
            
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            background-color: var(--onyks-accent);
            transform-origin: center;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }

        input[type="checkbox"]:checked::before {
            transform: scale(1);
        }

        input[type="checkbox"]:checked {
            border-color: var(--onyks-accent);
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