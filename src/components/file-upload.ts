import { LitElement, css, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { OnyksStyles } from '../utils/styles';

@customElement('onyks-file-upload')
export class OnyksFileUpload extends LitElement 
{
    @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' | 'xl' = 'm';
    @property({ type: String, reflect: true }) radius: 's' | 'm' | 'l' | 'xl' = 'm';
    @property({ type: String, reflect: true }) padding: 's' | 'm' | 'l' | 'xl' = 'm';

    @property({ type: Boolean, reflect: true }) multiple = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) accept = '';
    @property({ type: String }) message = 'Drag a file here or click to upload';
    

    static styles = [css`
        :host 
        {
            display: block;
            width: 100%;
            height: fit-content;
            font-family: var(--onyks-font);
            box-sizing: border-box;
        }

        .drop-zone 
        {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px dashed var(--onyks-surface-1-border, #6c6d70);
            background-color: var(--onyks-surface-1, #242529);
            color: var(--onyks-on-surface-1);
            cursor: pointer;
            transition: all 0.2s ease;
            box-sizing: border-box;
        }

        .drop-zone:hover:not(.disabled) 
        {
            background-color: var(--onyks-surface-1-hover);
        }

        .drop-zone.dragover 
        {
            border-color: var(--onyks-accent);
            background-color: var(--onyks-surface-1-selected);
        }

        .drop-zone.disabled 
        {
            opacity: 0.5;
            cursor: not-allowed;
            border-color: var(--onyks-surface-1-border);
            pointer-events: none;
        }

        input[type="file"] 
        {
            display: none;
        }

        .text
        {
            pointer-events: none;
            color: var(--onyks-on-surface-1);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: var(--onyks-spacing-sm);
        }
        
        .text::before
        {
            font-family: 'bootstrap-icons';
            content: '\\F358';
        }
    `, OnyksStyles.radius('.drop-zone'), OnyksStyles.size('.text'), OnyksStyles.padding('.drop-zone')];

    @state() private _isDragging = false;
    @state() private _displayText = '';
    
    @query('input[type="file"]') private _inputElement!: HTMLInputElement;
    
    get files(): FileList | null {
        return this._inputElement ? this._inputElement.files : null;
    }

    removeFile(file: File | number): boolean {
        const files = this.files;
        if (!files) return false;

        const index = typeof file === 'number' ? file : Array.from(files).indexOf(file);
        if (index < 0 || index >= files.length) return false;

        const updatedFiles = new DataTransfer();
        Array.from(files).forEach((currentFile, currentIndex) => {
            if (currentIndex !== index) updatedFiles.items.add(currentFile);
        });

        this._inputElement.files = updatedFiles.files;
        this._updateDisplayText(this._inputElement.files);
        this._dispatchChangeEvent();
        return true;
    }

    private _updateDisplayText(files: FileList | null) {
        if (!files || files.length === 0) {
            this._displayText = '';
        } else if (files.length === 1) {
            this._displayText = files[0].name;
        } else {
            this._displayText = `Wybrano plików: ${files.length}`;
        }
    }

    private _dispatchChangeEvent() 
    {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { files: this.files ? Array.from(this.files) : [] },
            bubbles: true, 
            composed: true
        }));
    }

    private _handleCancel() {
        this.dispatchEvent(new Event('cancel', { 
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

    reset () {
        if (this._inputElement) {
            this._inputElement.value = '';
            this._updateDisplayText(null);
            this._dispatchChangeEvent();
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
                    @cancel=${this._handleCancel}
                >



                
                <span class="text">${this._displayText || this.message}</span>
            </label>
        `;
    }
}