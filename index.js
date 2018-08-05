var express 				= require('express'),
	logger						= require('morgan'),
	dotenv						= require('dotenv'),
	favicon						= require('serve-favicon'),
	bodyParser				= require('body-parser'),
	builder						= require('xmlbuilder'),
	save							= require('save-file'),
	app 							= express();


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(logger('dev'));
// app.use(favicon('public/img/CSFavicon.png'));
app.use(bodyParser.urlencoded({extended: true}));

var mainTheme;

dotenv.config({path: '.env'});				//	Loads environment variables file

//	ROUTES	//
app.get('/', function(req, res) {
	res.render('newgallery');
})

app.post('/savegallery', function(req, res) {
	console.log(req);
	console.log(res);

	var xml = builder.create('gallery', {'id': 'jessieware'})
		.ele({'displayName': 'Jessie Ware'})
		.end({'pretty': true});

	console.log(xml);

	save(xml, 'gallery.xml', (err, data) => {
		if(err) throw err;
	});

});



//	Start server
app.listen(process.env.PORT, process.env.IP, function() {
	console.log("Server started");
});
