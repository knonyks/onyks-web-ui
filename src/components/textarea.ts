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
    @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' = 'm';
    
    @property({ type: Number, reflect: true }) minlength?: number;
    @property({ type: Number, reflect: true }) maxlength?: number;
    @property({ type: String, reflect: true }) resize: 'none' | 'both' | 'horizontal' | 'vertical' = 'both';

    private _handleInput(e: Event) {
        const input = e.target as HTMLTextAreaElement;
        this.value = input.value;
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
            <div class="wrapper ${this.error ? 'is-error' : ''}">
                <textarea
                    placeholder=${this.placeholder}
                    aria-label=${this.label}
                    id=${this.id}
                    rows=${this.rows || undefined}
                    cols=${this.cols || undefined}
                    .value=${this.value}
                    @input=${this._handleInput}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    minlength=${this.minlength || undefined}
                    maxlength=${this.maxlength || undefined}
                    style="resize: ${this.resize};"
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
            height: 100%;
            display: flex;
        }

        .wrapper.is-error textarea {
            padding-right: 40px; 
        }

        textarea {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            
            border: 2px solid var(--surface-border);
            border-radius: var(--radius-md);
            background-color: var(--surface-element);
            color: var(--text-primary);
            font-family: inherit;
            outline: none;
            transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
            
        :host([size="s"]) textarea {
            padding: calc(var(--spacing-sm) - 2px) var(--spacing-sm);
            font-size: var(--size-sm);
        }

        :host([size="m"]) textarea {
            padding: calc(var(--spacing-md) - 6px) var(--spacing-md);
            font-size: var(--size-md);
        }

        :host([size="l"]) textarea {
            padding: calc(var(--spacing-md) - 2px) var(--spacing-lg);
            font-size: var(--size-lg);
        }

        :host([size="xl"]) textarea {
            padding: calc(var(--spacing-lg) - 6px) var(--spacing-lg);
            font-size: var(--size-xl);
        }

        textarea:focus {
            border-color: var(--color-info); 
        }   

        textarea:disabled {
            opacity: 0.6;
            background-color: var(--surface-hover);
            cursor: not-allowed;
        }

        textarea[readonly] {
            background-color: var(--surface-hover);
            border-style: dashed; 
        }

        textarea.error {
            border-color: var(--color-primary);
        }

        textarea::placeholder {
            color: var(--text-secondary);
        }
        
        .error-icon {
            position: absolute;
            color: var(--color-primary);
            pointer-events: none;
        }

        :host([size="s"]) .error-icon { top: 8px; right: 8px; width: 16px; height: 16px; }
        :host([size="m"]) .error-icon { top: 12px; right: 12px; width: 20px; height: 20px; }
        :host([size="l"]) .error-icon { top: 16px; right: 16px; width: 24px; height: 24px; }
    `;
}