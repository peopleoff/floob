<template>
  <section class="d-flex h100 align-center justify-center">
    <v-form @keyup.native.enter="signIn" class="login-card">
      <v-card-text>
        <label for="">Username</label>
        <v-text-field
          name="username"
          hint="Hint: xXxFearlessFuhrerxXx"
          type="text"
          filled
          outlined
        ></v-text-field>
        <label for="">Email</label>
        <v-text-field
          name="username"
          hint="Hint: MaesHughes@floob.gg"
          type="text"
          filled
          outlined
        ></v-text-field>
        <label for="">Date of Birth</label>
        <v-text-field
          name="dob"
          hint="Hint: 10/03/1911"
          filled
          outlined
        ></v-text-field>
        <label for="">Password</label>
        <v-text-field
          name="password"
          type="password"
          hint="Hint: YesThe$e@reFullMetalReference$!"
          filled
          outlined
        ></v-text-field>
        <label for="">Confirm Password</label>
        <v-text-field
          name="password"
          type="password"
          hint="Hint: YesThe$e@reFullMetalReference$!"
          filled
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary">Register</v-btn>
      </v-card-actions>
    </v-form>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>
