import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import axios from 'axios';

const URL = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`;

// Function Component
export default HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL);
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => navigation.navigate('Article', { article: item })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// // Class Compnentで書いたとき
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//     };
//   }

//   async componentDidMount() {
//     this.fetchArticles(URL);
//   }

//   fetchArticles = async () => {
//     try {
//       const response = await axios.get(URL);
//       this.setState({ articles: response.data.articles });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <FlatList
//           data={this.state.articles}
//           renderItem={({ item }) => (
//             <ListItem
//               imageUrl={item.urlToImage}
//               title={item.title}
//               author={item.author}
//             />
//           )}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </SafeAreaView>
//     );
//   }
// }
