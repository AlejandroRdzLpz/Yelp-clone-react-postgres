<h1>A Yelp Clone with React and PostgreSQL</h1>

<h3>How to use it locally</h3>

  <ul>Make sure you have installed locally PostgreSQL and the server is running</ul>
  <ul>In the server folder create a <code>.env</code> flie with the following structure:</ul> <br>
  <code>PORT=(the port where you are running the backend, by default is 5000)</code> <br>
  <code>PGUSER=(your DB username, usually is postgres)</code> <br>
  <code>PGHOST=localhost</code> <br>
  <code>PGPASSWORD=(your username's password, the one you choose when you created the DB)</code> <br>
  <code>PGDATABASE=yelp</code> <br>
  <code>PGPORT=5432 (this may vary, but is the most commmon, chech PostgreSQL documentation)</code> <br>
  <br>
  <ul>On your command line, choose directory server and run <code>node server.js</code></ul>
  <ul>Then, go to client directory and run <code>npm start</code></ul>
  <ul>Done!</ul>
