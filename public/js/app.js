class ProductList extends React.Component {
  // Constructors are no longer necessary for when we are using ES6 arrow 
  // function syntax
  
  state = {
    products: [],
  };

  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      // Only carry out the following changes if the product is the same as the
      // current product.
      if (product.id === productId) {
        // Object.assign is a method that replicates an object
        // First argument takes in target, in this case, it's an empty object
        // Second argument is your source, in this case is product, the object
        // that we are copying from. 
        // All arguments that follows after the second argument are sources as
        // well. In this case, votes is already pre-defined in product, so it
        // will overwrite the existing key and value. 
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts,
    });
  }

  render() {
    const products = this.state.products.sort((a, b) => (b.votes - a.votes));
    const productComponents = products.map((product) => {
      return (
        <Product 
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitterAvatarUrl={product.submitterAvatarUrl}
          productImageUrl={product.productImageUrl}
          onVote={this.handleProductUpVote}
        />
      )
    });
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }


  componentDidMount() {
    this.setState({ products: Seed.products });
  }

}

class Product extends React.Component {
  // Constructor is only needed when we are creating custom methods that
  // are still using ES5 syntax. Using ES6 arrow function syntax allows this
  // to be bind directly to the component itself. Thus, with methods created
  // using the arrow function, we no longer need to define constructor and 
  // run super(props)

  // constructor(props) {
  //   super(props);

  //   // This binds the custom method this to the component this
  //   // This has to be done everytime a custom method is created, other
  //   // than the predefined React methods like render, componentDidMount,
  //   // componentWillMount and such
  //   // This is because the predefined React methods already bind this to
  //   // the component's this.
  //   // this.handleUpvote = this.handleUpvote.bind(this);
  // }
  
  handleUpvote = () => {
    this.props.onVote(this.props.id);
  }

  // handleUpvote() {
  //   this.props.onVote(this.props.id);
  // }

  render() {
    return (
      <div className='item'>
          <div className='image'>
            <img src={this.props.productImageUrl} />
          </div>
          <div className='middle aligned content'>
            <div className="header">
              <a onClick={this.handleUpvote}>
                <i className='large caret up icon' />
              </a>
              {this.props.votes}
            </div>
            <div className='description'>
              <a href={this.props.url}>{this.props.title}</a>
              <p>
                {this.props.description}
              </p>
            </div>
            <div className='extra'>
              <span>Submitted by:</span>
              <img
                className='ui avatar image'
                src={this.props.submitterAvatarUrl}
              />
            </div>
          </div>
        </div>
    )
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
