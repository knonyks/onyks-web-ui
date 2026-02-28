import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('onyks-file-upload')
export class Onyks_FileUpload extends LitElement {
    @property({ type: Boolean, reflect: true }) multiple = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) accept = '';

    @state() private _isDragging = false;
    @state() private _displayText = 'Przeciągnij plik tutaj lub kliknij';

    private _updateDisplayText(files: FileList) {
        if (files.length === 0) {
            this._displayText = 'Przeciągnij plik tutaj lub kliknij';
        } else if (files.length === 1) {
            this._displayText = files[0].name;
        } else {
            this._displayText = `Wybrano plików: ${files.length}`;
        }
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
            const input = this.shadowRoot?.querySelector('input');
            if (input) {
                input.files = e.dataTransfer.files;
            }
            this._updateDisplayText(e.dataTransfer.files);
        }
    }

    private _handleChange(e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.files) {
            this._updateDisplayText(input.files);
        }
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
                <span class="text">${this._displayText}</span>
            </label>
        `;
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
            font-family: system-ui, sans-serif;
        }

        .drop-zone {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100px;
            border: 2px dashed var(--surface-4, #64748b);
            border-radius: 8px;
            background-color: var(--surface-2, #1e293b);
            color: var(--text-primary, #f8fafc);
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .drop-zone:hover:not(.disabled) {
            background-color: var(--surface-3);
        }

        .drop-zone.dragover {
            border-color: var(--sub-color-red);
            background-color: var(--surface-3);
        }

        .drop-zone.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            border-color: var(--surface-4, #475569);
            pointer-events: none;
        }

        input[type="file"] {
            display: none;
        }

        .text {
            pointer-events: none;
            text-align: center;
            padding: 1em;
        }
    `;
}