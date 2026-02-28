import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('onyks-textfield')
export class Onyks_Textfield extends LitElement {
    static override shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true
    };

    @property({ type: String, reflect: true }) size = "m";
    @property({ type: String, reflect: true }) placeholder = "";
    @property({ type: String, reflect: true }) type = "text";
    @property({ type: String, reflect: true }) label = "";
    @property({ type: String, reflect: true }) value = "";
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) error = false;

    private _handleInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
    }

    render() {
        return html`
            <div class="wrapper ${this.error ? 'is-error' : ''}">
                <input 
                    class=${this.size} 
                    placeholder=${this.placeholder}
                    type=${this.type}
                    aria-label=${this.label}
                    id=${this.id}
                    .value=${this.value}
                    ?disabled=${this.disabled}
                    @input=${this._handleInput}
                />
                ${this.error ? this.renderErrorIcon() : ''}
            </div>
        `;
    }

    private renderErrorIcon() {
        return html`
            <svg class="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L1 21H23L12 2ZM12 5.5L19.53 19H4.47L12 5.5ZM11 10V14H13V10H11ZM11 16V18H13V16H11Z" fill="currentColor"/>
            </svg>
        `;
    }

    static styles = css`
        :host {
            display: inline-block;
            width: fit-content;
            height: fit-content;
            box-sizing: border-box;
        }

        * {
            font-family: var(--font, inherit);
        }

        .wrapper {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
        }

        input {
            box-sizing: border-box;
            outline: none;
            border: 2px solid var(--surface-border);
            background: var(--surface-element);
            color: var(--text-primary);
            width: 100%;
            height: 100%;
            margin: 0; 
            border-radius: var(--radius-sm);
            font-family: inherit;
            transition: border-color 0.3s ease;
        }

        .is-error input {
            border-color: var(--color-primary);
        }

        .error-icon {
            position: absolute;
            right: 12px;
            width: 20px;
            height: 20px;
            color: var(--color-primary);
            pointer-events: none;
        }

        .s { padding: calc(var(--spacing-sm) - 2px) var(--spacing-sm); font-size: var(--size-sm); }
        .m { padding: calc(var(--spacing-md) - 6px) var(--spacing-sm); font-size: var(--size-md); }
        .l { padding: calc(var(--spacing-md) - 2px) var(--spacing-md); font-size: var(--size-lg); }
        .xl { padding: calc(var(--spacing-lg) - 6px) var(--spacing-md); font-size: var(--size-xl); }

        input:disabled {
            opacity: 0.6;
            background: var(--surface-hover);
            border-color: var(--surface-border);
            cursor: not-allowed;
        }

        input:focus {
            border-color: var(--color-info);
        }

        .is-error input:focus {
            border-color: var(--color-primary);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'onyks-textfield': Onyks_Textfield;
    }
}