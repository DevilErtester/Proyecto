exports.ChangeMsg = (req, res) => {
    var message="jajaja";
    if (req.body.message==="jajaja"){
        message="klk";  
    }
    res.send({
        message: message,
    });
}