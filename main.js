document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '20b42a4d9d0f2caacc63dab0e3b13391'; 
    const coins = ['BTC', 'ETH', 'LTC', 'USDT', 'BNB', 'XRP',]; 

    const cryptoPricesContainer = document.getElementById('cryptoPrices');

    async function fetchCryptoPrices() {
        try {
            const response = await fetch(`http://api.coinlayer.com/live?access_key=${apiKey}&symbols=${coins.join(',')}`);
            const data = await response.json();

            if (data.success) {
                displayCryptoPrices(data.rates);
            } else {
                console.error('Error fetching crypto prices:', data.error.info);
            }
        } catch (error) {
            console.error('Error fetching crypto prices:', error);
        }
    }

    function displayCryptoPrices(prices) {
        cryptoPricesContainer.innerHTML = '';

        Object.keys(prices).forEach(symbol => {
            const price = prices[symbol];
            const priceElement = document.createElement('div');
            priceElement.innerHTML = `<p>${symbol}: $${price.toFixed(2)}</p>`;
            cryptoPricesContainer.appendChild(priceElement);
        });
    }

    fetchCryptoPrices();

    
    setInterval(fetchCryptoPrices, 300000);
});
