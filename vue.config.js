module.exports = {
    pwa: {
      manifestOptions: {
        background_color: 'aqua'
      },
      name: 'school-project',
      themeColor: 'blue',
      workboxOptions: {
        runtimeCaching: [
          {
            handler: 'NetworkFirst',
            options: {
              networkTimeoutSeconds: 5
            },
            urlPattern: 'https://api.coingecko.com/api/v3/coins/link?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true'
          },
          {
            handler: 'NetworkFirst',
            options: {
              networkTimeoutSeconds: 5
            },
            urlPattern: 'https://api.coingecko.com/api/v3/coins/dogecoin?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true'
          }
        ]
      }
    }
  }