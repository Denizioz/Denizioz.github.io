<template>
    <div>
        <h1>crypto calculator</h1>
        <h2>Current Value SEK</h2>
        <h4>{{cryptoPrice}}</h4>
        <input type="text" name="moneyValue" id="money" placeholder="Currency" v-model="sek">
        <input type="text" name="cryptoValue" id="crypto" v-model="currencyCalculator" placeholder="Crypto">
        <input type="button" value="DogeCoin" @click="getDogeData">
        <input type="button" value="Chainlink" @click="getLinkData">
        <h3>description</h3><br>
        {{cryptoDescription}}
        <h3>Categories</h3>
        <p>{{cryptoCategories}}</p>
        <h3>Image</h3>
        <img :src="cryptoImage" alt="">
    </div>
</template>

<script>
export default {
    computed: {
        currencyCalculator: {
        get() {
            return this.sek / this.cryptoPrice
        },
        set(newCur) {
            this.cryptoValue = newCur
        }
    }},
  data() {
      return {
          cryptoName: "Crypto",
          cryptoCategories: "",
          cryptoDescription: "",
          cryptoPrice: 0,
          cryptoImage: "https://assets.coingecko.com/coins/images/6450/small/linklogo.png?1547042644",
          sek: 0,
          cryptoValue: null
      }
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
          this.cryptoPrice = result.market_data.current_price.sek
          this.cryptoName = result.name
          this.cryptoDescription = result.description.en
          this.cryptoImage = result.image.small
          let savedCategories = ""
          for (let n = 0; n < result.categories.length; n++) {
              const element = result.categories[n];
              savedCategories = savedCategories.concat(element + ", ")
          }
          this.cryptoCategories = savedCategories
      })
      }
  },

  name: 'calculator',
}
</script>

<style scoped>
input {
    margin: 10px;
    padding: 10px;
    background-color: aqua;
    color: blue;
}

h1 {
    color: rgb(0, 0, 168);
}
</style>