

var index_get = function(req, res){
    console.log('>> /index (get)')
    res.render('index')
}

module.exports.index_get = index_get;