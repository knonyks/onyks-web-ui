import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import hljs from 'highlight.js';
import githubTheme from 'highlight.js/styles/github-dark.css?inline';
import 'bootstrap-icons/font/bootstrap-icons.css'

@customElement('onyks-code-block')
export class Onyks_Code_Block extends LitElement 
{
    @state() 
    private _rawCode = '';

    @state() 
    private _copied = false;

    @property({ type: String }) 
    language = 'typescript';
    
    @property({ type: String }) 
    title = '';

    @property({ type: String }) 
    size = 'm';

    @property({ type: String }) 
    file = '';

    @property({ type: Boolean }) 
    copy = true;

    static styles = css`
        ${unsafeCSS(githubTheme)}
        :host 
        {
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            overflow: hidden;
            height: fit-content;
            background: #0d1117;
            border: 0.1px solid var(--surface-border);
            position: relative;
        }

        slot 
        {
            display: none;
        }

        pre {
            margin: 0;
            display: block; 
            height: fit-content;
            min-height: 0;
            overflow: hidden;
        }

        code 
        {
            display: block;
            height: fit-content;
        }

        .title
        {
            padding: var(--spacing-md);
            background: var(--surface-element);
            text-align: center;
        }

        .copy
        {
            position: absolute;
            cursor: pointer;
            right: 0;

            padding: var(--spacing-md);
            height: fit-content;
            aspect-ratio: 1 / 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0 0 0 8px;
        }

        .copy::before
        {
            content: '\\F759';
            display: block;
            font-weight: bold;
            font-family: "bootstrap-icons" !important;
        }

        .copy.copied::before
        {
            content: '\\F725';
        }

        .file
        {
            padding: var(--spacing-md);
            background: var(--surface-element);
            width: 100%;
        }

        :host([size="s"])
        {
            font-size: var(--size-sm);
        }

        :host([size="m"])
        {
            font-size: var(--size-md);
        }

        :host([size="l"])
        {
            font-size: var(--size-lg);
        }

        :host([size="xl"])
        {
            font-size: var(--size-xl);
        }
    `;

    @query('code')
    private _codeElement!: HTMLElement;

    private _handleSlotChange(e: Event) 
    {
        const slot = e.target as HTMLSlotElement;
        const text = slot.assignedNodes().map(node => node.textContent).join('');
        this._rawCode = text.trim();
    }

    protected updated(changedProperties: Map<string, any>) 
    {
        if(changedProperties.has('_rawCode') && this._rawCode) 
        {
            this._codeElement.textContent = this._rawCode;
            this._codeElement.removeAttribute('data-highlighted');
            hljs.highlightElement(this._codeElement);
        }
    }

    private async _copyCode() 
    {
        try 
        {
            await navigator.clipboard.writeText(this._rawCode);
            this._copied = true;
            setTimeout(() => {
                this._copied = false;
            }, 1000);
        } 
        catch (err) 
        {
            console.error('Nie udało się skopiować kodu: ', err);
        }
    }

    render() 
    {
        return html`
            ${this.title ? html`<div class="title">${this.title}</div>` : ''}
            <main>
                <div class="copy ${this._copied ? 'copied' : ''}" @click=${this._copyCode}></div>
                <slot @slotchange=${this._handleSlotChange}></slot>
                <pre><code class="language-${this.language}"></code></pre>
            </main>
            ${this.file ? html`<div class="file">${this.file}</div>` : ''}
        `;
    }
}