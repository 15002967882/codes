//AJAX
function request(method, url, cb){
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.send();
  xhr.onreadystatechange=function() {
    if (xhr.readyState==4 && xhr.status==200) {
       var news = xhr.responseText;
       var obj = JSON.parse(news);
       cb(obj);
    }
  }
}

class Description extends React.PureComponent {
  state = {
    list: [],
    "name": "",
    "style": "",
    "price": "",
    "area": "",
    "huxing": "",
  }
  
  componentDidMount() {
    const data = location.search.replace("?", "");
    const array = data.split("&")[0].split("=");
    
    request("GET", "/jsons/ex.json", (result) => {
      // console.log(result);
      for(let i = 0; i < result.length; i++) {
        if(result[i].id === parseInt(array[1])) {
          this.setState({
            list: result[i].details,
            "name": result[i].name,
            "style": result[i].style,
            "price": result[i].price,
            "area": result[i].area,
            "huxing": result[i].huxing,
          });
          break;
        }
      }   
    });
  }
  render() {
    console.log(this.state.list);
    return (
      <div className="headContainer">
        <div class="head">
          <div><span>风格：</span>{this.state.style}</div>
          <div><span>面积：</span>{this.state.area}</div>
          <div><span>户型：</span>{this.state.huxing}</div>
          <div><span>价格：</span>{this.state.price}</div>
        </div>
        <div class="pic" id="pic">
          {
            this.state.list.map(item => {
              return <img src={item.pic}/>
            })
          }
        </div>
      </div>  
    );
  }
}

ReactDOM.render(
  <Description />,
  document.getElementById('root')
);