<template lang="pug">
  #app
    .head
      img(src='dist/logo.png')
      h1 Vue.js with LastFM
      select(v-model="selectedCountry")
        option(v-for="country in countries" v-bind:value="country.value") {{ country.name }}
    spinner(v-show="loading")
    ul
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")
</template>

<script>
import Artist from './components/Artist'
import Spinner from './components/Spinner'
import getArtists from './api'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
        { name: 'Argentina', value: 'argentina'},
        { name: 'Colombia',  value: 'colombia'},
        { name: 'España',    value: 'spain'}
      ],
      selectedCountry: 'colombia',
      loading: true
    }
  },
  components: {
    Artist,
    Spinner
  },
  methods: {
    refreshArtists() {
      // const self = this
      this.loading = true
      this.artists = []
      getArtists(this.selectedCountry)
        .then(artists => this.artists = artists)
        .catch(error => console.error(error))
        .finally(() => this.loading = false )
    }
  },
  mounted() {
    this.refreshArtists()
  },
  watch: {
    selectedCountry() {
      this.refreshArtists()
    }
  }
}
</script>

<style lang="stylus">
body
  margin 0

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

.head
  background-color #5d6670
  padding 20px 0 40px 0

h1, h2
  font-weight normal
  color white

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983

select, input
  background-color white
  color #2c3e50
  font-size 1.3em
  padding 10px
  width 250px
  border  2px #42b983 solid
  border-radius 5px
</style>
