<script setup>
  import PageContent from '../components/PageContent.vue';
</script>

<template>
  <PageContent>
      <h1>ONYKS WebUI</h1>
      <h2>A lightweight, fast, and modern UI component library built with Web Components and Lit.</h2>
      <h3>ONYKS WebUI provides a set of reusable, accessible, and highly performant interface elements. By leveraging the native Web Components standard, these elements work in any framework (React, Vue, Angular, Svelte) or with no framework at all.</h3>
      <onyks-alert type="warning">This project has not been completed yet. It can be unstable in use.</onyks-alert>
      <onyks-alert type="info">These docs of the project are example of using this project and tester for development at the same time; it uses implemented elements.</onyks-alert>
      <h4>✨ Features</h4>
      <ul>
        <li>⚡ Blazing Fast: Built on top of lit-html for efficient rendering and minimal bundle size.</li>
        <li>🌐 Framework Agnostic: Drop these components into any application. They are just HTML tags.</li>
        <li>🎨 Fully Customizable: Native support for CSS Custom Properties (Variables) and Shadow DOM styling.</li>
        <li>📘 TypeScript: Written in TypeScript with complete type definitions included.</li>
      </ul>
    <h4>📦 Installation</h4>
    <p>Install the library via npm or yarn:</p>
    <onyks-code-block title="How to install">
    npm install https://github.com/knonyks/onyks-web-ui-system
    # or
    yarn add https://github.com/knonyks/onyks-web-ui-system
    </onyks-code-block>
    <p>The documentation with examples may be run by using vite:</p>
    <onyks-code-block title="How to run docs locally">
      git clone https://github.com/knonyks/onyks-web-ui-system
      cd onyks-web-ui-system
      npm i
      npm run dev
    </onyks-code-block>

    <h4>Used software</h4>
    Details in package.json.

    <h4>License</h4>

    <onyks-code-block title="LICENSE">
    Here will be a license soon :>
    </onyks-code-block>

  </PageContent>
</template>

<style lang="css" scoped>
  ul
  {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      margin: 0;
      padding-left: var(--spacing-xl);
  }
</style>