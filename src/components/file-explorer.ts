import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { applyStyle } from './_styles.ts';

export interface OnyksFileItem 
{
  type: 'folder' | 'file';
  name: string;
}

@customElement('onyks-file-explorer')
export class OnyksFileExplorer extends LitElement 
{
  @property({ type: Array })
  content: OnyksFileItem[] = [];

  @property({ type: Boolean, reflect: true })
  multiple: boolean = false;

  // @property({ type: Boolean, reflect: true })
  // allowFolderSelection: boolean = false;

  @property({ type: String, reflect: true })
  emptyAlert: string = "The folder is empty";

  @property({ type: String, reflect: true }) size = "m";

  @state()
  private _selectedItems: Set<string> = new Set();

  static styles = [css`
    :host  
    {
      display: block;
      border-radius: var(--radius-sm);
      padding: 10px;
      background: var(--surface-element);
      width: calc(100% - 20px);
      font-family: var(--font);
      height: 300px;
      overflow: auto;
      border: 1px solid var(--surface-border);
    }

    .item 
    {
      display: flex;
      align-items: center;
      padding: 8px;
      cursor: pointer;
      // border-radius: var(--radius-sm);
      user-select: none;
      transition: background 0.2s;
      border: 1px solid transparent;
    }
    
    .item:hover 
    {
      border: 1px solid var(--surface-border);
    }

    .item.selected 
    {
      background: var(--surface-marked);
    }

    .item:first-child 
    {
      border-top-left-radius: var(--radius-sm);
      border-top-right-radius: var(--radius-sm);
    }

    .item:last-child 
    {
      border-bottom-left-radius: var(--radius-sm);
      border-bottom-right-radius: var(--radius-sm);
    }

    .icon 
    {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      line-height: 1;
    }

    .icon.folder::before 
    {
      content: '\\F3D7';
      font-family: 'bootstrap-icons';
      line-height: 1;
    }

    .icon.file::before 
    {
      content: '\\F35C';
      font-family: 'bootstrap-icons';
      line-height: 1;
    }
    
    .name 
    {
      line-height: 1.2; 
    }
  `, applyStyle('size', ''), applyStyle('scrollbar', '')];
  
  getSelectedItems(): OnyksFileItem[] 
  {
    return this.content.filter((item) => this._selectedItems.has(item.name));
  }


  private handleItemClick(item: OnyksFileItem): void 
  {
    // if (item.type === 'folder' && !this.allowFolderSelection) 
    // {
    //   this.triggerEnterFolder(item);
    //   return;
    // }
    const newSelected = new Set(this._selectedItems);

    if (this.multiple) 
    {
      if (newSelected.has(item.name)) 
      {
        newSelected.delete(item.name);
      } 
      else 
      {
        newSelected.add(item.name);
      }
    } 
    else 
    {
      newSelected.clear();
      newSelected.add(item.name);
    }

    this._selectedItems = newSelected;
  }

  private handleItemDblClick(item: OnyksFileItem): void 
  {
    if (item.type === 'folder') 
    {
      this.triggerEnterFolder(item);
    }
  }

  private triggerEnterFolder(folder: OnyksFileItem): void 
  {
    this._selectedItems = new Set();
    
    this.dispatchEvent(
      new CustomEvent<{ folder: OnyksFileItem }>('enter-folder', 
      {
        detail: {folder},
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render(): TemplateResult 
  {
    if (!this.content || this.content.length === 0) 
    {
      return html`<div style="padding: 10px; color: #888;">${this.emptyAlert}</div>`;
    }

    return html`
      <div class="explorer-grid">
        ${this.content.map(
          (item) => html`
            <div
              class="item ${this._selectedItems.has(item.name) ? 'selected' : ''}"
              @click=${() => this.handleItemClick(item)}
              @dblclick=${() => this.handleItemDblClick(item)}
            >
              <span class="icon ${item.type}"></span>
              <span class="name">${item.name}</span>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global 
{
  interface HTMLElementTagNameMap 
  {
    'onyks-file-explorer': OnyksFileExplorer
  }
}