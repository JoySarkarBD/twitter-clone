
const htmlResponse =(page_title)=> {
    return (req, res, next) => {
        res.locals.html = true;
        res.locals.title = page_title;
        next()
    }
    
}







// Module Export
module.exports = htmlResponse;