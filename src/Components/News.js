import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Snipper from "./Snipper";
import PropTypes from 'prop-types';


export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:9,
    category:'general',
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  
  constructor() {
    super();
    console.log("this is a constructor")
    this.state = {
      articles :[],
      page:1,
    loading:false

    }
  }
  async componentDidMount() {
    console.log("render");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca6dc01d19a844608120c329635aefbd&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles,
    loading:false })
  }
  handleprevious = async() => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca6dc01d19a844608120c329635aefbd&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
  
   
    this.setState({
      page:this.state.page-1,
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false,
    })
  }

  handleNext = async() => {
    console.log("next");
    if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pages)){

    }else{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca6dc01d19a844608120c329635aefbd&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    
   
    this.setState({
      page:this.state.page+1,
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false,
    })
  }
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsZilla- Top Headlnes</h1>
       {this.state.loading && <Snipper/>}
       

        <div className="row">
          {!this.state.loading&&this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url} >
              <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })
          }
        </div>

        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1}type="button" onClick={this.handleprevious} className="btn btn-sm btn-dark">&larr;Previos</button>
          <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pages)}onClick={this.handleNext} className="btn btn-sm btn-dark">Next&rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
