function request(method, url, data, cb){
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.send(data);
  xhr.onreadystatechange=function() {
    if (xhr.readyState==4 && xhr.status==200) {
       var news = xhr.responseText;
       var obj = JSON.parse(news);
       cb(obj);
    }
  }
}

class begin extends React.PureComponent {
  state = {

  }
  componentDidMount(){
    function jumpToRegister() {
      let register = document.getElementById('register');
      register.style.display = "block";
      let begin = document.getElementById('begin');
      begin.style.display = "none";
    }
    function jumpToLogin() {

  }
  render() {
    return (
      <div>
        <div class="begin">
          <div class="qq"><img src="/images/qqchat/qq.png"/></div>
          <input type="text" name="username" placeholder="QQ号/手机号/邮箱" style="margin-top: 15px;margin-bottom: 8px;"/>
          <input type="text" name="password" placeholder="输入密码"/></br>
          <button onclick="login()">→</button>
          <p>登录即代表阅读并同意<a href="">服务条款</a></p>
        </div>
      </div>  
    );
  }
}
ReactDOM.render(
  <begin />,
  document.getElementById('login')
);