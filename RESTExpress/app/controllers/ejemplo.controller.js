exports.ChangeMsg = (req, res) => {
    var message="";
    if (req.body.message==="jajaja"){
        message="klk";  
    }
    else{
        message="jajaja"
    }
    res.send({
        message: message,
    });
}