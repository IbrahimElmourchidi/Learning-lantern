<p align="center">
  <a href="https://real-learning-lantern.web.app" target="blank"><img src="https://github.com/IbrahimElmourchidi/Learning-lantern/blob/development/logo.png?raw=true" width="150" alt="Learning-Lantern Logo" /></a>
</p>
 <p align="center"><a href="https://real-learning-lantern.web.app">Learning Lantern </a> is An Online Eductaional Environment, with an integrated and easy-to-use set of cloud services and content creation tools for leveraging the online eductaional process</p>

<br>
<br>

<h1>Introduction</h1>
<p>This is short description for the Learning Lantern auth-api.
More detailed Information can be found in the link to documentation below
</p>

<h1>HTTP end points</h1>
<table width=100% border="1px">
  <tr>
    <th>Route</th>
    <th width=70%>Description</th>
  </tr>
  <tr>
    <td>POST /user/signup</td>
    <td>
        Create new User 
    </td>
  </tr>
  <tr>
    <td>POST /user/login</td>
    <td>
        Login an existing user 
    </td>
  </tr>
  <tr>
    <td>GET /user/all?page=number&limit=number></td>
    <td>
        Get all users paginated 
        <br>page = the page number
        <br>limit = how many user displayed per page
    </td>
  </tr>
   <tr>
    <td>GET /user/validate-email?`id= {userId}
</td>
    <td>
        Send a validation email to the user with the given id
        <br>Note: 
    </td>
  </tr>
</table>
<h1>Deployment Link</h1>

<p>- This API is hosted on Heroku <a href="https://learning-lantern-auth.herokuapp.com/">here</a></p>

<h1>Docs Link</h1>
<p>- a Detailed Docs for the API generated with compodocs can be found <a href="#">here</a></p>
