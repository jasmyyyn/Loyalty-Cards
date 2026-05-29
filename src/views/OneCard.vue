<template>
  <div>
    <h1 class="title">Card Details</h1>
    <div class="box">
      <div class="columns">
        <div class="column">
          <p class="heading">Card Number</p>
          <p class="title is-5">{{ card.card_number }}</p>
        </div>
        <div class="column">
          <p class="heading">Name</p>
          <p class="title is-5">{{ card.first_name }} {{ card.last_name }}</p>
        </div>
        <div class="column">
          <p class="heading">Membership Tier</p>
          <span class="tag is-info is-medium">{{ card.membership_tier }}</span>
        </div>
      </div>
      <hr />
      <div class="field">
        <p class="heading">Description</p>
        <p>{{ card.user_description }}</p>
      </div>
      <br />
      <router-link to="/cards" class="button is-dark">Back to All Cards</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card: {
        card_number: "4444-1000-2000-3000",
        first_name: "Marcelo",
        last_name: "Del Pilar",
        membership_tier: "bronze",
        user_description: "Marcelo is a very particular customer. He knit-picks everything but he tips very well if you induldge all of his requests."
      }
    }
  }
}
</script>