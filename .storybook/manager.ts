import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light', // lub 'dark', w zależności od tego, jakiego motywu używasz

    // Tytuł, który wyświetli się po najechaniu lub gdy logo się nie załaduje
    brandTitle: 'ONYKS WebUI', 
    brandUrl: 'https://github.com/...', // Link po kliknięciu w logo
    
    // Ścieżka do Twojego logo (plik musi być w folderze public)
    brandImage: '/logo.png', 
    brandTarget: '_self',
  }),
});