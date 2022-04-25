<template>
  <main class="logi">
    <section class="forms">
      <form class="register">
        <h2>Register</h2>
        <input
          v-model="register_form.email"
          type="email"
          name=""
          id=""
          placeholder="Email address"
        />
        <input
          v-model="register_form.password"
          type="password"
          name=""
          id=""
          placeholder="Password"
        />
        <input type="submit" value="Register" />
      </form>
      <form class="login"></form>
    </section>
  </main>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();

    return {
      login_form,
      register_form,
    };
  },
};
</script>

<style>
</style>