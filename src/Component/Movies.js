import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios'
export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }
    async componentDidMount(){
        //side effects waale kaam
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8047abdf1afadd696f95fc55995b6394&language=en-US&page=${this.state.currPage}`)
        let data=res.data
        // console.log(data)
        this.setState({
            movies:[...data.results]
        })
        
    }
    changeMovies=async()=>{
        console.log("changemovies called")
        console.log(this.state.currPage)
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=8047abdf1afadd696f95fc55995b6394&language=en-US&page=${this.state.currPage}`)
        let data=res.data
        // console.log(data)
        this.setState({
            movies:[...data.results]
        })
    }
    handleRight=()=>{
        let temparr=[];
        for(let i=1; i<=this.state.parr.length+1;i++){
            temparr.push(i);
        }
        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMovies)
        
    }
    handleLeft=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
    }
    handleClick=(value)=>{
        if(value!=this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovies)
        }
    }
    handleFavourite=(movie)=>{
        let oldData=JSON.parse(localStorage.getItem('movies-app')||"[]")
        if(this.state.favourites.includes(movie.id)){
            oldData=oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem("movies-app", JSON.stringify(oldData))
        console.log(oldData);
        this.handleFavouriteState();
    }
    handleFavouriteState=()=>{
        let oldData=JSON.parse(localStorage.getItem('movies-app')||"[]")
        let temp=oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp] 
        })
    }
    render() {
        // let movie = movies.results
       
        return (
            <>
                {
                    this.state.movies.length == 0 ?
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div> :
                        <div>
                            <h3 className='text-center'><strong>trending</strong></h3>
                            <div className='movies-list'>
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movies-img" />
                                            {/* <div className="card-body"> */}
                                            <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                            {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                            <div className='button-wrapper' style={{ display: "flex", width: '100%', justifyContent: 'center' }}>
                                             {
                                                this.state.hover==movieObj.id &&
                                                <a className="btn btn-primary movies-btn" onClick={()=>this.handleFavourite(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from favourites":"Add to Favourites"}</a>
                                             }   
                                                
                                                
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{display:"flex",justifyContent:"center"}}>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                        {
                                            this.state.parr.map((value)=>(
                                                <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                            ))
                                        }                                        
                                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                }
            </>

        )
    }
}
