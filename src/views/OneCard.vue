<template>
  <div class="detail-page">
    <router-link to="/cards" class="back-link">← All Cards</router-link>

    <div v-if="card" class="detail-layout">
      <!-- Card visual -->
      <div class="detail-card-wrap">
        <div
          class="vault-card detail-card"
          @mousemove="onMove"
          @mouseleave="onLeave"
        >
          <div
            class="card-inner"
            :style="{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              background: p.bg
            }"
          >
            <div
              class="card-spotlight"
              :style="{
                background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, ${p.accent}28, transparent 55%)`
              }"
            />
            <div class="grain card-grain" />
            <div
              class="card-hairline"
              :style="{ boxShadow: `inset 0 0 0 1px ${p.ring}` }"
            />

            <div class="card-body">
              <div class="card-top">
                <div>
                  <p class="mono-label">Membre</p>
                  <h2 class="card-name">{{ card.first_name }} {{ card.last_name }}</h2>
                </div>
                <span
                  class="card-monogram"
                  :style="{
                    color: p.accent,
                    textShadow: `0 0 24px ${p.accent}55`
                  }"
                >{{ card.first_name.charAt(0) }}</span>
              </div>

              <div class="card-bottom">
                <div>
                  <p class="mono-label">Tier</p>
                  <p class="card-tier" :style="{ color: p.accent }">{{ capitalize(card.membership_tier) }}</p>
                </div>
                <div
                  class="card-progress"
                  :style="{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }"
                />
                <p class="card-number-mono">{{ card.card_number }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info panel -->
      <div class="detail-info">
        <div class="info-block">
          <p class="info-label">Card Number</p>
          <p class="info-value info-mono">{{ card.card_number }}</p>
        </div>

        <div class="info-block">
          <p class="info-label">Name</p>
          <p class="info-value">{{ card.first_name }} {{ card.last_name }}</p>
        </div>

        <div class="info-block">
          <p class="info-label">Membership Tier</p>
          <span
            class="tier-badge"
            :style="{
              color: p.accent,
              borderColor: p.accent + '55',
              background: p.accent + '12'
            }"
          >{{ capitalize(card.membership_tier) }}</span>
        </div>

        <div v-if="card.user_description" class="info-block">
          <p class="info-label">Description</p>
          <p class="info-desc">{{ card.user_description }}</p>
        </div>
      </div>
    </div>

    <!-- Card not found -->
    <div v-else class="not-found">
      <p class="not-found-msg">Card not found.</p>
      <router-link to="/cards" class="vault-btn vault-btn-outline">Back to All Cards</router-link>
    </div>
  </div>
</template>

<script>
import { cardsStore } from '@/store/cards.js'

const PALETTES = {
  gold:     { bg: 'linear-gradient(135deg, oklch(0.45 0.08 75), oklch(0.18 0.03 60))',   ring: 'oklch(0.88 0.14 85 / 0.55)', accent: 'oklch(0.92 0.12 88)' },
  silver:   { bg: 'linear-gradient(135deg, oklch(0.10 0.005 40), oklch(0.06 0.005 40))', ring: 'oklch(0.82 0.13 85 / 0.35)', accent: 'oklch(0.82 0.13 85)' },
  bronze:   { bg: 'linear-gradient(135deg, oklch(0.24 0.04 50), oklch(0.12 0.02 45))',   ring: 'oklch(0.72 0.1 65 / 0.35)',  accent: 'oklch(0.78 0.11 70)' },
  platinum: { bg: 'linear-gradient(135deg, oklch(0.18 0.04 280), oklch(0.08 0.02 270))', ring: 'oklch(0.72 0.1 280 / 0.35)', accent: 'oklch(0.85 0.08 90)' }
}

const DEFAULT = {
  bg:     'linear-gradient(135deg, oklch(0.14 0.005 60), oklch(0.09 0.01 30))',
  ring:   'oklch(0.82 0.13 85 / 0.2)',
  accent: 'oklch(0.82 0.13 85)'
}

export default {
  data() {
    return {
      store: cardsStore,
      tilt: { rx: 0, ry: 0, mx: 50, my: 50 }
    }
  },
  computed: {
    card() {
      return cardsStore.findCard(this.$route.params.card_number)
    },
    p() {
      return this.card ? (PALETTES[this.card.membership_tier] || DEFAULT) : DEFAULT
    }
  },
  methods: {
    capitalize(str) {
      return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
    },
    onMove(e) {
      const el = e.currentTarget
      const r  = el.getBoundingClientRect()
      const x  = (e.clientX - r.left) / r.width
      const y  = (e.clientY - r.top)  / r.height
      this.tilt = { rx: (0.5 - y) * 10, ry: (x - 0.5) * 12, mx: x * 100, my: y * 100 }
    },
    onLeave() {
      this.tilt = { rx: 0, ry: 0, mx: 50, my: 50 }
    }
  }
}
</script>

<style scoped>
.detail-page {
  animation: fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.back-link {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: oklch(0.6 0.02 70);
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: oklch(0.94 0.01 80);
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

@media (max-width: 760px) {
  .detail-layout { grid-template-columns: 1fr; }
}

.detail-card-wrap { width: 100%; }

.detail-card {
  aspect-ratio: 1.586 / 1;
  width: 100%;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-out;
  transform-style: preserve-3d;
}

.card-spotlight {
  position: absolute;
  inset: 0;
  opacity: 0.7;
  transition: opacity 0.5s;
  pointer-events: none;
}

.vault-card:hover .card-spotlight { opacity: 1; }

.card-grain {
  position: absolute;
  inset: 0;
  opacity: 0.18;
  mix-blend-mode: overlay;
  pointer-events: none;
}

.card-hairline {
  position: absolute;
  inset: 12px;
  border-radius: calc(var(--radius) - 2px);
  pointer-events: none;
}

.card-body {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.mono-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: oklch(0.6 0.02 70 / 0.8);
  margin: 0 0 0.35rem;
}

.card-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.55rem;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: oklch(0.94 0.01 80);
  margin: 0;
}

.card-monogram {
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  line-height: 1;
  opacity: 0.9;
  flex-shrink: 0;
}

.card-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card-tier {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.2rem 0 0;
}

.card-progress {
  height: 2px;
  width: 100%;
  border-radius: 1px;
}

.card-number-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: oklch(0.6 0.02 70 / 0.65);
  margin: 0;
}

/* Info panel */
.detail-info {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding-top: 0.25rem;
}

.info-block {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.info-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: oklch(0.6 0.02 70);
  margin: 0;
}

.info-value {
  font-size: 1.05rem;
  font-weight: 500;
  color: oklch(0.94 0.01 80);
  margin: 0;
}

.info-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  font-weight: 400;
}

.tier-badge {
  display: inline-block;
  padding: 0.3rem 0.85rem;
  border: 1px solid;
  border-radius: 0.3rem;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  font-family: 'Cormorant Garamond', serif;
}

.info-desc {
  font-size: 0.9rem;
  line-height: 1.75;
  color: oklch(0.7 0.01 70);
  margin: 0;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}

.not-found-msg {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  color: oklch(0.6 0.02 70);
}
</style>
