import { LitElement, css, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { onyksStyleSize } from './_styles';

@customElement('onyks-file-upload')
export class Onyks_FileUpload extends LitElement {
    @property({ type: Boolean, reflect: true }) multiple = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) accept = '';
    @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' | 'xl' = 'm';

    static styles = [css`
        :host {
            display: block;
            width: 100%;
            font-family: var(--onyks-font, system-ui, sans-serif);
        }

        .drop-zone {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px dashed var(--onyks-surface-1-border, #6c6d70);
            border-radius: var(--onyks-radius-md, 8px);
            background-color: var(--onyks-surface-1, #242529);
            color: var(--onyks-on-surface-1, #fff);
            cursor: pointer;
            transition: all 0.2s ease;
        }

        :host([size="s"]) .drop-zone { min-height: 60px; padding: var(--onyks-spacing-sm, 8px); }
        :host([size="m"]) .drop-zone { min-height: 100px; padding: var(--onyks-spacing-md, 16px); }
        :host([size="l"]) .drop-zone { min-height: 140px; padding: var(--onyks-spacing-lg, 24px); }
        :host([size="xl"]) .drop-zone { min-height: 180px; padding: var(--onyks-spacing-xl, 32px); }

        .drop-zone:hover:not(.disabled) {
            background-color: var(--onyks-surface-1-hover, #37383e);
        }

        .drop-zone.dragover {
            border-color: var(--onyks-accent, #fa5252);
            background-color: var(--onyks-surface-1-selected, #3e4047);
        }

        .drop-zone.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            border-color: var(--onyks-surface-1-border, #6c6d70);
            pointer-events: none;
        }

        input[type="file"] {
            display: none;
        }

        .text {
            pointer-events: none;
            color: var(--onyks-on-surface-1, #fff);
        }
    `, onyksStyleSize];

    @state() private _isDragging = false;
    @state() private _displayText = 'Przeciągnij plik tutaj lub kliknij';
    
    @query('input[type="file"]') 
    private _inputElement!: HTMLInputElement;
    
    get files(): FileList | null {
        return this._inputElement ? this._inputElement.files : null;
    }

    private _updateDisplayText(files: FileList | null) {
        if (!files || files.length === 0) {
            this._displayText = 'Przeciągnij plik tutaj lub kliknij';
        } else if (files.length === 1) {
            this._displayText = files[0].name;
        } else {
            this._displayText = `Wybrano plików: ${files.length}`;
        }
    }

    private _dispatchChangeEvent() {
        this.dispatchEvent(new Event('change', { 
            bubbles: true, 
            composed: true
        }));
    }

    private _handleDragOver(e: DragEvent) {
        e.preventDefault();
        if (this.disabled) return; 
        this._isDragging = true;
    }

    private _handleDragLeave(e: DragEvent) {
        e.preventDefault();
        if (this.disabled) return;
        this._isDragging = false;
    }

    private _handleDrop(e: DragEvent) {
        e.preventDefault();
        if (this.disabled) return; 
        this._isDragging = false;
        
        if (e.dataTransfer && e.dataTransfer.files.length > 0) {
            if (this._inputElement) {
                this._inputElement.files = e.dataTransfer.files;
                this._updateDisplayText(this._inputElement.files);
                this._dispatchChangeEvent();
            }
        }
    }

    private _handleChange(e: Event) {
        const input = e.target as HTMLInputElement;
        this._updateDisplayText(input.files);
        this._dispatchChangeEvent();
    }

    render() {
        return html`
            <label 
                class="drop-zone ${this._isDragging ? 'dragover' : ''} ${this.disabled ? 'disabled' : ''}"
                @dragover=${this._handleDragOver}
                @dragleave=${this._handleDragLeave}
                @drop=${this._handleDrop}
            >
                <input 
                    type="file" 
                    ?multiple=${this.multiple}
                    ?disabled=${this.disabled}
                    accept=${this.accept}
                    @change=${this._handleChange}
                >
                <!-- DODANO KLASĘ onyks-size -->
                <span class="text onyks-size">${this._displayText}</span>
            </label>
        `;
    }
}