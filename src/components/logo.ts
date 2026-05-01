import {LitElement, css, html} from 'lit'
import {customElement} from 'lit/decorators.js'
import logo_path from '../assets/logo.png';

@customElement('onyks-logo')
export class Onyks_Logo extends LitElement 
{
render() {
        return html`<img src="${logo_path}">`;
    }

    static styles = css`
        :host 
        {
            display: block; 
        }

        img 
        {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            
            filter: var(--logo-filter);
            transition: filter 0.3s ease;
        }
    `;
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-logo': Onyks_Logo
    }
}