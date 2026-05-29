import { reactive } from 'vue'

export const cardsStore = reactive({
  cards: [
    { card_number: '4444-1000-2000-1000', first_name: 'Jose',    last_name: 'Rizal',     membership_tier: 'gold',   user_description: '' },
    { card_number: '4444-1000-2000-2000', first_name: 'Juan',    last_name: 'Luna',      membership_tier: 'silver', user_description: '' },
    { card_number: '4444-1000-2000-3000', first_name: 'Marcelo', last_name: 'Del Pilar', membership_tier: 'bronze', user_description: "Marcelo is a very particular customer. He knit-picks everything but he tips very well if you induldge all of his requests." }
  ],

  addCard({ first_name, last_name, membership_tier, description }) {
    const rand = () => String(Math.floor(1000 + Math.random() * 9000))
    const card_number = `4444-${rand()}-${rand()}-${rand()}`
    this.cards.push({
      card_number,
      first_name,
      last_name,
      membership_tier,
      user_description: description || ''
    })
    return card_number
  },

  findCard(card_number) {
    return this.cards.find(c => c.card_number === card_number) || null
  }
})
