class Card {
    constructor(id, img, positionX, positionY) {
        this.id = id;
        this.img = `imgs/${img}.png`;
        this.positionX = positionX;
        this.positionY = positionY;
        this.backImg = "/imgs/back.png";
        this.isFlipped = false;
        this.gotItCorrect = false;
    }
}
const card1 = new Card(1, "2_of_clubs", 0, 0);
const card2 = new Card(2, "3_of_clubs", 0, 0);
var Cards;
const availableImages = [
    "2_of_clubs",
    "3_of_clubs",
    "4_of_clubs",
    "5_of_clubs",
];
function fillCards() {
    Cards = [];
    const pairedImages = [...availableImages, ...availableImages];
    pairedImages.sort(() => Math.random() - 0.5);
    for (let i = 0; i < pairedImages.length; i++) {
        const img = pairedImages[i];
        const card = new Card(i + 1, img, 0, 0);
        Cards.push(card);
    }
}
fillCards();
function createCardHTML(card) {
    const imgSrc = card.isFlipped ? card.img : card.backImg;
    const cardHTML = `<img src="${imgSrc}" class="card" onclick="flipCard(${card.id})" alt="Card ${card.id}"></img>`;
    return cardHTML;
}
function renderCards() {
    const field = document.getElementById("field");
    field.innerHTML = "";
    Cards.forEach((element) => {
        field.innerHTML += createCardHTML(element);
    });
}
renderCards();
let flippedCards = [];
function flipCard(cardId) {
    const card = Cards.find((c) => c.id === cardId);
    if (card && !card.gotItCorrect) {
        card.isFlipped = !card.isFlipped;
        if (card.isFlipped) {
            flippedCards.push(card);
        }
        else {
            flippedCards = flippedCards.filter((c) => c.id !== card.id);
        }
        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            if (card1.img === card2.img) {
                card1.gotItCorrect = true;
                card2.gotItCorrect = true;
            }
            else {
                setTimeout(() => {
                    card1.isFlipped = false;
                    card2.isFlipped = false;
                    renderCards();
                }, 500);
            }
            flippedCards = [];
        }
        renderCards();
        testWin();
    }
}
function testWin() {
    var won = true;
    Cards.forEach((element) => {
        if (!element.gotItCorrect)
            won = false;
    });
    if (won)
        alert("YOU WON");
}
