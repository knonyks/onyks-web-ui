import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// --- KONTENER SIATKI ---
@customElement('onyks-grid')
export class Onyks_Grid extends LitElement {
    @property({ type: Number }) cols = 0;

    static styles = css`
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }
        
        .grid-container {
            display: grid;
            gap: 20px;
            width: 100%;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            box-sizing: border-box;
        }

        @media (max-width: 900px) {
            .grid-container {
                grid-template-columns: 1fr !important;
                gap: 16px;
            }
        }
    `;

    render() {
        const gridStyle = this.cols > 0 
            ? `grid-template-columns: repeat(${this.cols}, 1fr);` 
            : '';

        return html`
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
            display: flex;
            flex-direction: column;
            background-color: #232428;
            border: 1px solid #2c2e33;
            border-radius: 12px;
            padding: 24px;
            box-sizing: border-box;
            color: #e1e1e6;
            font-family: sans-serif;
            height: 100%;
            overflow-wrap: anywhere; 
            word-break: break-word;
            min-width: 0;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        :host(:hover) {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            border-color: #fa5252;
            z-index: 1;
        }

        @media (max-width: 900px) {
            :host {
                grid-column: auto !important;
                grid-row: auto !important;
                transform: none !important; 
            }
        }

        h2 {
            margin: 0 0 20px 0;
            font-size: 1.25rem;
            color: #fa5252;
            font-weight: 600;
            position: relative;
            padding-bottom: 10px;
            display: block;
            line-height: 1.3;
            overflow-wrap: anywhere;
        }

        h2::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 40px;
            height: 2px;
            background-color: #fa5252;
        }

        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        ::slotted(img) {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
        }
    `;

    render() {
        return html`
            ${this.title ? html`<h2>${this.title}</h2>` : ''}
            <div class="content"><slot></slot></div>
        `;
    }
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-grid': Onyks_Grid,
        'onyks-card': Onyks_Card
    }
}