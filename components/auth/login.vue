<template>
  <section class="d-flex h100 align-center justify-center">
    <v-form @keyup.native.enter="signIn" class="login-card">
      <v-card-text>
        <label for="">Username/Email</label>
        <v-text-field
          name="username"
          type="text"
          hint="Hint: CrowbarKiller"
          filled
          outlined
        ></v-text-field>
        <label for="">Password</label>
        <v-text-field
          name="password"
          hint="Hint: BlackMesaScientist"
          type="password"
          filled
          outlined
        ></v-text-field>
        <nuxt-link to="/password-reset">Forgot Password?</nuxt-link>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary">Login</v-btn>
      </v-card-actions>
    </v-form>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>
