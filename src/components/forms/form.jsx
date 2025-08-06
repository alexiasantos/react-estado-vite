import {useState} from 'react';

const Form = (props)=> {
    const value = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];
    const suit = ['DIAMONDS', 'HEARTS', 'SPADES', 'CLUBS'];

    const [newCard,setInputs] = useState({
        value: '',
        suit: '',
        image: ''
    })

    const handleInputChange = (event) => {
        setInputs({
            ...newCard,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // prevenir refresh da página
        if (!newCard.value || !newCard.suit) {
            alert('Por favor, selecione o valor e o naipe da carta');
            return;
        }
        
        const cardImage = props.selectCardImage(newCard.value, newCard.suit);
        console.log(cardImage)
        props.addCard({
            ...newCard,
            image: cardImage
        });

        setInputs({
            value: '',
            suit: '',
            image: ''
        });
    };


    return(
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="image">Selecione a carta</label>
                <select name="value" onChange={handleInputChange} value={newCard.value}>
                    <option value="">Selecione o valor</option>
                    {value.map((value, index) => (
                        <option key={index}  value={value}>{value}</option>
                    ))}
                </select>

                <select name="suit" onChange={handleInputChange} value={newCard.suit}>
                     <option value="">Selecione o naipe</option>
                    {suit.map((suit, index) => (
                        <option key={index}  value={suit}>{suit}</option>
                    ))}
                </select>
                
                {/* <input type="text" id="image" name="image" onChange={handleInputChange} value={inputs.image}/> */}
            </div>
            <input type="submit" value="Enviar" /> 
        </form>

        </>
    )
}

export default Form;