import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// --- KONTENER SIATKI ---
@customElement('onyks-grid')
export class Onyks_Grid extends LitElement {
    @property({ type: Number }) cols = 0;
    @property({ type: String, reflect: true }) gap = 'm';
    @property({ type: Number, attribute: 'mobile-breakpoint' }) mobileBreakpoint = 900;

    static styles = css`
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }
        
        .grid-container {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            box-sizing: border-box;
        }

        :host([gap="s"]) .grid-container { gap: var(--onyks-spacing-sm, 8px); }
        :host([gap="m"]) .grid-container { gap: var(--onyks-spacing-md, 16px); }
        :host([gap="l"]) .grid-container { gap: var(--onyks-spacing-lg, 24px); }
        :host([gap="xl"]) .grid-container { gap: var(--onyks-spacing-xl, 32px); }
    `;

    render() {
        const gridStyle = this.cols > 0 
            ? `grid-template-columns: repeat(${this.cols}, 1fr);` 
            : '';

        return html`
            <style>
                @media (max-width: ${this.mobileBreakpoint}px) {
                    .grid-container {
                        grid-template-columns: 1fr !important;
                    }
                    ::slotted(*) {
                        grid-column: auto !important;
                        grid-row: auto !important;
                        transform: none !important;
                    }
                }
            </style>
            <div class="grid-container" style="${gridStyle}">
                <slot></slot>
            </div>
        `;
    }
}

// --- KARTA ---
@customElement('onyks-card')
export class Onyks_Card extends LitElement {
    @property({ type: String }) title = "";
    @property({ type: Number }) span = 1;
    @property({ type: Number }) rows = 1;
    @property({ type: String, reflect: true }) size = 'm';

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('span')) {
            this.style.gridColumn = `span ${this.span}`;
        }
        if (changedProperties.has('rows')) {
            this.style.gridRow = `span ${this.rows}`;
        }
    }

    static styles = css`
        :host {
            display: block; 
            background-color: var(--onyks-surface-1);
            border: 1px solid var(--onyks-surface-1-border);
            border-radius: var(--onyks-radius-md);
            padding: var(--onyks-spacing-lg);
            
            box-sizing: border-box;
            color: var(--onyks-on-surface-1);
            font-family: var(--onyks-font);
            height: 100%;
            overflow-wrap: anywhere; 
            word-break: break-word;
            min-width: 0;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        :host(:hover) {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            border-color: var(--onyks-accent);
            z-index: 1;
        }

        h2 {
            margin: 0 0 var(--onyks-spacing-md) 0;
            color: var(--onyks-accent);
            font-weight: 600;
            position: relative;
            padding-bottom: 10px;
            display: block;
            line-height: 1.3;
            overflow-wrap: anywhere;
        }

        :host([size="s"]) h2 { font-size: var(--onyks-size-sm); }
        :host([size="m"]) h2 { font-size: var(--onyks-size-md); }
        :host([size="l"]) h2 { font-size: var(--onyks-size-lg); }
        :host([size="xl"]) h2 { font-size: var(--onyks-size-xl); }

        h2::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 40px;
            height: 2px;
            /* Zaktualizowany akcent */
            background-color: var(--onyks-accent);
        }

        .content {
            display: block;
            width: 100%;
        }

        ::slotted(img) {
            max-width: 100%;
            height: auto;
            border-radius: var(--onyks-radius-sm);
        }
    `;

    render() {
        return html`
            ${this.title ? html`<h2>${this.title}</h2>` : ''}
            <div class="content"><slot></slot></div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'onyks-grid': Onyks_Grid,
        'onyks-card': Onyks_Card
    }
}