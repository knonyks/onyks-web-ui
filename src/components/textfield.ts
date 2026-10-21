import { LitElement, css, html, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface TextfieldOption {
    label: string;
    value: any;
}

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
    @property({ type: Boolean, reflect: true }) dropdown = false;
    @property({ attribute: false }) options: TextfieldOption[] = [];
    @property({ type: Number }) scrollThreshold = 8;

    @state() private _open = false;
    @state() private _activeIndex = -1;

    private _scrolledToEnd = false;
    private _movedByKeyboard = false;

    private _handleInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
        if (this.dropdown) {
            this._open = true;
            this._activeIndex = -1;
        }
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

                    role=${this.dropdown ? 'combobox' : nothing}
                    autocomplete=${this.dropdown ? 'off' : nothing}
                    aria-autocomplete=${this.dropdown ? 'list' : nothing}
                    aria-controls=${this.dropdown ? 'dropdown-list' : nothing}
                    aria-expanded=${this.dropdown ? String(this._isListVisible) : nothing}
                    aria-activedescendant=${this._isListVisible && this._activeIndex >= 0 ? `option-${this._activeIndex}` : nothing}
                    @focus=${this._handleFocus}
                    @click=${this._handleFocus}
                    @blur=${this._close}
                    @keydown=${this._handleKeydown}
                />
                ${this.error ? this.renderErrorIcon() : ''}
                ${this._isListVisible ? this.renderDropdown() : ''}
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

    private get _isListVisible() {
        return this.dropdown && this._open && !this.disabled && this.options.length > 0;
    }

    private renderDropdown() {
        return html`
            <ul
                class="dropdown"
                id="dropdown-list"
                role="listbox"
                @mousedown=${(e: Event) => e.preventDefault()}
                @scroll=${this._handleListScroll}
            >
                ${this.options.map((option, index) => html`
                    <li
                        id="option-${index}"
                        class="option ${index === this._activeIndex ? 'is-active' : ''}"
                        role="option"
                        aria-selected=${index === this._activeIndex ? 'true' : 'false'}
                        @mouseenter=${() => (this._activeIndex = index)}
                        @click=${() => this._selectOption(option)}
                    >${option.label}</li>
                `)}
            </ul>
        `;
    }

    private _handleFocus() {
        if (this.dropdown) this._open = true;
    }

    private _close() {
        this._open = false;
        this._activeIndex = -1;
    }

    private _handleKeydown(e: KeyboardEvent) {
        if (!this.dropdown) return;
        const lastIndex = this.options.length - 1;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this._open = true;
                this._movedByKeyboard = true;
                this._activeIndex = Math.min(this._activeIndex + 1, lastIndex);
                break;

            case 'ArrowUp':
                e.preventDefault();
                this._open = true;
                this._movedByKeyboard = true;
                this._activeIndex = Math.max(this._activeIndex - 1, 0);
                break;

            case 'Enter':
                if (this._isListVisible && this._activeIndex >= 0) {
                    e.preventDefault();
                    this._selectOption(this.options[this._activeIndex]);
                }
                break;

            case 'Escape':
                if (this._isListVisible) {
                    e.preventDefault();
                    this._close();
                }
                break;
        }
    }

    private _selectOption(option: TextfieldOption) {
        this.value = option.label;
        this._close();
        this.dispatchEvent(new CustomEvent('option-selected', {
            detail: option,
            bubbles: true,
            composed: true
        }));
    }

    private _handleListScroll(e: Event) {
        const list = e.currentTarget as HTMLElement;
        const atEnd = list.scrollHeight - list.scrollTop - list.clientHeight <= this.scrollThreshold;

        if (atEnd && !this._scrolledToEnd) {
            this.dispatchEvent(new CustomEvent('scroll-end', { bubbles: true, composed: true }));
        }
        this._scrolledToEnd = atEnd;
    }

    protected override willUpdate(changed: PropertyValues) {
        if (changed.has('options')) {
            this._scrolledToEnd = false;
            if (this._activeIndex > this.options.length - 1) {
                this._activeIndex = this.options.length - 1;
            }
        }
    }

    protected override updated(changed: PropertyValues) {
        if (changed.has('_activeIndex') && this._movedByKeyboard) {
            this._movedByKeyboard = false;
            this._scrollToActive();
        }
    }

    private _scrollToActive() {
        const list = this.renderRoot.querySelector<HTMLElement>('.dropdown');
        const item = list?.children[this._activeIndex] as HTMLElement | undefined;
        if (!list || !item) return;

        const itemTop = item.offsetTop;
        const itemBottom = itemTop + item.offsetHeight;

        if (itemTop < list.scrollTop) {
            list.scrollTop = itemTop;
        } else if (itemBottom > list.scrollTop + list.clientHeight) {
            list.scrollTop = itemBottom - list.clientHeight;
        }
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
            border: 1px solid var(--onyks-surface-1-border);
            background: var(--onyks-surface-1);
            color: var(--onyks-on-surface-1);
            width: 100%;
            height: 100%;
            margin: 0;
            border-radius: var(--onyks-radius-md);
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

        .dropdown {
            position: absolute;
            top: calc(100% + 4px);
            left: 0;
            right: 0;
            z-index: 1000;
            box-sizing: border-box;
            max-height: 240px;
            overflow-y: auto;
            margin: 0;
            padding: 4px;
            list-style: none;
            background: var(--onyks-surface-1);
            color: var(--onyks-on-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            border-radius: var(--onyks-radius-md);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            scrollbar-width: thin;
            scrollbar-color: var(--onyks-scroll-thumb) var(--onyks-scroll-track);
        }

        .option {
            padding: var(--onyks-spacing-sm) var(--onyks-spacing-md);
            border-radius: var(--onyks-radius-md);
            font-size: var(--onyks-size-md);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
        }

        .option.is-active {
            background: var(--onyks-surface-1-hover);
        }

        :host([size="s"]) .option { font-size: var(--onyks-size-sm); }
        :host([size="l"]) .option { font-size: var(--onyks-size-lg); }
        :host([size="xl"]) .option { font-size: var(--onyks-size-xl); }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'onyks-textfield': Onyks_Textfield;
    }
}