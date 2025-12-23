import express from 'express'
import morgan from 'morgan'
import {promises as fs} from 'fs'
const app = express()
const port = 3000
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms'));
app.use("/", (req, res, next) => {
    const time = new Date().toDateString()
	res.setHeader("X-Server-Start-Time", time);
    console.log(res.getHeaders());
     	
	next();
});

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

app.get('/health', (req, res) => {
    const time = new Date().toISOString()
  res.send({
  "status": "ok",
  "serverTime": time
})

})

app.get('/briefing', (req, res)=> {
    const token = 'Golani';
    
    if (req.header('Client-Unit') == token){
        res.send({
  "unit": "Golani",
  "message": "briefing delivered"
}
)
    }
    else{
        res.status(400).send("Not found")}
}
)

app.get('/targets/:id', async (req,res)=> {
    const param = req.params.id;
    let file = await fs.readFile("data/targets.json", "utf8")
    const users = JSON.parse(file)
    try{
    users.forEach((elemnt) => {if (elemnt.id == param){
        res.send(elemnt)
    }
    else{
        res.status(404).send("Not found")
    }
    })}
   catch(error){
    res.status(404).send("Not found")
   }
})

app.get('/targets', async (req,res)=> {
    const {region, status, minPriority} = req.query
    let file = await fs.readFile("data/targets.json", "utf8")
    const users = JSON.parse(file)
    users.forEach((element)=> {if(element.region==region|| element.status==status|| element.priority== minPriority){
        res.send(element)}
    else{
        res.status(400).send("Nothing found. try another search...")
    }
    })
})

app.post('/targets', async (req,res)=>{
    const body= req.body
    try{

        if ('id' in body && 'codeName' in body&& 'region' in body && 'priority' in body){
            let file = await fs.readFile("data/targets.json", "utf8")
            let content = JSON.parse(file)
            body.status = 'new'
            body.createAt= new Date().toISOString()
            content.push(body)
            console.log(typeof content);
            await fs.writeFile('data/targets.json', JSON.stringify(content))
            res.status(201).send('create')

    }
    else{
        res.status(400).send("Content incorrect")
    }

    }
    catch(error){
    res.status(401).send("Not currect")
   }
})