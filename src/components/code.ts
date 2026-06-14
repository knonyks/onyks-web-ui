import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import Prisma i wtyczki do numeracji linii
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

// Import stylów Prisma (możesz zmienić 'prism-tomorrow' na inny motyw)
import prismTheme from 'prismjs/themes/prism-tomorrow.css?inline';
import prismLineNumbersTheme from 'prismjs/plugins/line-numbers/prism-line-numbers.css?inline';
import { style_scrollbar } from './_styles';

// UWAGA: Prism domyślnie ładuje tylko podstawowe języki (HTML, JS, CSS). 
// Jeśli potrzebujesz innych, zaimportuj je tutaj, np.:
// import 'prismjs/components/prism-typescript.js';
// import 'prismjs/components/prism-bash.js';

@customElement('onyks-code-block')
export class Onyks_Code_Block extends LitElement {
    @state() private _rawCode = '';
    @state() private _copied = false;

    @property({ type: String }) language = 'html';
    @property({ type: String }) title = '';
    @property({ type: String }) size = 'm';
    @property({ type: String }) file = '';
    @property({ type: String }) content = ''; 

    static styles = [css`
        /* Wstrzyknięcie stylów Prisma */
        ${unsafeCSS(prismTheme)}
        ${unsafeCSS(prismLineNumbersTheme)}

        :host {
            display: flex; flex-direction: column; border-radius: 8px;
            overflow: hidden; background: #0d1117; border: 1px solid #30363d;
            font-family: 'Fira Code', monospace;
        }
        
        slot { display: none; }
        
        /* Dostosowanie pre pod Prisma i wtyczkę line-numbers */
        pre { 
            margin: 0; 
            padding: 1.25rem; 
            overflow: auto; 
            background: transparent !important; 
        }
        
        pre.line-numbers {
            position: relative;
            padding-left: 3.8em;
            counter-reset: linenumber;
        }

        code { 
            display: block; 
            tab-size: 4; 
            line-height: 1.5; 
            white-space: pre; 
            font-size: inherit; 
        }
        
        .header {
            display: flex; justify-content: space-between; align-items: center;
            background: #161b22; padding: 10px 16px; border-bottom: 1px solid #30363d;
            color: #8b949e; font-size: 0.85rem;
        }
        .copy-btn { cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 8px; }
        .copy-btn:hover { color: #58a6ff; }
        .copy-btn::before { content: '\\F759'; font-family: "bootstrap-icons"; font-size: 1rem; }
        .copy-btn.copied { color: #3fb950; }
        .copy-btn.copied::before { content: '\\F725'; }

        :host([size="s"]) { font-size: 12px; }
        :host([size="m"]) { font-size: 14px; }
        :host([size="l"]) { font-size: 16px; }
    `, style_scrollbar('pre')];

    @query('code') private _codeElement!: HTMLElement;

    private _outdent(str: string): string {
        if (!str) return '';
        const lines = str.split('\n');
        while (lines.length > 0 && lines[0].trim() === '') lines.shift();
        while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();
        
        const minIndent = lines.reduce((acc, line) => {
            if (line.trim() === '') return acc;
            const m = line.match(/^(\s+)/);
            return m ? Math.min(acc, m[0].length) : 0;
        }, Infinity);
        
        return lines.map(l => l.slice(minIndent === Infinity ? 0 : minIndent)).join('\n');
    }

    private _handleSlotChange(e: Event) {
        if (this.content && this.content.trim() !== '') return;

        const slot = e.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        
        const container = nodes.find(n => n.nodeType === Node.ELEMENT_NODE) as HTMLElement;

        if (container) {
            this._rawCode = this._outdent(container.innerHTML);
        } else {
            this._rawCode = this._outdent(nodes.map(n => n.textContent).join(''));
        }
        this.requestUpdate();
    }

    protected updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('content') && this.content) {
            this._rawCode = this._outdent(this.content);
        }

        // Zmiana podświetlania na PrismJS
        if (this._codeElement && this._rawCode) {
            this._codeElement.textContent = this._rawCode;
            Prism.highlightElement(this._codeElement);
        }
    }

    private async _copyCode() {
        await navigator.clipboard.writeText(this._rawCode);
        this._copied = true;
        setTimeout(() => this._copied = false, 2000);
    }

    render() {
        return html`
            <div class="header">
                <span>${this.title}</span>
                <div class="copy-btn ${this._copied ? 'copied' : ''}" @click=${this._copyCode}>
                    ${this._copied ? 'Copied' : 'Copy'}
                </div>
            </div>
            <main>
                <slot @slotchange=${this._handleSlotChange}></slot>
                <pre class="line-numbers"><code class="language-${this.language}"></code></pre>
            </main>
        `;
    }
}