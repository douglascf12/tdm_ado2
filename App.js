import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image, Modal } from 'react-native';
import Constants from 'expo-constants';

// DOUGLAS CARDOSO FERREIRA

async function executeGet(url, jsonState){
    //get síncrono com o uso do fetch
    await fetch(url)
    .then(response => {
          if (response.status === 200) {
            //console.log('sucesso');
            response.json().then(function(result){ 
              //console.log(result);
              jsonState(result)
              });
          } else {
            throw new Error('Erro ao consumir a API!');
          }
      })
      .then(response => {
        //console.debug(response);
      }).catch(error => {
        console.error(error);
      });
  }

const ShowDetalhes = ({display,toogleModal,mensagem}) => (   
    <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text>{mensagem}</Text>
                </Pressable>
          </View>
        </View>
    
    </Modal>
        
 )

const Pessoa = ({nome, email, body}) => {
    //state para controle do Modal
    const [modal, setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return(
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} mensagem={body}/>
      
      <Pressable onPress={mudaModal}>
        <Image
        />
        <Text style={styles.textStyle2}>{nome}</Text>
        <Text style={styles.paragraph}>{email}</Text>
      </Pressable>
    </View>
    )
}

const ListHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.textStyle}>
            Listona
        </Text>
      </View>
    );
  };

export default function App() {

  const [jsonData, setJsonData] = React.useState({})

  executeGet("https://jsonplaceholder.typicode.com/comments", setJsonData)

  //função que renderiza cada item do FlatList
  function meuItem({item}){
    return(
      <Pessoa nome={item.name} 
              body={item.body}
              email={item.email}
      />
    )
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={jsonData}
        renderItem={meuItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'yellow'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerStyle: {
    width: '100%',
    height: 45,
    backgroundColor: 'green',
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 7,
  },
  textStyle2: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    padding: 7,
  },
});
