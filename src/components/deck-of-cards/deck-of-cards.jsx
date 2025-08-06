import {useEffect, useState} from 'react';
import Form from '../forms/form.jsx'; 

async function createDeck(){
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    const deck =  await response.json();
    return deck.deck_id;
}

async function getCards(deckId){
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    return await response.json();
}

const CardsList = (props) =>{
    return (
                 <ul>
                     {props.cards.map((card, index)=>{
                        return(
                            <li key={index}>
                                <img key={index} src={card.image} alt={`${card.value}`} />
                            </li>
                        )
                     })}
                 </ul>
    )
}

const DeckOfCards = () => {
    //atribuição via desestruturação
    const [deck, setDeck] = useState({
        cards:[]
    })

    useEffect(() => {
        const fetchData = async () => {
            const deckId = await createDeck();
            const data = await getCards(deckId);
            setDeck(
                { cards: data.cards }
            );
        };
        fetchData();
    }, []);// esse array vazio significa que o useEffect só será executado uma vez, como componentDidMount


    /*
        como estamos cadastrando imgs de cards que podem se repetir o método é ok, mas se eu quisesse considerar um baralho existente, 
        ou seja, não temos cartas repetidas, eu teria que utilizar a seguinte url
        
        https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/?cards=AS

        que eu retiraria uma carta de uma pilha, no caso da url acima seria um às de espadas que seria retirado de um deckid específico.
    */

    const selectCardImage = (value, suit) => {
        const imageUrl = `https://www.deckofcardsapi.com/static/img/${value[0]}${suit[0]}.png`;
        console.log(`Selected card: ${value} of ${suit}`);
    return imageUrl;
}
    
    const addCard = (newCard) => {
        console.log(newCard);
        setDeck({
            cards: [...deck.cards, newCard]
        })
    }

    return (
        <section>
            <Form addCard={addCard} selectCardImage={selectCardImage} />
            <h2>Deck of Cards</h2>
           {deck.cards.length > 0 ? <CardsList cards={deck.cards}/> : <p>No cards available</p>}
        </section>
    )
    
    // constructor(){
    //     super();
    //     this.state ={
    //         cards: []
    //     }

    // }

    // async componentDidMount(){
    //     const deckId = await createDeck();
    //     const data = await getCards(deckId);
    //     this.setState({ cards: data.cards });
    // }

    // render() {
    //     return (
    //         <section>
    //             <ul>
    //                 {this.state.cards.map((card, index)=>{
    //                     return (
    //                         <li key={index}>
    //                             <img key={index} src={card.image} alt={`${card.value}`} />
    //                         </li>
    //                     )
    //                 })}
    //             </ul>
    //         </section>
    //     );
    // }
}

export default DeckOfCards;