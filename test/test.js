const tcpModbus=require('../src/tcp_modbus')
const thingsModel=require('../thingsModel/index').test1

const client=new tcpModbus({
    host:"192.168.0.49",
    port:502
})

let Model=new Proxy(thingsModel,{
    set(targe,key,value){
        targe[key].value=value
        targe[key].update=Date.now()
        return targe
    }    
})

setInterval(async ()=>{
    let data=await client.readHoldRegs(0,10)
    Model.voltage=data[0]
    Model.current=data[1]
    Model.speed=data[2]
    console.log(thingsModel,new Date())
},2000)