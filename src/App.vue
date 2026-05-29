<template>
  <div class="app-root">
    <nav class="vault-nav">
      <div class="vault-nav-inner">
        <span class="vault-nav-brand">Vault</span>
        <div class="vault-nav-links">
          <router-link to="/cards" class="vault-nav-link">All Cards</router-link>
          <router-link to="/cards/new" class="vault-nav-link vault-nav-cta">Create Card</router-link>
        </div>
      </div>
    </nav>
    <main class="vault-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
}

.vault-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: oklch(0.11 0.008 50 / 0.85);
  border-bottom: 1px solid oklch(0.78 0.1 80 / 0.08);
}

.vault-nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.vault-nav-brand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: oklch(0.82 0.13 85);
}

.vault-nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.vault-nav-link {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: oklch(0.6 0.02 70);
  text-decoration: none;
  transition: color 0.2s;
}

.vault-nav-link:hover,
.vault-nav-link.router-link-active {
  color: oklch(0.94 0.01 80);
}

.vault-nav-cta {
  padding: 0.4rem 1rem;
  border: 1px solid oklch(0.82 0.13 85 / 0.35);
  border-radius: 0.375rem;
  color: oklch(0.82 0.13 85) !important;
}

.vault-nav-cta:hover {
  background: oklch(0.82 0.13 85 / 0.08);
}

.vault-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  position: relative;
  z-index: 2;
}
</style>
