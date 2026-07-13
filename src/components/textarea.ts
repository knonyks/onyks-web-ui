import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('onyks-textarea')
export class Onyks_Textarea extends LitElement {
    static override shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true
    };

    @property({ type: String, reflect: true }) placeholder = "Placeholder";
    @property({ type: String, reflect: true }) label = "";
    @property({ type: String, reflect: true }) value = "";
    @property({ type: Number, reflect: true }) rows = 3;
    @property({ type: Number, reflect: true }) cols = 0;
    
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) readonly = false;
    @property({ type: Boolean, reflect: true }) required = false;
    @property({ type: Boolean, reflect: true }) error = false;
    @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' | 'xl' = 's';
    
    @property({ type: Number, reflect: true }) minlength?: number;
    @property({ type: Number, reflect: true }) maxlength?: number;
    @property({ type: String, reflect: true }) resize: 'none' | 'both' | 'horizontal' | 'vertical' = 'both';

    private validate() {
        if (this.required && this.value.trim() === '') {
            this.error = true;
        } else if (this.minlength && this.value.length < this.minlength) {
            this.error = true;
        } else {
            this.error = false;
        }
    }

    private _handleInput(e: Event) {
        const input = e.target as HTMLTextAreaElement;
        this.value = input.value;
        this.validate();
    }

    private _handleBlur() {
        this.validate();
    }

    private renderErrorIcon() {
        return html`
            <svg class="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L1 21H23L12 2ZM12 5.5L19.53 19H4.47L12 5.5ZM11 10V14H13V10H11ZM11 16V18H13V16H11Z" fill="currentColor"/>
            </svg>
        `;
    }

    render() {
        return html`
            <div class="wrapper ${this.error ? 'is-error' : ''}" style="resize: ${this.resize};">
                <textarea
                    placeholder=${this.placeholder}
                    aria-label=${this.label}
                    id=${this.id}
                    rows=${this.rows || undefined}
                    cols=${this.cols || undefined}
                    .value=${this.value}
                    @input=${this._handleInput}
                    @blur=${this._handleBlur}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    minlength=${this.minlength || undefined}
                    maxlength=${this.maxlength || undefined}
                    class="${this.error ? 'error' : ''}"
                ></textarea>
                ${this.error ? this.renderErrorIcon() : ''}
            </div>
        `;
    }

    static styles = css`
        :host {
            display: inline-block;
            width: 100%;
            height: fit-content;
            box-sizing: border-box;
        }

        * {
            font-family: var(--font, inherit);
        }

        .wrapper {
            position: relative;
            width: 100%;
            display: grid;
            overflow: hidden;
            border-radius: var(--onyks-radius-sm);
        }

        textarea {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            resize: none !important;
            border: 2px solid var(--onyks-surface-1-border);
            border-radius: var(--onyks-radius-s);
            background-color: var(--onyks-surface-1);
            color: var(--onyks-on-surface);
            font-family: inherit;
            outline: none;
            transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
            
        :host([size="s"]) textarea {
            padding: calc(var(--onyks-spacing-sm) - 2px) var(--onyks-spacing-sm);
            font-size: var(--onyks-size-sm);
        }

        :host([size="m"]) textarea {
            padding: calc(var(--onyks-spacing-md) - 6px) var(--onyks-spacing-md);
            font-size: var(--onyks-size-md);
        }

        :host([size="l"]) textarea {
            padding: calc(var(--onyks-spacing-md) - 2px) var(--onyks-spacing-lg);
            font-size: var(--onyks-size-lg);
        }

        :host([size="xl"]) textarea {
            padding: calc(var(--onyks-spacing-lg) - 6px) var(--onyks-spacing-lg);
            font-size: var(--onyks-size-xl);
        }

        textarea:focus {
            border-color: var(--onyks-info); 
        }   

        textarea:disabled {
            opacity: 0.6;
            background-color: var(--onyks-surface-2);
            cursor: not-allowed;
        }

        textarea[readonly] {
            background-color: var(--onyks-surface-2);
            border-style: dashed; 
        }

        textarea.error {
            border-color: var(--onyks-error);
        }

        textarea::placeholder {
            color: var(--onyks-surface-1-placeholder);
        }

        :host([size="s"]) .wrapper.is-error textarea { padding-right: 32px; }
        :host([size="m"]) .wrapper.is-error textarea { padding-right: 40px; }
        :host([size="l"]) .wrapper.is-error textarea { padding-right: 48px; }
        :host([size="xl"]) .wrapper.is-error textarea { padding-right: 56px; }

        .error-icon {
            position: absolute;
            color: var(--onyks-error);
            pointer-events: none;
        }

        :host([size="s"]) .error-icon { 
            top: var(--onyks-spacing-sm);
            right: 8px; 
            width: 16px; height: 16px; 
        }
        :host([size="m"]) .error-icon { 
            top: calc(var(--onyks-spacing-md) - 4px);
            right: 12px; 
            width: 20px; height: 20px; 
        }
        :host([size="l"]) .error-icon { 
            top: var(--onyks-spacing-md);
            right: 14px; 
            width: 24px; height: 24px; 
        }
        :host([size="xl"]) .error-icon { 
            top: calc(var(--onyks-spacing-lg) - 4px);
            right: 16px; 
            width: 28px; height: 28px; 
        }
    `;
}