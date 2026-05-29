<template>
  <div>
    <h1 class="title">Create Loyalty Card</h1>
    <div class="box">
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" v-model="form.first_name" placeholder="Enter first name" />
        </div>
      </div>

      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" type="text" v-model="form.last_name" placeholder="Enter last name" />
        </div>
      </div>

      <div class="field">
        <label class="label">Membership Tier</label>
        <div class="control">
          <div class="select">
            <select v-model="form.membership_tier">
              <option value="">Select a tier</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" v-model="form.description" placeholder="Enter description"></textarea>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-primary" @click="submitForm">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        membership_tier: '',
        description: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$router.push('/cards')
    }
  }
}
</script>