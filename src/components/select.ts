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
    @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' = 'm';

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
        :host {
            display: inline-block;
            width: 100%;
        }

        * {
            font-family: var(--font, inherit);
        }

        select {
            width: 100%;
            border: 2px solid var(--surface-border);
            border-radius: var(--radius-sm);
            background-color: var(--surface-element);
            color: var(--text-primary);
            transition: border-color 0.2s;

            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none; 

            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
        }

        :host([size="s"]) select {
            padding: calc(var(--spacing-sm) - 2px)  var(--spacing-sm);
            font-size: var(--size-sm);
            background-position: right 0.5em center;
            background-size: 1em;
        }

        :host([size="m"]) select {
            padding: calc(var(--spacing-md) - 6px)  var(--spacing-md); 
            font-size: var(--size-md);
            background-position: right 0.75em center;
            background-size: 1.25em;
        }

        :host([size="l"]) select {
            padding: calc(var(--spacing-lg) - 2px)  var(--spacing-lg);
            font-size: var(--size-lg);
            background-position: right 1em center;
            background-size: 1.5em;
        }

        :host([size="xl"]) select {
            padding: calc(var(--spacing-xl) - 6px) var(--spacing-xl);
            font-size: var(--size-xl);
            background-position: right 1em center;
            background-size: 1.75em;
        }

        select::-ms-expand {
            display: none;
        }

        select:focus {
            outline: none;
            border-color: var(--color-info);
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