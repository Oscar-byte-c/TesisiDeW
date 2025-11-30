import app from './server.js';


app.listen(app.get('port'), ()=> {
    console.log(`server ok on http://localhost:${app.get('port')}`)
})
