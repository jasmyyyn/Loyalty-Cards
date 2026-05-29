<template>
  <div>
    <nav class="navbar is-dark" role="navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/cards" class="navbar-item">All Cards</router-link>
          <router-link to="/cards/new" class="navbar-item">Create Card</router-link>
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>
  </div>
</template>