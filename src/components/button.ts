import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { onyksStyleSize } from './_styles';

@customElement('onyks-button')
export class Onyks_Button extends LitElement {
    @property({ type: String, reflect: true }) size = 'm';
    @property({ type: String, reflect: true }) background: 'red' | 'blue' | 'green' | 'yellow' | 'gray' = 'red';
    @property({ type: String }) type = 'button';
    @property({ type: String, reflect: true }) href = "";
    @property({ type: Boolean, reflect: true }) disabled = false;
    
    render() {
        if(this.href) {
            return html`
                <a class="onyks-size btn" href="${this.href}" aria-disabled="${this.disabled ? 'true' : 'false'}" tabindex="${this.disabled ? '-1' : '0'}">
                    <slot></slot>
                </a>
            `;
        } else {
            return html`
                <button class="onyks-size btn" type="${this.type}" ?disabled="${this.disabled}">
                    <slot></slot>
                </button>
            `;
        }
    }

    static styles = [css`
        :host {
            display: inline-block;
            vertical-align: middle;
            height: fit-content;
            width: fit-content;
            padding-top: 4px;
            user-select: none;
        }

        .btn {
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            display: inline-flex;
            width: 100%;
            padding: var(--onyks-spacing-sm) var(--onyks-spacing-md); /* Lekko poszerzony padding boczny */
            border: 1px solid transparent;
            cursor: pointer;
            font-family: var(--onyks-font, inherit);
            font-weight: 500; /* Pogrubienie tekstu poprawia czytelność na przyciskach */
            text-decoration: none;
            text-align: center;
            border-radius: var(--onyks-radius-md, 8px);
            line-height: 1.5;
            
            /* BAZOWY EFEKT 3D */
            transform: translateY(-4px); 
            transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.1s cubic-bezier(0.4, 0, 0.2, 1);
            
            /* Domyślny cień (nadpisywany przez warianty kolorystyczne) */
            --btn-shadow: hsl(from var(--onyks-surface-1-border, #999) h s 30%);
            box-shadow: 0 7px 0 var(--btn-shadow);
        }

        /* --- WARIANTY KOLORYSTYCZNE --- */
        :host([background="red"]) .btn {
            background-color: var(--onyks-red);
            color: var(--onyks-on-red);
            --btn-shadow: hsl(from var(--onyks-red) h s 30%);
        }

        :host([background="blue"]) .btn {
            background-color: var(--onyks-blue);
            color: var(--onyks-on-blue);
            --btn-shadow: hsl(from var(--onyks-blue) h s 30%);
        }

        :host([background="green"]) .btn {
            background-color: var(--onyks-green);
            color: var(--onyks-on-green);
            --btn-shadow: hsl(from var(--onyks-green) h s 30%);
        }

        :host([background="yellow"]) .btn {
            background-color: var(--onyks-yellow);
            color: var(--onyks-on-yellow);
            --btn-shadow: hsl(from var(--onyks-yellow) h s 30%);
        }

        :host([background="gray"]) .btn {
            background-color: var(--onyks-gray);
            color: var(--onyks-on-gray);
            --btn-shadow: hsl(from var(--onyks-gray) h s 30%);
        }

        /* --- INTERAKCJE (Wspólne dla wszystkich kolorów!) --- */
        
        /* Hover - przycisk lekko opada */
        .btn:hover:not(:disabled) {
            transform: translateY(0px);
            box-shadow: 0 3px 0 var(--btn-shadow); 
        }

        /* Active - przycisk wciśnięty do końca (DODANE) */
        .btn:active:not(:disabled) {
            transform: translateY(3px);
            box-shadow: 0 0px 0 var(--btn-shadow);
        }

        /* Disabled */
        button:disabled, a[aria-disabled="true"] {
            opacity: 0.6;
            pointer-events: none;
            cursor: not-allowed;
            /* Wyłączony przycisk traci efekt 3D, żeby wyglądał na nieaktywny */
            transform: translateY(3px);
            box-shadow: 0 0px 0 var(--btn-shadow);
        }
    `, onyksStyleSize];

    constructor() {
        super();
        this.addEventListener('click', (e: Event) => {
            if (this.disabled) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'onyks-button': Onyks_Button
    }
}