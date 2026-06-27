import {LitElement, css, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import logo_path from '../assets/logo.png';

@customElement('onyks-logo')
export class OnyksLogo extends LitElement 
{
    @property({type: Boolean, reflect: true})
    invert = false;

    render() 
    {
        return html`<img src="${logo_path}" part="logo">`;
    }

    static styles = css`
        :host 
        {
            display: block;
            height: fit-content;
            width: fit-content;
        }

        img
        {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: filter 0.3s ease;
        }

        :host([invert]) > img
        {
            filter: invert(calc(1 - var(--onyks-logo-invert)));
        }
    `;
}

declare global 
{
    interface HTMLElementTagNameMap 
    {
        'onyks-logo': OnyksLogo
    }
}