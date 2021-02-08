<template>
    <div>
        <h1>{{cryptoName}} calculator</h1>
        <h2>Current Value SEK</h2>
        <h4>{{cryptoPrice}}</h4>
        <input type="text" name="moneyValue" id="money" placeholder="Currency" v-model="sek">
        <div v-if="cryptoPrice !== 0">
        <input type="text" name="cryptoValue" id="crypto" v-model="currencyCalculator" placeholder="Crypto">
        </div>
        <div v-else><p>Input value and choose currency</p></div>
        <b-button variant="primary" @click="getDogeData" id="givemespace">Dogecoin</b-button>
        <b-button variant="primary" @click="getLinkData" id="givemespace">Chainlink</b-button>
        <h3>description</h3>
        <p id="p-padding" v-html="cryptoDescription"></p>
        <h3>Categories</h3>
        <p>{{cryptoCategories}}</p>
        <h3>Image</h3>
        <img :src="cryptoImage" alt="">
        <div v-for="(value, name) in otherCurrency" :key="name.id">
            {{name}}: {{value}}
        </div>
        
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

    created() {

    },

  data() {
      return {
          cryptoName: "Crypto",
          cryptoCategories: "",
          cryptoDescription: "",
          cryptoPrice: 0,
          cryptoImage: "https://assets.coingecko.com/coins/images/6450/small/linklogo.png?1547042644",
          sek: 0,
          cryptoValue: 0,
          otherCurrency: {}
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
          this.otherCurrency.usd = result.market_data.current_price.usd
          this.otherCurrency.eur = result.market_data.current_price.eur
          this.otherCurrency.btc = result.market_data.current_price.btc
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
    font-weight: bold;
}

h3 {
    font-weight: bold;
}

#p-padding {
    padding-left: 50px;
    padding-right: 50px;
}

#givemespace {
    margin: 5px;
}
</style>