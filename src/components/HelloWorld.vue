<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <b-button variant="primary" @click="getDogeData" id="givemespace">Dogecoin</b-button>
    <b-button variant="primary" @click="getLinkData" id="givemespace">Chainlink</b-button>
    <info :text="'Change last 24 hours: ' + percentChange1 + '%'"/>
    <info :text="'Change last 7 days: ' + percentChange7 + '%'"/>
    <info :text="'Change last 30 days: ' + percentChange30 + '%'"/>
    <info :text="'Change last 200 days: ' + percentChange200 + '%'"/>
    <info :text="'Change last 365 days: ' + percentChange365 + '%'"/>

  </div>
</template>

<script>
import info from "./info.vue"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    info
  },
  methods: {
      getDogeData: function () {
          this.fetchData("https://api.coingecko.com/api/v3/coins/dogecoin?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true")
      },
      getLinkData: function () {
          this.fetchData("https://api.coingecko.com/api/v3/coins/link?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true")
      },
      fetchData: function (cryptoURL) {
        fetch(cryptoURL)
      .then(response => response.json())
      .then(result => {
          this.percentChange1 = result.market_data.price_change_percentage_24h
          this.percentChange7 = result.market_data.price_change_percentage_7d
          this.percentChange30 = result.market_data.price_change_percentage_30d
          this.percentChange200 = result.market_data.price_change_percentage_200d
          this.percentChange365 = result.market_data.price_change_percentage_1y
      })
      }
  },
  data() {
    return {
      percentChange1: 0,
      percentChange7: 0,
      percentChange30: 0,
      percentChange200: 0,
      percentChange365: 0,
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
