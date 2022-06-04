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
        <br>
        Body:<br>
        {
          userEmail:string<br>
          userPassword:string<br>
          userFName:string<br>
          userLName:string<br>
        }
    </td>
  </tr>
  <tr>
    <td>POST /user/login</td>
    <td>
        Login an existing user <br>
        Body:<br>
        {<br>
          userEmail:string<br>
          userPassword:string<br>
        }
    </td>
  </tr>
  <tr>
    <td>GET /user/all?page=number&limit=number></td>
    <td>
        Get all users paginated 
        <br>page = the page number
        <br>limit = how many user displayed per page
        <br>Note: JWT is Attached with the request
    </td>
  </tr>
  <tr>
    <td>GET /user/one/:id</td>
    <td>
        get the user with the given id
    </td>
  </tr>
  <tr>
    <td>PUT /user/update/:id</td>
    <td>
        update the first and last name of the user with the given id.<br>
        Body:<br>
        {<br>
          userFName:string<br>
          userLName:string<br>
          userPassword:string<br>
        }
    </td>
  </tr>
  <tr>
    <td>PUT /user/change-password</td>
    <td>
        change the password of the user<br>
        Body:<br>
        {<br>
          oldPassword:string<br>
          newPassword:string<br>
        }<br>
        Note: JWT Must be attached
    </td>

  </tr>
  <tr>
    <td>PUT /user/change-email</td>
    <td>
        change the email of the user<br>
        Body:<br>
        {<br>
          userEmail:string<br>
          userPassword:string<br>
        }<br>
        Note : JWT Must be Attached
    </td>
  </tr>
  <tr>
    <td>DELETE /user/delete</td>
    <td>
        delte the account of the user<br>
        Body:<br>
        {<br>
          userPassword:string<br>
        }<br>
        Note : JWT Must be Attached
    </td>
  </tr>
   <tr>
    <td>GET /user/validate-email</td>
    <td>
        validate the user's email
    </td>
  </tr>
  <tr>
    <td>GET /user/resend-validation</td>
    <td>
        resend validation email to the user
        <br>
        {<br>
          userId:string<br>
          validationCode:string<br>
        }<br>
        Note:JWT Must Be Attached
    </td>
  </tr>
</table>

<h1>Database</h1>
<p align="center">
  <a href="https://github.com/IbrahimElmourchidi/Learning-lantern/blob/development/server/auth-api/database_design/ERD.png?raw=true" target="blank"><img src="https://github.com/IbrahimElmourchidi/Learning-lantern/blob/development/server/auth-api/database_design/ERD.png?raw=true" width="100%" height="auto" alt="Auth-api ERD" /></a>
</p>

<h1>Deployment Link</h1>

<p>- This API is hosted on Heroku <a href="https://learning-lantern-auth.herokuapp.com/">here</a></p>

<h1>Docs Link</h1>
<p>- a Detailed Docs for the API generated with compodocs can be found <a href="#">here</a></p>
