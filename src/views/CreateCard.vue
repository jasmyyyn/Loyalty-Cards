<template>
  <div class="create-page">
    <h1 class="page-title gold-text">Create Loyalty Card</h1>

    <div class="form-panel">
      <div class="form-group">
        <label class="form-label">First Name</label>
        <input
          class="vault-input"
          type="text"
          v-model="form.first_name"
          placeholder="Enter first name"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Last Name</label>
        <input
          class="vault-input"
          type="text"
          v-model="form.last_name"
          placeholder="Enter last name"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Membership Tier</label>
        <div class="select-wrap">
          <select class="vault-input" v-model="form.membership_tier">
            <option value="" disabled>Select a tier</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="bronze">Bronze</option>
            <option value="platinum">Platinum</option>
          </select>
          <span class="select-arrow">▾</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea
          class="vault-input form-textarea"
          v-model="form.description"
          placeholder="Enter description"
          rows="4"
        ></textarea>
      </div>

      <p v-if="error" class="form-error">{{ error }}</p>

      <button class="vault-btn vault-btn-gold submit-btn" @click="submitForm">
        Issue Card
      </button>
    </div>
  </div>
</template>

<script>
import { cardsStore } from '@/store/cards.js'

export default {
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        membership_tier: '',
        description: ''
      },
      error: ''
    }
  },
  methods: {
    submitForm() {
      this.error = ''

      if (!this.form.first_name.trim()) {
        this.error = 'First name is required.'
        return
      }
      if (!this.form.last_name.trim()) {
        this.error = 'Last name is required.'
        return
      }
      if (!this.form.membership_tier) {
        this.error = 'Please select a membership tier.'
        return
      }

      const card_number = cardsStore.addCard(this.form)
      this.$router.push('/cards/' + card_number)
    }
  }
}
</script>

<style scoped>
.create-page {
  max-width: 520px;
  animation: fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 2rem;
}

.form-panel {
  background: oklch(0.14 0.01 50);
  border: 1px solid oklch(0.25 0.015 50 / 0.6);
  border-radius: calc(var(--radius) + 4px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 20px 60px -10px rgb(0 0 0 / 0.5);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: oklch(0.6 0.02 70);
}

.select-wrap {
  position: relative;
}

.select-arrow {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: oklch(0.6 0.02 70);
  pointer-events: none;
  font-size: 0.75rem;
}

select.vault-input {
  cursor: pointer;
  padding-right: 2rem;
}

select.vault-input option {
  background: oklch(0.14 0.01 50);
  color: oklch(0.94 0.01 80);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-error {
  font-size: 0.8rem;
  color: oklch(0.65 0.18 25);
  margin: -0.5rem 0 0;
  font-family: 'JetBrains Mono', monospace;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.25rem;
}
</style>
