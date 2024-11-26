import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React, { Component } from "react";
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      idade: '',
      sexo: 0,
      // Array com os sexos
      sexos: [
        { sexoNome: 'masculino', valor: 0 },
        { sexoNome: 'feminino', valor: 1 },
      ],
      limite: 250,
      estudante: false,
    }

    this.enviaDados = this.enviaDados.bind(this)
  }

  // Método para enviar os dados quando o botão é clicado
  enviaDados(){
    if(this.state.nome === '' || this.state.idade === ''){
      alert('Preencha todos os dados corretamente! ')
      return;
    }

    alert(
      'Conta aberta com sucesso!! \n\n' +
      'Nome: '+ this.state.nome + '\n' +
      'Idade: '+ this.state.idade + '\n' +
      'Sexo: '+ this.state.sexos[this.state.sexo].sexoNome + '\n' +
      'Limite Conta: '+this.state.limite.toFixed(2) + '\n' +
      'Conta Estudante: ' + ((this.state.estudante) ? 'Ativo' : 'Inativo')
    );

    this.setState({
      nome: '',
      idade: '',
      sexo: 0,
      limite: 250,
      estudante: false
    })
  }
  render() {

    //Variavel para seleção dos sexos
    let sexoItens = this.state.sexos.map((v, k) => {
      return <Picker.Item key={k} value={k} label={v.sexoNome} />
    })
    return (
      <View style={styles.container}>

        <Text style={styles.bancoLogo}>Banco logo</Text>
        {/* Area para entrada dos dados em um formulario */}
        <View style={styles.areaFormulario}>
          <Text style={styles.textoNome}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder={"Digite seu nome"}
            underlineColorAndroid={"transparent"}
            onChangeText={(texto) => { this.setState({ nome: texto }) }}
          />

          <Text style={styles.textoNome}>Idade</Text>
          <TextInput
            style={styles.input}
            placeholder={"Digite sua idade"}
            underlineColorAndroid={"transparent"}
            onChangeText={(texto) => { this.setState({ idade: texto }) }}
            keyboardType="numeric" //deixando o teclado apenas numerico
          />
          <View style={styles.areaSexo}>
            <Text style={styles.textoNome}>Sexo</Text>
            <Picker
              style={styles.pickerSexo}
              selectedValue={this.state.sexo}
              onValueChange={(itemValue, itemIndex) => this.setState({ sexo: itemValue })}>
              {sexoItens}
            </Picker>
          </View>

          {/* Area para visualizar o limite R$ */}
          <View style={styles.limiteArea}>
            <Text style={styles.textoNome}>Seu Limite: </Text>
            <Text style={styles.limiteTexto}>R$
              {this.state.limite.toFixed(2)}
            </Text>
          </View>

          {/* Area do slider de limite */}
          <View style={styles.areaSlider}>
            <Slider
              minimumTrackTintColor="#CF0000"
              minimumValue={0}
              maximumValue={4000}
              value={this.state.limite}
              onValueChange={(limite)=> this.setState({limite: limite})}
            />
          </View>

          {/* area para definir se é estudante */}
          <View style={styles.areaEstudante}>
            <Text style={styles.textoNome}>Estudante: </Text>
            <Switch
              style={{paddingTop: 15}}
              trackColor="#00c300"
              value={this.state.estudante}
              onValueChange={(valorEstudante)=>this.setState({estudante: valorEstudante})}
            />
          </View>

          {/* Botaão para enviar os dados */}
          <TouchableOpacity 
            style={styles.botao}
            onPress={this.enviaDados}
            underlayColor="#000000"
          >
            <Text style={styles.botaoTexto}>Abrir Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  areaFormulario: {
    flexDirection: 'column',
    margin: 10
  },
  bancoLogo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: "#000000"
  },
  textoNome: {
    fontSize: 17,
    color: '#000000',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#999999',
    backgroundColor: '#EEEEEEE',
    color: '#000000',
    height: 38,
    padding: 10,
    marginBottom: 5,
    marginTop: 5
  },
  areaSexo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5
  },
  pickerSexo: {
    flex: 1
  },
  limiteArea: {
    flexDirection: 'row',
    paddingBottom: 5
  },
  limiteTexto: {
    color: '#FF0000',
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 5
  },
  areaEstudante: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  botao: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 150,
    margin: 20
  },
  botaoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
})