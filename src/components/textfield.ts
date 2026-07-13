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
            font-family: var(--onyks-font);
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
            border: 2px solid var(--onyks-surface-1-border);
            background: var(--onyks-surface-1);
            color: var(--onyks-on-surface-1);
            width: 100%;
            height: 100%;
            margin: 0; 
            border-radius: var(--onyks-radius-sm);
            font-family: inherit;
            transition: border-color 0.3s ease;
        }

        .is-error input {
            border-color: var(--onyks-error);
        }

        .error-icon {
            position: absolute;
            right: 12px;
            width: 20px;
            height: 20px;
            color: var(--onyks-error);
            pointer-events: none;
        }

        .s { padding: calc(var(--onyks-spacing-sm) - 2px) var(--onyks-spacing-sm); font-size: var(--onyks-size-sm); }
        .m { padding: calc(var(--onyks-spacing-md) - 6px) var(--onyks-spacing-md); font-size: var(--onyks-size-md); }
        .l { padding: calc(var(--onyks-spacing-md) - 2px) var(--onyks-spacing-lg); font-size: var(--onyks-size-lg); }
        .xl { padding: calc(var(--onyks-spacing-lg) - 6px) var(--onyks-spacing-xl); font-size: var(--onyks-size-xl); }

        input:disabled {
            opacity: 0.6;
            background: var(--onyks-surface-2);
            border-color: var(--onyks-surface-1-hover);
            cursor: not-allowed;
        }

        input:focus {
            border-color: var(--onyks-info);
        }

        .is-error input:focus {
            border-color: var(--onyks-error);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'onyks-textfield': Onyks_Textfield;
    }
}