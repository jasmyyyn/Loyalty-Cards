<template>
  <div>
    <h1 class="page-title gold-text">All Loyalty Cards</h1>

    <div class="cards-grid">
      <div
        v-for="(card, i) in cards"
        :key="card.card_number"
        class="vault-card card-tile"
        :style="{ animation: `fade-up 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms both` }"
        @click="$router.push('/cards/' + card.card_number)"
        @mousemove="onMove($event, i)"
        @mouseleave="onLeave(i)"
      >
        <div
          class="card-inner"
          :style="{
            transform: `rotateX(${getTilt(i).rx}deg) rotateY(${getTilt(i).ry}deg)`,
            background: getpalette(card.membership_tier).bg
          }"
        >
          <!-- Gloss spotlight follows cursor -->
          <div
            class="card-spotlight"
            :style="{
              background: `radial-gradient(circle at ${getTilt(i).mx}% ${getTilt(i).my}%, ${getpalette(card.membership_tier).accent}28, transparent 55%)`
            }"
          />
          <!-- Film grain texture -->
          <div class="grain card-grain" />
          <!-- Hairline inset frame -->
          <div
            class="card-hairline"
            :style="{ boxShadow: `inset 0 0 0 1px ${getpalette(card.membership_tier).ring}` }"
          />

          <!-- Card content -->
          <div class="card-body">
            <!-- Top row: name + monogram -->
            <div class="card-top">
              <div>
                <p class="mono-label">Membre</p>
                <h3 class="card-name">{{ card.first_name }} {{ card.last_name }}</h3>
              </div>
              <span
                class="card-monogram"
                :style="{
                  color: getpalette(card.membership_tier).accent,
                  textShadow: `0 0 24px ${getpalette(card.membership_tier).accent}55`
                }"
              >{{ card.first_name.charAt(0) }}</span>
            </div>

            <!-- Bottom row: tier + card number -->
            <div class="card-bottom">
              <div>
                <p class="mono-label">Tier</p>
                <p
                  class="card-tier"
                  :style="{ color: getpalette(card.membership_tier).accent }"
                >{{ capitalize(card.membership_tier) }}</p>
              </div>
              <div
                class="card-progress"
                :style="{ background: `linear-gradient(90deg, ${getpalette(card.membership_tier).accent}, transparent)` }"
              />
              <p class="card-number-mono">{{ card.card_number }}</p>
            </div>
          </div>
        </div>
      </div>
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

const DEFAULT_PALETTE = {
  bg:     'linear-gradient(135deg, oklch(0.14 0.005 60), oklch(0.09 0.01 30))',
  ring:   'oklch(0.82 0.13 85 / 0.2)',
  accent: 'oklch(0.82 0.13 85)'
}

export default {
  data() {
    return {
      store: cardsStore,
      tilts: {}
    }
  },
  computed: {
    cards() {
      return this.store.cards
    }
  },
  methods: {
    getpalette(tier) {
      return PALETTES[tier] || DEFAULT_PALETTE
    },
    capitalize(str) {
      return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
    },
    getTilt(i) {
      return this.tilts[i] || { rx: 0, ry: 0, mx: 50, my: 50 }
    },
    onMove(e, i) {
      const el = e.currentTarget
      const r  = el.getBoundingClientRect()
      const x  = (e.clientX - r.left) / r.width
      const y  = (e.clientY - r.top)  / r.height
      this.tilts[i] = { rx: (0.5 - y) * 10, ry: (x - 0.5) * 12, mx: x * 100, my: y * 100 }
    },
    onLeave(i) {
      this.tilts[i] = { rx: 0, ry: 0, mx: 50, my: 50 }
    }
  }
}
</script>

<style scoped>
.page-title {
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 2.5rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .cards-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .cards-grid { grid-template-columns: 1fr; }
}

.card-tile {
  aspect-ratio: 1.586 / 1;
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

.vault-card:hover .card-spotlight {
  opacity: 1;
}

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
</style>
