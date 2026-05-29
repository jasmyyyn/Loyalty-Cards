<template>
  <div>
    <h1 class="title">All Loyalty Cards</h1>
    <div class="columns is-multiline">
      <div class="column is-one-third" v-for="card in cards" :key="card.card_number">
        <div class="card">
          <div class="card-content">
            <p class="title is-5">{{ card.first_name }} {{ card.last_name }}</p>
            <p class="subtitle is-6">{{ card.card_number }}</p>
            <p>
              <span class="tag is-info">{{ card.membership_tier }}</span>
            </p>
          </div>
          <div class="card-footer">
            <router-link :to="'/cards/' + card.card_number" class="card-footer-item">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          card_number: "4444-1000-2000-1000",
          first_name: "Jose",
          last_name: "Rizal",
          membership_tier: "gold"
        },
        {
          card_number: "4444-1000-2000-2000",
          first_name: "Juan",
          last_name: "Luna",
          membership_tier: "silver"
        },
        {
          card_number: "4444-1000-2000-3000",
          first_name: "Marcelo",
          last_name: "Del Pilar",
          membership_tier: "bronze"
        }
      ]
    }
  }
}
</script>