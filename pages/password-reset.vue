<template>
  <section class="d-flex h100 align-center justify-center">
    <v-sheet width="50%" class="pa-5" color="#36393f">
      <h1 class="text-center">Welcome Back!</h1>
      <v-form @keyup.native.enter="signIn">
        <v-card-text>
          <label for="">Username/Email</label>
          <v-text-field
            name="username"
            type="text"
            hint="Hint: CrowbarKiller"
            filled
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="primary">Request Password Change</v-btn>
        </v-card-actions>
      </v-form>
      <p class="caption px-2">
        Ready to <nuxt-link to="/login">Login?</nuxt-link>
      </p>
    </v-sheet>
  </section>
</template>

<script>
export default {
  layout: "landing"
};
</script>

<style>
</style>
