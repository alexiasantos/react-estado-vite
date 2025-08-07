import {useState} from 'react';

const Form = (props)=> {
    const value = {'Ás': 'A','2':'2', '3':'3', '4': '4', '5': '5', '6': '6', '7':'7','8': '8','9': '9','10': '0', 'Valete': 'J', 'Rainha': 'Q', 'Reis': 'K' };
    const suit = {'Copas': 'H', 'Paus': 'C', 'Ouros': 'D', 'Espadas': 'S'};

    const [newCard,setInputs] = useState({
        value: '',
        suit: '',
        image: ''
    })

    const handleInputChange = (event) => {
        setInputs({
            ...newCard, //pego todos os inputs que ja tenho 
            [event.target.name]: event.target.value //e adiciono o valor novo 
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // prevenir refresh da página

        console.log(event)
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
                    {Object.entries(value).map(([key, val], index) => (
                        <option key={index}  value={val}>{key}</option>

                    ))}
                </select>

                <select name="suit" onChange={handleInputChange} value={newCard.suit}>
                     <option value="">Selecione o naipe</option>
                    {Object.entries(suit).map(([key, val], index) => (
                        <option key={index}  value={val}>{key}</option>
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