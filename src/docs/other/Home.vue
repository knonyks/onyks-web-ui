<script setup>
  import Content from '../components/Content.vue';
  import PageTitle from '../components/PageTitle.vue';
  import Text from '../components/Text.vue';
</script>


<template>
  <Content>
    <h1>ONYKS WebUI</h1>
    <h2>A lightweight, fast, and modern UI component library built with Web Components and Lit.</h2>
    <p>ONYKS WebUI provides a set of reusable, accessible, and highly performant interface elements. By leveraging the native Web Components standard, these elements work in any framework (React, Vue, Angular, Svelte) or with no framework at all.</p>
    <h3>✨ Features</h3>
    <p>⚡ Blazing Fast: Built on top of lit-html for efficient rendering and minimal bundle size.</p>
    <p>🌐 Framework Agnostic: Drop these components into any application. They are just HTML tags.</p>
    <p>🎨 Fully Customizable: Native support for CSS Custom Properties (Variables) and Shadow DOM styling.</p>
    <!-- <p>♿ Accessible: Components follow WAI-ARIA standards out of the box.</p> -->
    <p>📘 TypeScript: Written in TypeScript with complete type definitions included.</p>
    <h2>📦 Installation</h2>
    <h3>Install the library via npm or yarn:</h3>
    <onyks-code-block language="bash" file="LICENSE" title="" size="m" id="license" style="width: 100%;">
    npm install https://github.com/knonyks/onyks-web-ui-system
    # or
    yarn add https://github.com/knonyks/onyks-web-ui-system
    </onyks-code-block>
    <h3>The documentation with examples may be run by using vite:</h3>
    
    <onyks-code-block language="bash" file="LICENSE" title="" size="m" id="license" style="width: 100%;">
    npm run dev
    </onyks-code-block>
    
    <h3>Ready or stable elements</h3>
    <ul>
      <li>Alert</li>
      <li>Path</li>
    </ul>
  </Content>
</template> 