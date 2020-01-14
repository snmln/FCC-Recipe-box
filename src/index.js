//import the necessary files
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { Accordion, Card, Button, ButtonToolbar, ListGroup, ListGroupItem, /*FormLabel, FormGroup, FormControl, Form*/ } from 'react-bootstrap';
import { AddRecipe } from './Components/addrecipe';
import { EditRecipe } from './Components/editrecipe';
//import { MoreInfo } from './Components/moreInfo';
import './css/index.css';
//create the main class for displaying the recipes
class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            showAdd: false,
//            showEdit: false,
            currentlyEditing: 0
        };
        //this.showMoreInfoModal = this.showMoreInfoModal.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
    }

    componentDidMount() {
        //load the local storage data after the component renders    
        var recipes = (typeof localStorage["recipes"] !== "undefined") ? JSON.parse(localStorage.getItem("recipes")) : [
            { name: "Banana Smoothie", ingredients: ["2 bananas", "1/2 cup vanilla yogurt", "1/2 cup skim milk", "2 teaspoons honey", "pinch of cinnamon"] },
            { name: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "Meatballs"] },
            { name: "Split Pea Soup", ingredients: ["1 pound split peas", "1 onion", "6 carrots", "4 ounces of ham"] }
        ];
        this.setState({ recipes: recipes });
    }
    /*showMoreInfoModal() {
        //show the the more informaiton modal    
        this.setState({ showMoreInfo: !this.state.showMoreInfo });
    }*/
    showAddModal() {
        //show the new recipe modal    
        this.setState({ showAdd: !this.state.showAdd });
    }
    showEditModal(index) {
        //show the edit recipe modal   
        this.setState({ currentlyEditing: index, showEdit: !this.state.showEdit });
    }
    addRecipe(recipe) {
        //create a new recipe    
        let recipes = this.state.recipes;
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({ recipes: recipes });
        this.showAddModal();
    }
    editRecipe(newName, newIngredients, currentlyEditing) {
        //edit an existing recipe    
        let recipes = this.state.recipes;
        recipes[currentlyEditing] = { name: newName, ingredients: newIngredients };
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({ recipes: recipes });
        this.showEditModal(currentlyEditing);
    }
    deleteRecipe(index) {
        //delete an existing recipe    
        let recipes = this.state.recipes.slice();
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({ recipes: recipes, currentlyEditing: 0 });
    }
    /*<Button className="standardButtons" bsStyle="warning" onClick={this.showMoreInfoModal}>More Info</Button>
                <MoreInfo onShow={this.state.showMoreInfo} />*/

    render() {
        const recipes = this.state.recipes;
        return (
            <div className="jumbotron">
                <h1>RECIPE BOX</h1>
                <p>Use this web application to create, store, and edit your recipes. </p>
                <Accordion accordion id="recipes">
                    {recipes.map((recipe, index) => (
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle key={index} as={Button} variant="link" eventKey={index}>
                                    <div className="title">{recipe.name}</div>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index}>
                                <Card.Body>
                                    <ListGroup>
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <ListGroupItem key={index}>{ingredient}</ListGroupItem>
                                        ))}
                                    </ListGroup>
                                    <ButtonToolbar>
                                        <Button bsStyle="warning" onClick={() => { this.showEditModal(index) }}>Edit</Button>
                                        <Button bsStyle="danger" onClick={() => { this.deleteRecipe(index) }}>Delete</Button>
                                    </ButtonToolbar>
                                </Card.Body>

                            </Accordion.Collapse>
                            <EditRecipe onShow={this.state.showEdit} onEdit={this.editRecipe} onEditModal={() => { this.showEditModal(this.state.currentlyEditing) }}
                                currentlyEditing={this.state.currentlyEditing} recipe={recipes[this.state.currentlyEditing]} />
                        </Card>
                    ))}
                </Accordion>
                <Button bsStyle="primary" onClick={this.showAddModal}>Add Recipe</Button>
                <AddRecipe onShow={this.state.showAdd} onAdd={this.addRecipe} onAddModal={this.showAddModal} />

            </div>
        );
    }
};

ReactDOM.render(<Recipe />, document.getElementById('app'));

