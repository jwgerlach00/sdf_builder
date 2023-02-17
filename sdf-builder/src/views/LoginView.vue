<template>
  <v-container>
    <v-row>
      <v-card width="500px" height="600px">
        <h2>Welcome</h2>
        <br>
        <v-row>
          <v-col>
            <v-btn-toggle color="deep-orange" style="width:100%;" v-model="modelLoginNav">
              <v-btn class="nav-btn" style="width:50%;" value="login">Login</v-btn>
              <v-btn class="nav-btn" style="width:50%;" value="register">Register</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row justify="center" dense>
          <v-col cols="12">
            <v-text-field label="Username" v-model="username" color="deep-orange" variant="outlined" hide-details/>
          </v-col>
        </v-row>

        <br v-if="modelLoginNav === 'register'">

        <v-row justify="center" dense>
          <v-col cols="12">
            <v-text-field label="Password" v-model="password" color="deep-orange" variant="outlined" hide-details
            :append-icon="eyePassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="() => (eyePassword = !eyePassword)"
            :type="eyePassword ? 'password' : 'text'"/>
          </v-col>
        </v-row>

        <v-row justify="center" dense v-if="modelLoginNav === 'register'">
          <v-col cols="12">
            <v-text-field label="Confirm password" v-model="confirmPassword" color="deep-orange" variant="outlined"
            hide-details
            :append-icon="eyeConfirm ? 'mdi-eye' : 'mdi-eye-off'" @click:append="() => (eyeConfirm = !eyeConfirm)"
            :type="eyeConfirm ? 'password' : 'text'"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="login()" block v-if="modelLoginNav === 'login'">Login</v-btn>
            <v-btn @click="register()" block v-else>Register</v-btn>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-alert type="error" v-if="errorMsg">{{ errorMsg }}</v-alert>
            <v-alert type="success" v-if="successMsg">{{ successMsg }}</v-alert>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'
import { API_URL } from '@/main.js'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  axios.get(`${API_URL}/logout`)
})

const modelLoginNav = ref('login')

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const eyePassword = ref(true)
const eyeConfirm = ref(true)

const errorMsg = ref('')
const successMsg = ref('')

function login () {
  axios.post(`${API_URL}/login`, {
    username: username.value,
    password: password.value
  }).then(res => {
    router.push({ name: 'tables' })
  }).catch(e => {
    if (e.response.status === 401) {
      errorMsg.value = 'Invalid username or password'
    } else {
      errorMsg.value = 'An errorMsg occurred'
    }
  })
}

function register () {
  if (username.value === '' || username.value === '') {
    errorMsg.value = 'Username cannot be empty'
  } else if (password.value === '' || confirmPassword.value === '') {
    errorMsg.value = 'Password cannot be empty'
  } else if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match'
  } else {
    axios.post(`${API_URL}/register`, {
      username: username.value,
      password: password.value
    }).then(_ => {
      successMsg.value = 'User created successfully'
    }).catch(e => {
      if (e.response.status === 409) {
        errorMsg.value = 'Username already exists'
      } else {
        errorMsg.value = 'An error occurred'
      }
    })
  }
}

</script>

<style scoped>
div.v-card {
  margin: auto;
  margin-top: 100px;
  padding: 20px;
  border-radius: 20px;
}
h2 {
  text-align: center;
  font-size: 30pt;
}
button.v-btn {
  height: 50px;
}
.v-text-field {
  color: #f8f8f2;
}
</style>
