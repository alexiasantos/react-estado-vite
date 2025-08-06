import { Component } from 'react'
import './panel.css'

class Panel extends Component{
    constructor(){
        super()// Em JavaScript, quando você cria uma classe que herda de outra (com extends), você precisa chamar super() no construtor antes de usar this.
        this.state = {
            title: 'Título do painel'
        }
    }

    render(){        
        return(
            <section className="panel" onClick={
               () => {              
                    this.setState(
                        {title: 'Título novo'}
                    )
                }
            }>
                <h2>{this.state.title}</h2>
            </section>
        )
    }
}

export default Panel