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

class Example extends React.PureComponent {
  state = {
    list: [],
  }
  componentDidMount() {
    request("GET", "/jsons/ex.json", (result) => {
      this.setState({ list: result })
    });
  }
  render() {
    // console.log(this.state.list);
    return (
      <div>
        {
          this.state.list.map(item => {
            const href = "/zhuangxiu/detail.html?id=" + item.id;
            return (
              <a href={href} target="_blank">
                <div className="example" id="ex1">
                  <img src={item.poster}/>
                  <div className="desc">
                    <div className="exp1">{item.name}</div>
                    <div className="exp2">{item.style} | {item.price} | {item.area}</div>
                  </div>
                </div>
              </a>
            );
          })
        }
      </div>
    );
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('example')
);