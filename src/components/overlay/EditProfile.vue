<template>
  <v-dialog
    v-model="editProfileOverlay"
    @click:outside="$emit('closeOverlayEditProfile', false)"
    @keydown.esc="$emit('closeOverlayEditProfile', false)"
    hide-overlay
    color="transparent"
    :elevation="0"
    width="max-content"
  >
    <v-card width="max-content" class="mx-auto" :elevation="0">
      <v-card-text>
        <v-container>
          <v-row align="center">
            <v-col align-self="center" cols="12" class="pa-0">
              <v-form
                ref="form"
                class="px-9 py-9 rounded-lg mx-auto"
                :style="$vuetify.breakpoint.xsOnly ? 'width: 100%' : 'width:600px'"
                enctype="multipart/form-data"
                v-model="valid"
                lazy-validation
                @submit.prevent="validate"
              >
                <v-text-field
                  v-model="firstName"
                  :counter="10"
                  :rules="firstNameRules"
                  name="firstName"
                  label="First name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="lastName"
                  :counter="10"
                  :rules="lastNameRules"
                  name="lastName"
                  label="Last name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  name="email"
                  required
                ></v-text-field>
                <v-file-input
                  @change="handleInputAvatar($event)"
                  :value="avatar"
                  ref="inputAvatar"
                  :rules="avatarRules"
                  name="avatar"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Selectionner un avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                ></v-file-input>
                <v-btn :disabled="!valid" color="success" type="submit" class="mr-4 mt-4">Validate</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditProfile',
  props: {
    'editProfileOverlay': { type: Boolean },
    'profile': { type: Object, required: true },
  },
  data () {
    return {
      valid: true,
      firstName: this.profile.profile.first_name,
      lastName: this.profile.profile.last_name,
      email: this.profile.user.email,
      avatar: null,
      firstNameRules: [
        v => !!v || 'First name is required', // true aussi non ...
        v => (v && v.length <= 10) || 'First name must be less than 10 characters',
      ],
      lastNameRules: [
        v => !!v || 'Last name is required', // true aussi non ...
        v => (v && v.length <= 10) || 'Last name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      avatarRules: [
        v => !v || v.size < 2000000 || 'L\'image doit peser moins de 2 MB!',
      ],
    }
  },
  methods: {
    validate () {
      /* ------------------------------- Just avatar ------------------------------ */
      if (this.avatar) {
        let formImage = new FormData()
        formImage.append('picture_path', this.avatar)
        formImage.append('_method', 'PUT');
        axios.post('http://127.0.0.1:8000/api/update-img-profile', formImage)
      }
      /* ------------------------------- Other field ------------------------------ */
      if (this.firstName != this.profile.profile.first_name
        || this.lastName != this.profile.profile.last_name
        || this.email != this.profile.user.email) {

        let form = new FormData(this.$refs.form.$el)
        form.append('first_name', this.firstName)
        form.append('last_name', this.lastName)
        form.append('email', this.email)
        axios
          .post('http://127.0.0.1:8000/api/edit-profile', form)
      }
      this.$refs.form.validate();
      // this.$refs.form.reset();
      this.$emit('editProfileSuccess', false);
    },
    handleInputAvatar (file) {
      this.avatar = file;
    }
  },
}
</script>