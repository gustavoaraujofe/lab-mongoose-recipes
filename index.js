const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    try {
      //Adiciona 1 receita e imprime o titulo no console (CRIA UM NOVO DOCUMENTO)
      const createdRecipe = await Recipe.create({
        title: "Gelatina",
        level: "Easy Peasy",
        ingredients: ["Água", "Gelatina(Sachê)"],
        cuisine: "none",
        dishType: "dessert",
        duration: 30,
        creator: "Gustavo",
      });

      //console.log(createdRecipe.title);

      //Adiciona várias receitas de vez e imprime todos os nomes no console (CRIA VARIOS DOCUMENTOS)

      const createdRecipes = await Recipe.insertMany(data);

      //console.log(createdRecipes.map((currentElement) => currentElement.title))

      //Atualiza uma receita (ATUALIZA UM DOCUMENTO)

      const updatedRecipes = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { $set: { duration: 100 } }
      );

      //console.log("A receita foi atualizada com sucesso!");

      //Remove uma receita (REMOVE UM DOCUMENTO)

      const deleteRecipes = await Recipe.deleteOne({ title: "Carrot Cake" });

      //console.log("A receita foi removida com sucesso!")

      //Consultar um único documento

      const oneRecipe = await Recipe.findOne({
        title: "Gelatina",
      });

      //console.log(oneRecipe)

      //Consultar todos os documentos

      const allRecipes = await Recipe.find();

      console.log(allRecipes);

      //Encerrar conexão com o banco de dados

      mongoose.disconnect();
    } catch (err) {
      console.log(err);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
