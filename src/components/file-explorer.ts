import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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

  @property({ type: Boolean })
  multiple: boolean = false;

  @property({ type: Boolean })
  allowFolderSelection: boolean = false;

  @state()
  private _selectedItems: Set<string> = new Set();

  static styles = css`
    :host 
    {
      display: block;
      font-family: sans-serif;
      border-radius: 10px;
      padding: 10px;
      background: #000;
      width: calc(100% - 20px);
      font-family: var(--font);
      height: 300px;
      overflow: auto;
    }

    .item 
    {
      display: flex;
      align-items: center;
      padding: 8px;
      font-size: var(--size-lg);
      cursor: pointer;
      border-radius: 5px;
      user-select: none;
      transition: background 0.2s;
    }
    
    .item:hover 
    {
      background: #454545;
    }

    .item.selected
    {
      background: #242222;
    }

    .icon 
    {
      margin-right: 10px;
    }

    .icon.folder::before
    {
      content: '\\F3D7';
      font-family: 'bootstrap-icons';
    }

    .icon.file::before
    {
      content: '\\F35C';
      font-family: 'bootstrap-icons';
    }
  `;
  
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
      return html`<div style="padding: 10px; color: #888;">Folder jest pusty...</div>`;
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