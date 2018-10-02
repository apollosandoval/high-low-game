(function() {
    let shuffleURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    let deckId = '';
    let controls = document.querySelector('#controls');
    let dealerCard = {
        element: document.querySelector('#dealer'),
        value: null
    };
    let playerCard = {
        element: document.querySelector('#player'),
        value: null
    };

    // Retrieve playing Deck
    axios.get(shuffleURL)
        .then( (response) => {
            deckId = response.data['deck_id'];
        })
        .catch( (err) => {
            console.log(err);
        });
    // Deck Handling
    function shuffleDeck() {
        console.log('you clicked shuffle');
    };

    function parseValue(string) {
        switch (string) {
            case 'KING':
                return 13
                break;
            case 'QUEEN':
                return 12
                break;
            case 'JACK':
                return 11
                break;
            case 'ACE':
                return 14
                break;
            default:
                return Number(string)
                break;
        }
    }

    async function drawCard(player) {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then( res => {
                player['element'].src = res.data.cards[0].image;
                player['value'] = parseValue(res.data.cards[0].value);
            })
            .catch( err => {
                console.log(err);
            });
    };
    // Game Logic
    function playGuess(event) {
        // console.log(`you clicked ${event.target.id}`);
        drawCard(playerCard)
            .then( res => {
                switch (event.target.id) {
                    case 'high':
                        playerCard.value > dealerCard.value ? console.log(true) : console.log(false);
                        break;
                    case 'low':
                        playerCard.value < dealerCard.value ? console.log(true) : console.log(false);
                        break;
                    default:
                        break;
                }
            });
    }
    // Event Handlers
    function onControlsClick(event) {
        switch(event.target.id) {
            case 'shuffle':
                shuffleDeck();
                break;
            case 'draw':
                drawCard(dealerCard);
                break;
            case 'high':
                playGuess(event);
                break;
            case 'low':
                playGuess(event);
                break;
            default:
                break;
        }
    };
    // Event Listeners
    controls.addEventListener('click', onControlsClick);
})();