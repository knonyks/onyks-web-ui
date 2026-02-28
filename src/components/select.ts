import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { state } from 'lit/decorators/state.js';

@customElement('onyks-select')
export class Onyks_Select extends LitElement {
    static override shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true
    };

    @property({ type: Boolean, reflect: true }) multiple = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;

    @state() private _internalOptions: { value: string, text: string, disabled: boolean, selected: boolean }[] = [];

    private _handleSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        const nodes = slot.assignedElements({ flatten: true });
        const options = nodes.filter(n => n.tagName.toLowerCase() === 'onyks-option') as Onyks_Option[];

        this._internalOptions = options.map(opt => ({
            value: opt.value,
            text: opt.textContent?.trim() || opt.value, 
            disabled: opt.disabled,
            selected: opt.selected
        }));
    }

    render() {
        return html`
            <div hidden>
                <slot @slotchange=${this._handleSlotChange}></slot>
            </div>

            <select ?multiple=${this.multiple} ?disabled=${this.disabled} ?required=${this.required}>
                ${map(this._internalOptions, (opt) => html`
                    <option 
                        value="${opt.value}" 
                        ?disabled=${opt.disabled} 
                        ?selected=${opt.selected}
                        ?hidden=${opt.value === ""}
                    >
                        ${opt.text}
                    </option>
                `)}
            </select>
        `;
    }

    static styles = css`
        select {
            width: 100%;
            padding: 0.5em 2.5em 0.5em 0.5em; 
            border: 1px solid var(--surface-4);
            border-radius: 4px;
            background: var(--surface-2);
            color: var(--text-1);
            font-size: 1em;
            transition: border-color 0.2s;

            appearance: none;
            -webkit-appearance: none;

            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 0.75em center;
            background-size: 1.2em;
        }

        select::-ms-expand {
            display: none;
        }

        select:focus {
            outline: none;
            border-color: var(--sub-color-red);
        }
    `;
}

@customElement('onyks-option')
export class Onyks_Option extends LitElement {
    @property({ type: String }) value = '';
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) selected = false;

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'onyks-select': Onyks_Select;
        'onyks-option': Onyks_Option;
    }
}