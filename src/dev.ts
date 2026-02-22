import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import './components/nav';
import './components/logo';

interface PageModule 
{
  init?: () => void;
}

const menuContainer = document.querySelector<HTMLElement>('#menu');
const contentContainer = document.querySelector<HTMLElement>('#app');

const htmlModules = import.meta.glob('./examples/*.html', 
{
  query: '?raw',
  import: 'default'
}) as Record<string, () => Promise<string>>;

const scriptModules = import.meta.glob('./components/*.ts') as Record<string, () => Promise<PageModule>>;

const pageNames = Object.keys(htmlModules).map(path => path.replace('./examples/', '').replace('.html', ''));
// BUG FIX
for(let el of Object.keys(scriptModules))
{
    if (scriptModules[el]) 
    {
      const mod = await scriptModules[el]();
      if (mod && typeof mod.init === 'function') 
      {
        mod.init();
      }
    }
}
// 

async function navigateTo(pageName: string, updateHistory = true): Promise<void> 
{
  if (!contentContainer) return;

  const htmlPath = `./examples/${pageName}.html`;
  const scriptPath = `./components/${pageName}.ts`;

  if (htmlModules[htmlPath]) 
  {
    try 
    {
      const rawHtml = await htmlModules[htmlPath]();

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = rawHtml;

      tempDiv.querySelectorAll('pre code').forEach((block) => 
      {
        const codeContent = block.innerHTML;
        block.textContent = codeContent.trim();
        hljs.highlightElement(block as HTMLElement);
      });

      contentContainer.innerHTML = '';
      contentContainer.appendChild(tempDiv);

      if (updateHistory) 
      {
        window.history.pushState({ pageName }, "", `/${pageName}`);
      }

      if (scriptModules[scriptPath]) 
      {
        const mod = await scriptModules[scriptPath]();
        if (mod && typeof mod.init === 'function') 
        {
          mod.init();
        }
      }
    } 
    catch (err) 
    {
      console.error("Błąd ładowania strony:", err);
      contentContainer.innerHTML = "<h1>Błąd ładowania treści</h1>";
    }
  } 
  else 
  {
    contentContainer.innerHTML = "<h1>404 - Nie znaleziono</h1>";
  }
}

function setupMenu(): void 
{
  if (!menuContainer) return;
  pageNames.forEach(name => 
  {
    const btn = document.createElement('onyks-nav-option');
    btn.textContent = name.toUpperCase();
    // btn.style.cssText = "margin-right: 15px; cursor: pointer; color: blue;";
    btn.onclick = (e) => 
    {
      e.preventDefault();
      navigateTo(name);
    };
    menuContainer.appendChild(btn);
  });
}

window.addEventListener('popstate', (e) => 
{
  const pageName = e.state?.pageName || 'start';
  navigateTo(pageName, false);
});

setupMenu();
const initialPath = window.location.pathname.slice(1) || 'start';
navigateTo(initialPath);