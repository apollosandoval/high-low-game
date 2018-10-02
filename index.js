(function() {
    let shuffleURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    let deckId = '';
    // let drawURL = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    let controls = document.querySelector('#controls');
    let dealerCard = document.querySelector('#dealer');
    let playerCard = document.querySelector('#player');
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

    function drawCard(element) {
        axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then( res => {
                // console.log(res.data.cards[0].image);
                element.src = res.data.cards[0].image;
            })
            .catch( err => {
                console.log(err);
            });
    };
    // Game Logic
    function playGuess(event) {
        // console.log(`you clicked ${event.target.id}`);
        drawCard(playerCard);
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