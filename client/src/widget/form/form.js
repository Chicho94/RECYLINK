import React, { Component } from 'react';

import './form.css';

class Form extends Component {

  constructor(props){
    super(props)
    this.state = {
       nameProduct:'',
       cantProduct:0,
       recycle:'',
       validation:{required:true},
       valid:false,
    }

    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

 }

  UNSAFE_componentWillMount(){

    const productos = fetch('/api/products/', {
      method: 'GET',
      headers:{ 'Content-Type': 'application/json' },
      mode: 'cors'
    }).then(res => { return res.json(); })

    productos.then(result =>
      result.map(data =>{
        document.getElementById('tableBody').innerHTML += `<tr>
                                                                <td><input type="checkbox"/></td>
                                                                <td>${data.producto}</td>
                                                                <td>${data.material}</td>
                                                                <td>${data.cantidad}</td>
                                                                <td><a id="${data._id}">
                                                                    <img src="./img/icon_submit.png"/></a></td>
                                                                    </tr>`;
      }) )

    productos.then(result =>console.log(result.length))

  }

 submitForm(event){

     event.preventDefault(event)

     let answer = [true,''];
     const dataResult ={};

     (this.state.nameProduct.trim() !== "")
     ? dataResult['producto'] = this.state.nameProduct
     : answer =[false,'No se olvide de llenar el nombre del producto'];

     (this.state.recycle !== "")
     ? dataResult['material'] = this.state.recycle
     : answer =[false,'Es importante saber que tipo de material se esta reciclando'];

     (this.state.cantProduct > 0)
     ? dataResult['cantidad'] = this.state.cantProduct
     : answer =[false,'La cantidad de producto a reciclar tiene que ser mayor a 0'];

     if(answer[0] !== false){

        fetch('/api/newProduct/', {
          method: 'POST',
          body: JSON.stringify(dataResult),
          headers:{ 'Content-Type': 'application/json' },
          mode: 'cors'
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

        document.getElementById('tableBody').innerHTML = "";

        const productos = fetch('/api/products/', {
          method: 'GET',
          headers:{ 'Content-Type': 'application/json' },
          mode: 'cors'
        }).then(res => { return res.json(); })

        productos.then(result =>
        result.map((data,id) =>{
          document.getElementById('tableBody').innerHTML += `<tr key={id}> <td><input type="checkbox"/></td> <td>${data.producto}</td> <td>${data.material}</td> <td>${data.cantidad}</td> <td><a id=${data._id}> <img src="./img/icon_submit.png"/></a></td> </tr>`;
        }))

     }else{alert(answer[1]);}

   }

 handleInputChange(event){

   let newState = event.target.name;
   let valState = event.target.value;

   this.setState({[newState]: valState});

 }

 handleSelectChange(event) { this.setState({recycle: event.target.value}); }

  render() {
    return (
      <div>

        <div className="container" id="addelement">

          <form onSubmit={this.submitForm}>
            <div className="form_input">
              <label>Nombre del producto</label>
              <input
                type="text"
                name='nameProduct'
                {...this.state.validation}
                value={this.state.firstName}
                onChange={this.handleInputChange}
                />
            </div>

            <div className="form_select">
              <label>Tipo de material</label>
              <select value={this.state.value} defaultValue={'DEFAULT'} onChange={this.handleSelectChange} required>
                <option value="DEFAULT" disabled>Seleccione un material</option>
                <option defaultValue="organic">organic</option>
                <option defaultValue="plastic">plastic</option>
                <option defaultValue="paper">paper</option>
                <option defaultValue="metal">metal</option>
                <option defaultValue="glass">glass</option>
                <option defaultValue="e-waste">e-waste</option>
              </select>
            </div>

            <div className="form_input">
              <label>Kg a reciclar</label>
              <input
                type="number"
                name='cantProduct'
                {...this.state.validation}
                value={this.state.cantProduct}
                onChange={this.handleInputChange}
                />
            </div>

              <button type="submit">reciclar</button>
            </form>
          </div>

          <div className="container" id="viewElemnet">
            <h2>Material reciclado</h2>
            {Table()}
          </div>

      </div>
    );
  }
}


const Table = () =>{

  return(
    <table>
      <thead>
        <tr>
          <th>Editar</th>
          <th>Producto</th>
          <th>Material</th>
          <th>Cantidad</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody id="tableBody">
      </tbody>
  </table>
  )
}

export default Form;
