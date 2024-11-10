import { Col, Container, Row } from "reactstrap";
import "./App.css";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Component } from "react";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

export default class App extends Component {
  categoryInfo = { title: "Category List" };
  productInfo = { title: "Product List" };
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3001/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
      this.setState({ cart: newCart });
      alertify.success("Sepete Eklendi");
    }
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error("Sepetten Silindi");
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Navi
            light
            expand="md"
            cart={this.state.cart}
            removeFromCart={this.removeFromCart}
          />

          <Row>
            <Col xs="3">
              <CategoryList
                info={this.categoryInfo}
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
              />
            </Col>
            <Col xs="9">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProductList
                      info={this.productInfo}
                      currentCategory={this.state.currentCategory}
                      products={this.state.products}
                      addToCart={this.addToCart}
                    />
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <CartList
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  }
                />
                <Route path="*" element={<NotFound />} />
                <Route path="/form1" element={<FormDemo1></FormDemo1>} />
                <Route path="/form2" element={<FormDemo2></FormDemo2>} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
